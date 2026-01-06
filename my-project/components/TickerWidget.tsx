"use client";
import { motion } from "framer-motion";
import { TrendingUp, Activity, ChevronDown, Check } from "lucide-react";
import { useMarketData } from "@/hooks/use-market";
import { cn, formatCurrency } from "@/lib/utils";
import { useState } from "react";

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${x},${y}`;
    }).join(" ");
  return <svg viewBox="0 0 100 100" className="w-20 h-10 overflow-visible opacity-60"><polyline fill="none" stroke={color} strokeWidth="2.5" points={points} strokeLinecap="round" strokeLinejoin="round" /></svg>;
};

export const TickerWidget = () => {
  const { uusd, uvoucher, source, setSource, selectedSource } = useMarketData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sourcesList = [
    { id: "Auto", label: "انتخاب هوشمند", color: "text-indigo-600" },
    { id: "Nobitex", label: "نوبیتکس", color: "text-purple-600" },
    { id: "TetherLand", label: "تترلند", color: "text-blue-600" },
    { id: "Wallex", label: "والکس", color: "text-orange-600" },
  ];

  const AssetRow = ({ label, symbol, data, colorClass }: any) => {
    if (data.isLoading) return <div className="h-20 w-full bg-gray-100 animate-pulse rounded-2xl mb-3"></div>;
    
    if (data.price === 0) return (
        <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-sm mb-3">خطا در دریافت نرخ</div>
    );

    return (
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/60 hover:bg-white/90 border border-gray-100 transition-all shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black shadow-sm", colorClass)}>{symbol}</div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">{label}</h4>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> آنلاین</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
             <div className="hidden sm:block"><Sparkline data={data.history} color="#10b981" /></div>
             <div className="text-right">
                <motion.div key={data.price} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="font-mono font-bold text-lg text-gray-800">{formatCurrency(data.price)}</motion.div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Toman</span>
             </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-2xl ring-1 ring-white/50">
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-base"><Activity className="w-5 h-5 text-indigo-500" /> نرخ لحظه‌ای</h3>
            <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition shadow-sm">
                    <span className={cn("w-2 h-2 rounded-full", source === "Error" ? "bg-red-500" : "bg-emerald-500")}></span>
                    {sourcesList.find(s => s.id === selectedSource)?.label || selectedSource}
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
                {isMenuOpen && (
                    <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                        {sourcesList.map((item) => (
                            <button key={item.id} onClick={() => { setSource(item.id); setIsMenuOpen(false); }} className="w-full text-right px-4 py-3 text-xs font-medium hover:bg-gray-50 flex justify-between border-b border-gray-50 last:border-0">
                                <span className={item.color}>{item.label}</span>
                                {selectedSource === item.id && <Check className="w-3 h-3 text-emerald-600" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
        <div className="space-y-3">
          <AssetRow label="Utopia USD" symbol="U" data={uusd} colorClass="bg-indigo-100 text-indigo-600" />
          <AssetRow label="U-Voucher" symbol="V" data={uvoucher} colorClass="bg-purple-100 text-purple-600" />
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center text-xs text-gray-400">
            <span>منبع فعال:</span>
            <span className="font-bold text-indigo-600">{source === "Error" ? "قطع ارتباط" : source}</span>
        </div>
      </div>
      {isMenuOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>}
    </div>
  );
};