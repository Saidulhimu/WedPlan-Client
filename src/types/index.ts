export type UserRole = "customer" | "vendor" | "admin";
export type SubscriptionPlan = "free" | "premium";

export interface User {
  id?: string;
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  isBlocked: boolean;
  businessName?: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiresAt?: string | null;
  createdAt: string;
}

export type ServiceStatus = "pending" | "approved" | "rejected";

export interface Service {
  _id: string;
  vendorId: User | string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: ServiceStatus;
  isAvailable: boolean;
  createdAt: string;
}

export type BookingStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface Booking {
  _id: string;
  serviceId: Service | any;
  vendorId: User | any;
  customerId: User | any;
  eventDate: string;
  eventLocation: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Transaction {
  _id: string;
  vendorId: User | any;
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: "succeeded" | "failed" | "pending";
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalBookings: number;
  totalTransactions: number;
  totalRevenue: number;
}
