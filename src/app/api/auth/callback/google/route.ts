import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "customer"; // "customer" or "vendor"
  const error = searchParams.get("error");

  const baseUrl = request.nextUrl.origin;

  if (error || !code) {
    console.error("Google OAuth callback error:", error || "No code provided");
    return NextResponse.redirect(
      new URL(`/sign-in?error=${encodeURIComponent(error || "Google authentication was cancelled")}`, baseUrl)
    );
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
    const redirectUri = `${baseUrl}/api/auth/callback/google`;

    // 1. Exchange authorization code for access & ID tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Failed to exchange Google OAuth code:", tokenData);
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent(tokenData.error_description || "Token exchange failed")}`, baseUrl)
      );
    }

    // 2. Fetch authenticated user profile from Google
    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const googleUser = await profileResponse.json();

    if (!profileResponse.ok || !googleUser.email) {
      console.error("Failed to fetch Google profile:", googleUser);
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent("Could not retrieve Google profile")}`, baseUrl)
      );
    }

    // 3. Register or sign in via WedPlan Backend
    const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const authRes = await fetch(`${backendApiUrl}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: googleUser.name || "Google User",
        email: googleUser.email,
        image: googleUser.picture || "",
        role: state === "vendor" ? "vendor" : "customer",
      }),
    });

    const authData = await authRes.json();

    if (!authRes.ok || !authData.success) {
      console.error("Backend Google auth error:", authData);
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent(authData.message || "Failed to authenticate session")}`, baseUrl)
      );
    }

    // 4. Redirect to client-side callback processor with token and user data
    const callbackRedirect = new URL("/auth/callback", baseUrl);
    callbackRedirect.searchParams.set("token", authData.token);
    callbackRedirect.searchParams.set("user", JSON.stringify(authData.user));

    return NextResponse.redirect(callbackRedirect);
  } catch (err: any) {
    console.error("Google OAuth processing error:", err);
    return NextResponse.redirect(
      new URL(`/sign-in?error=${encodeURIComponent(err.message || "An unexpected error occurred during Google sign-in")}`, baseUrl)
    );
  }
}
