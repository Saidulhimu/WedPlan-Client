# WedPlan Client — Luxury Wedding Planning & Vendor Marketplace

WedPlan is a premier, role-based wedding planning platform designed to effortlessly connect couples with world-class wedding venues, photographers, florists, caterers, and stylists. Inspired by the editorial elegance of **The Knot** and **Zola**, WedPlan delivers a modern, high-trust wedding planning experience.

---

## 🌟 Important Features

### 1. Public Discovery & Marketplace
- **Curated Homepage**:
  - Hero banner with romantic typography and calls to action.
  - Featured wedding services with dynamic data from verified vendors.
  - Category exploration (Photography & Videography, Venues, Florists & Decor, Catering, Makeup & Styling, Fashion).
  - "Why Choose WedPlan?" value proposition and interactive "How WedPlan Works" guide.
  - Popular wedding destinations and real customer testimonials.
- **Browse Services**:
  - Live text search by service name or description.
  - Instant category filtering and location selection.
  - **Price Sorting**: Ascending (Low to High) and Descending (High to Low).
  - Skeletons, loading states, and responsive empty states.
- **Service Details (`/services/[id]`)**:
  - High-resolution multi-image photo gallery.
  - Verified vendor profile information with Premium Gold badges.
  - Detailed pricing packages and coverage inclusions.
  - Interactive **Booking Request Modal** (with date validation and duplicate prevention).

### 2. Role-Based Access Control (RBAC) & Dashboard Architecture
- **Customer Portal**:
  - Dashboard overview with metrics (Total Requests, Pending, Accepted, Declined).
  - My Bookings management with real-time status tracking.
  - Cancellation capability for pending inquiries.
  - Profile settings and avatar management.
- **Vendor Portal**:
  - Complete storefront metrics (Active Services, Inbound Requests, Accepted Bookings, Membership Tier).
  - Service catalog management (Add, update, delete, and toggle availability).
  - **Free Plan Limiter**: Enforces a strict 3-service limit for free vendors.
  - Inbound booking inquiries inbox with one-click Accept / Decline actions.
  - **Stripe Premium Upgrade**: Direct integration with Stripe Checkout to unlock unlimited listings.
- **Super Admin Console**:
  - Platform-wide statistics (registered users, services, pending moderation, Stripe transactions, revenue).
  - Searchable user management with instant account blocking / unblocking.
  - Service moderation queue to approve or reject newly submitted vendor packages.
  - Immutable read-only transaction audit trail.

### 3. Design System & Clean Code
- **No AI Generated Icons**: Strictly uses crisp, hand-crafted SVG vector icons from `lucide-react`.
- **Romantic Luxury Aesthetic**: Warm ivory backgrounds, soft champagne borders, deep burgundy rose accents, and Playfair Display serif typography.
- **Sonner Toast Notifications**: Clean toast feedback for all operations; no disruptive native browser alerts.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom luxury wedding tokens
- **UI Components**: ShadCN UI inspired components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios with JWT Bearer interceptor
- **Payments**: Stripe Checkout & Client Elements
- **Image Hosting**: ImgBB API

---

## 📋 Environment Variables Guide

Create a `.env.local` file in the root of the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

- **NEXT_PUBLIC_API_URL**: The backend REST API endpoint (default: `http://localhost:5000/api`).
- **NEXT_PUBLIC_IMGBB_API_KEY**: Free API key from `api.imgbb.com` for hosting uploaded photos. (If left blank, the app will automatically fall back to local data URLs for instant evaluation).
- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Your test mode publishable key from Stripe Dashboard.

---

## 🚀 Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saidulhimu/WedPlan-Client.git
   cd WedPlan-Client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and set your API URL and keys.

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🔗 Repository & Live Deployment Links

- **Client Repository**: [https://github.com/Saidulhimu/WedPlan-Client](https://github.com/Saidulhimu/WedPlan-Client)
- **Server Repository**: [https://github.com/Saidulhimu/WedPlan-Server](https://github.com/Saidulhimu/WedPlan-Server)
- **Live Client Application**: [https://wedplan-client.vercel.app](https://wedplan-client.vercel.app)
- **Live Backend Server API**: [https://wedplan-server.onrender.com](https://wedplan-server.onrender.com)

---

## 🔐 Demo Credentials for Evaluation

- **Super Admin**:
  - Email: `saidulhimuu@gmail.com`
  - Password: `Himel12345`
- **Verified Vendor**:
  - Email: `saidulislam5595@gmail.com`
  - Password: `saidul12345`
- **Customer**:
  - Email: `hmcreationn@gmail.com`
  - Password: `hm123456`
