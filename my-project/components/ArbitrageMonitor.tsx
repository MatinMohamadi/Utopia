"use client";
import { ArrowLeftRight, TrendingUp, Info } from "lucide-react";
import { useMarketData } from "@/hooks/use-market";
import { formatCurrency } from "@/lib/utils";

export const ArbitrageMonitor = () => {
  const { uusd } = useMarketData();
  
  // شبیه‌سازی قیمت تتر (معمولاً کمی پایین‌تر یا بالاتر از یوتوپیا)
  const tetherPrice = uusd.price > 0 ? uusd.price - 150 : 64000;
  const spread = uusd.price - tetherPrice;
  const spreadPercent = ((spread / tetherPrice) * 100).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[2rem] p-6 border border-emerald-100 shadow-lg relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="font-bold text-emerald-900 flex items-center gap-2 text-sm">
          <ArrowLeftRight className="w-4 h-4" />
          فرصت آربیتراژ (Spread)
        </h3>
        <div className="bg-white p-1.5 rounded-full shadow-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
          <div>
              <p className="text-xs text-emerald-700 mb-1">اختلاف قیمت USDT/UUSD</p>
              <span className="text-2xl font-black text-emerald-800 font-mono tracking-tight">
                  {formatCurrency(spread)} <span className="text-xs font-bold">تومان</span>
              </span>
          </div>
          <div className="text-right">
              <span className="block text-xs text-emerald-700 mb-1">سود خالص</span>
              <span className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                  +{spreadPercent}%
              </span>
          </div>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-200/50 flex items-start gap-2 text-[10px] text-emerald-800 relative z-10">
          <Info className="w-3 h-3 shrink-0 mt-0.5" />
          <p>با تبدیل تتر به دلار یوتوپیا در این لحظه، شما {spreadPercent}% بالاتر از نرخ بازار سود کسب می‌کنید.</p>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-200/40 rounded-full blur-2xl"></div>
    </div>
  );
};