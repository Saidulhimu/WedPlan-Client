"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/types";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  Users,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (roleFilter && roleFilter !== "all") params.append("role", roleFilter);

      const { data } = await api.get(`/admin/users?${params.toString()}`);
      if (data?.users) {
        setUsers(data.users);
      }
    } catch (err) {
      toast.error("Failed to fetch users list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, roleFilter]);

  const handleToggleBlock = async (userId: string, currentBlocked: boolean) => {
    const actionText = currentBlocked ? "unblock" : "block";
    if (!confirm(`Are you sure you want to ${actionText} this user?`)) return;

    setActionLoadingId(userId);
    try {
      const { data } = await api.patch(`/admin/users/${userId}/block`);
      if (data.success) {
        toast.success(data.message);
        fetchUsers();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update block status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          User Management
        </h1>
        <p className="text-xs text-slate-500">
          View all registered accounts, filter by role, and manage platform permissions.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-champagne-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full rounded-xl border border-champagne-300 py-2.5 pl-10 pr-4 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="vendor">Vendors</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-champagne-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wedding-50/60 border-b border-champagne-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Role</th>
                  <th className="py-3.5 px-6">Plan</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Joined Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {u.image ? (
                          <img
                            src={u.image}
                            alt={u.name}
                            className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-wedding-100 flex items-center justify-center font-bold text-wedding-700">
                            {u.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                          {u.businessName && (
                            <p className="text-[10px] text-wedding-600 italic">
                              {u.businessName}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 capitalize font-semibold text-slate-700">
                      {u.role}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                          u.subscriptionPlan === "premium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {u.subscriptionPlan === "premium" && (
                          <Sparkles className="h-3 w-3 fill-amber-500 text-amber-500" />
                        )}
                        {u.subscriptionPlan}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {u.isBlocked ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600">
                          <ShieldAlert className="h-3.5 w-3.5" /> Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <ShieldCheck className="h-3.5 w-3.5" /> Active
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {u.role !== "admin" && (
                        <button
                          onClick={() => handleToggleBlock(u._id, u.isBlocked)}
                          disabled={actionLoadingId === u._id}
                          className={`rounded-xl px-3 py-1 text-xs font-semibold transition-colors ${
                            u.isBlocked
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          }`}
                        >
                          {u.isBlocked ? "Unblock User" : "Block User"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-slate-400">
            No registered users found matching the filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
