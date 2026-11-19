"use client";

import React, { useEffect, useState } from "react";
import { Transaction } from "@/types";
import { api } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Receipt, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await api.get("/admin/transactions");
        if (data?.transactions) {
          setTransactions(data.transactions);
        }
      } catch (err) {
        toast.error("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Platform Transactions
        </h1>
        <p className="text-xs text-slate-500">
          Immutable Stripe transaction records for vendor subscriptions. (Read-only security).
        </p>
      </div>

      <div className="rounded-3xl border border-champagne-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
          </div>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wedding-50/60 border-b border-champagne-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Vendor</th>
                  <th className="py-3.5 px-6">Plan</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Stripe Session ID</th>
                  <th className="py-3.5 px-6">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {t.vendorId?.businessName || t.vendorId?.name || "Vendor"}
                      <div className="text-[11px] text-slate-400 font-normal">
                        {t.vendorId?.email}
                      </div>
                    </td>
                    <td className="py-4 px-6 capitalize">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[10px] font-bold">
                        <Sparkles className="h-3 w-3 fill-amber-500 text-amber-500" />
                        {t.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-serif text-sm font-bold text-slate-900">
                      {formatPrice(t.amount)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[10px] text-slate-400">
                      {t.stripeSessionId.slice(0, 20)}...
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {formatDate(t.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-slate-400">
            No completed Stripe transactions recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
