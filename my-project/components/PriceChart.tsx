"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Activity, BarChart2 } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useChartData, CandleData } from "@/hooks/use-chart-data";
import { useMarketData } from "@/hooks/use-market";

const TIMEFRAMES = [
  { label: "24 ساعت", value: "24h" },
  { label: "7 روز", value: "7d" },
  { label: "1 ماه", value: "1m" },
];

export const PriceChart = () => {
  const [activeTab, setActiveTab] = useState<"24h" | "7d" | "1m">("24h");
  const { data: candles, isLoading } = useChartData(activeTab);
  const { uusd } = useMarketData();
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  // محاسبات مقیاس‌دهی نمودار
  const { min, max, range } = useMemo(() => {
    if (!candles.length) return { min: 0, max: 0, range: 1 };
    const min = Math.min(...candles.map(c => c.low));
    const max = Math.max(...candles.map(c => c.high));
    return { min, max, range: max - min || 1 };
  }, [candles]);

  // تابع تبدیل قیمت به مختصات Y در SVG (ارتفاع ۱۰۰)
  const getY = (price: number) => 100 - ((price - min) / range) * 80 - 10;

  // آخرین کندل یا کندل هاور شده
  const activeData = hoveredCandle || candles[candles.length - 1];
  const displayPrice = uusd.price > 0 && !hoveredCandle ? uusd.price : (activeData?.close || 0);
  
  // محاسبه تغییرات
  const startPrice = candles[0]?.open || 0;
  const currentPrice = candles[candles.length - 1]?.close || 0;
  const changePercent = startPrice ? ((currentPrice - startPrice) / startPrice) * 100 : 0;
  const isPositiveTrend = changePercent >= 0;

  if (isLoading || candles.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm animate-pulse">در حال بارگذاری کندل‌ها...</p>
      </div>
    );
  }

  // عرض هر کندل
  const candleWidth = (100 / candles.length) * 0.7; // 70% فضا برای بدنه، 30% فاصله

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl relative overflow-hidden group hover:border-indigo-100 transition-colors duration-300">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-gray-500 font-medium text-sm flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-500" />
            نمودار شمعی (Candlestick)
          </h3>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-4xl font-black text-gray-900 font-mono tracking-tight">
              {formatCurrency(displayPrice)}
            </span>
            <span className={cn(
              "text-sm font-bold px-2.5 py-1 rounded-full flex items-center dir-ltr transition-colors",
              isPositiveTrend ? "text-emerald-700 bg-emerald-100" : "text-rose-700 bg-rose-100"
            )}>
              <TrendingUp className={cn("w-3.5 h-3.5 mr-1", !isPositiveTrend && "rotate-180")} />
              {Math.abs(changePercent).toFixed(2)}%
            </span>
          </div>
          <div className="flex gap-4 mt-2 text-[10px] text-gray-400 font-mono">
             <span>H: {formatCurrency(activeData?.high || 0)}</span>
             <span>L: {formatCurrency(activeData?.low || 0)}</span>
             <span>O: {formatCurrency(activeData?.open || 0)}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          {TIMEFRAMES.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                activeTab === tab.value
                  ? "bg-white text-indigo-600 shadow-md scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Candlestick Chart Area */}
      <div className="h-64 w-full relative" onMouseLeave={() => setHoveredCandle(null)}>
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full overflow-visible"
        >
            {/* Grid Lines */}
            {[20, 50, 80].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f3f4f6" strokeWidth="0.5" strokeDasharray="4" />
            ))}

            {candles.map((candle, i) => {
                const isBullish = candle.close >= candle.open;
                const color = isBullish ? "#10b981" : "#f43f5e"; // سبز یا قرمز
                
                const xCenter = (i / candles.length) * 100 + (candleWidth / 2);
                const xRect = (i / candles.length) * 100;
                
                const yHigh = getY(candle.high);
                const yLow = getY(candle.low);
                const yOpen = getY(candle.open);
                const yClose = getY(candle.close);
                
                // ارتفاع بدنه (حداقل 0.5 برای دیده شدن در حالت Doji)
                const bodyHeight = Math.max(Math.abs(yOpen - yClose), 0.5);
                const bodyY = Math.min(yOpen, yClose);

                return (
                    <g 
                        key={i} 
                        className="transition-opacity duration-200 hover:opacity-100 opacity-90 cursor-crosshair"
                        onMouseEnter={() => setHoveredCandle(candle)}
                    >
                        {/* Shadow / Wick (خط باریک وسط) */}
                        <line 
                            x1={xCenter} y1={yHigh} 
                            x2={xCenter} y2={yLow} 
                            stroke={color} 
                            strokeWidth="0.8" 
                        />
                        
                        {/* Body (مستطیل اصلی) */}
                        <rect 
                            x={xRect} 
                            y={bodyY} 
                            width={candleWidth} 
                            height={bodyHeight} 
                            fill={color}
                            rx="0.5" // کمی گرد کردن گوشه‌ها
                        />

                        {/* منطقه هاور نامرئی (برای راحت‌تر شدن هاور کردن) */}
                        <rect 
                            x={xRect} y="0" width={candleWidth} height="100" fill="transparent"
                        />
                    </g>
                );
            })}
        </svg>

        {/* Hover Line (خط افقی راهنما) */}
        {hoveredCandle && (
            <div 
                className="absolute left-0 w-full border-t border-dashed border-gray-400 pointer-events-none z-0 opacity-50"
                style={{ top: `${getY(hoveredCandle.close)}%` }}
            >
                <span className="absolute right-0 -top-3 bg-gray-800 text-white text-[9px] px-1 rounded">
                    {formatCurrency(hoveredCandle.close)}
                </span>
            </div>
        )}
      </div>
    </div>
  );
};