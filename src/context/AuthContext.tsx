"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, UserRole } from "@/types";
import { api } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from localStorage on initial load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = localStorage.getItem("wedplan_token");
        const savedUser = localStorage.getItem("wedplan_user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));

          // Fetch fresh user profile from backend
          try {
            const { data } = await api.get("/auth/me", {
              headers: { Authorization: `Bearer ${savedToken}` },
            });
            if (data?.user) {
              setUser(data.user);
              localStorage.setItem("wedplan_user", JSON.stringify(data.user));
            }
          } catch (err) {
            console.warn("Failed to revalidate session with server:", err);
          }
        }
      } catch (e) {
        console.error("Auth initialization error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = React.useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem("wedplan_token", newToken);
      localStorage.setItem("wedplan_user", JSON.stringify(newUser));
    } catch (e) {
      console.error("Failed to persist auth token:", e);
    }
  }, []);

  const logout = React.useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem("wedplan_token");
      localStorage.removeItem("wedplan_user");
    } catch (e) {
      console.error("Failed to clear auth token:", e);
    }
    window.location.href = "/sign-in";
  }, []);

  const updateUser = React.useCallback((updatedFields: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      try {
        localStorage.setItem("wedplan_user", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to persist updated user:", e);
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
