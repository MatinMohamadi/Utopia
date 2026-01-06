"use client";
import { CheckCircle2, User } from "lucide-react";

// داده‌های ساختگی برای نمایش
const MOCK_TRANSACTIONS = [
  { user: "0912***4567", type: "خرید UUSD", amount: "$150", time: "لحظاتی پیش" },
  { user: "0935***8910", type: "خرید ووچر", amount: "$50", time: "۱ دقیقه پیش" },
  { user: "0919***2233", type: "فروش UUSD", amount: "$1,200", time: "۲ دقیقه پیش" },
  { user: "0901***5566", type: "خرید ووچر", amount: "$10", time: "لحظاتی پیش" },
  { user: "0912***9988", type: "خرید UUSD", amount: "$500", time: "۳ دقیقه پیش" },
  { user: "0930***1122", type: "فروش ووچر", amount: "$200", time: "۴ دقیقه پیش" },
];

export const RecentTransactions = () => {
  return (
    <div className="w-full bg-white/50 backdrop-blur-sm border-y border-gray-200 overflow-hidden py-3">
      <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
        {/* تکرار دو بار برای ایجاد لوپ بی‌نهایت */}
        {[...MOCK_TRANSACTIONS, ...MOCK_TRANSACTIONS, ...MOCK_TRANSACTIONS].map((tx, i) => (
          <div key={i} className="flex items-center gap-3 mx-6 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 min-w-[200px]">
            <div className="bg-indigo-50 p-1.5 rounded-full">
                <User className="w-3 h-3 text-indigo-600" />
            </div>
            <div className="flex flex-col text-xs">
                <span className="font-bold text-gray-800">{tx.user}</span>
                <span className="text-gray-500 flex items-center gap-1">
                    {tx.type} ({tx.amount})
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};