"use client";
import { useState } from "react";
import { ArrowLeftRight, Calculator } from "lucide-react";
import { useMarketData } from "@/hooks/use-market";
import { formatCurrency } from "@/lib/utils";

export const CryptoConverter = () => {
  const { uusd } = useMarketData();
  const [amount, setAmount] = useState<string>("100");
  const [mode, setMode] = useState<"usd-to-toman" | "toman-to-usd">("usd-to-toman");

  // قیمت پایه (اگر هنوز لود نشده بود ۶۴۰۰۰ در نظر بگیر)
  const price = uusd.price > 0 ? uusd.price : 64000; 

  const result = mode === "usd-to-toman" 
    ? parseFloat(amount || "0") * price 
    : parseFloat(amount || "0") / price;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl relative overflow-hidden mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold flex items-center gap-2 text-gray-800">
          <Calculator className="w-5 h-5 text-indigo-500" />
          محاسبه‌گر سریع
        </h3>
        <button 
          onClick={() => setMode(prev => prev === "usd-to-toman" ? "toman-to-usd" : "usd-to-toman")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-500 font-medium">
            {mode === "usd-to-toman" ? "مبلغ (دلار یوتوپیا)" : "مبلغ (تومان)"}
          </label>
          <div className="relative">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-gray-800"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">
              {mode === "usd-to-toman" ? "UUSD" : "IRT"}
            </span>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-indigo-100">
          <span className="text-xs text-indigo-600 font-medium mb-1">دریافتی تقریبی شما</span>
          <div className="text-2xl font-black text-indigo-700 font-mono tracking-tight">
             {mode === "usd-to-toman" ? formatCurrency(result) : result.toFixed(2)}
             <span className="text-sm mr-2 font-bold opacity-70">
               {mode === "usd-to-toman" ? "تومان" : "دلار"}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};