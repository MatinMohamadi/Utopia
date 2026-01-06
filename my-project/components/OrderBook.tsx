"use client";
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMarketData } from "@/hooks/use-market";
import { formatCurrency } from "@/lib/utils";

export const OrderBook = () => {
  const { uusd } = useMarketData();
  const basePrice = uusd.price > 0 ? uusd.price : 64500;

  // تولید دیتاهای اولیه
  const [bids, setBids] = useState<any[]>([]);
  const [asks, setAsks] = useState<any[]>([]);

  useEffect(() => {
    // تابع تولید سفارش فیک
    const generateOrders = (base: number, type: 'ask' | 'bid') => {
      return Array.from({ length: 6 }, (_, i) => {
        const gap = (i + 1) * (Math.random() * 50 + 10);
        const price = type === 'ask' ? base + gap : base - gap;
        return {
          price: Math.floor(price),
          amount: (Math.random() * 1000 + 100).toFixed(2),
          total: (Math.random() * 5 + 0.1).toFixed(3), // حجم به BTC یا UUSD
        };
      });
    };

    const interval = setInterval(() => {
      setAsks(generateOrders(basePrice, 'ask').reverse()); // فروشندگان (قیمت بالاتر)
      setBids(generateOrders(basePrice, 'bid')); // خریداران (قیمت پایین‌تر)
    }, 2000); // آپدیت هر ۲ ثانیه

    // اجرای اولیه
    setAsks(generateOrders(basePrice, 'ask').reverse());
    setBids(generateOrders(basePrice, 'bid'));

    return () => clearInterval(interval);
  }, [basePrice]);

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl h-full flex flex-col">
      <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2 text-sm">
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
        دفتر سفارشات (Order Book)
      </h3>

      {/* Header */}
      <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-2 px-2">
        <span>قیمت (تومان)</span>
        <span className="text-center">مقدار (UUSD)</span>
        <span className="text-left">مجموع</span>
      </div>

      {/* Asks (Sellers) - Red */}
      <div className="flex-1 flex flex-col justify-end gap-1 mb-2">
        {asks.map((order, i) => (
          <div key={i} className="grid grid-cols-3 text-xs px-2 py-1 hover:bg-rose-50 rounded cursor-pointer transition-colors relative overflow-hidden group">
            <span className="text-rose-600 font-mono font-bold z-10">{formatCurrency(order.price)}</span>
            <span className="text-gray-600 text-center z-10">{order.amount}</span>
            <span className="text-gray-400 text-left z-10">{order.total}</span>
            {/* Volume Bar */}
            <div className="absolute right-0 top-0 bottom-0 bg-rose-100/50 z-0 transition-all duration-500" style={{ width: `${Math.random() * 40 + 10}%` }}></div>
          </div>
        ))}
      </div>

      {/* Current Price Indicator */}
      <div className="py-3 border-y border-gray-100 my-1 flex items-center justify-center gap-2 bg-gray-50/50">
        <span className="text-lg font-black text-gray-800 font-mono tracking-tight">
            {formatCurrency(basePrice)}
        </span>
        {Math.random() > 0.5 ? 
            <ArrowUp className="w-4 h-4 text-emerald-500" /> : 
            <ArrowDown className="w-4 h-4 text-rose-500" />
        }
      </div>

      {/* Bids (Buyers) - Green */}
      <div className="flex-1 flex flex-col justify-start gap-1 mt-2">
        {bids.map((order, i) => (
          <div key={i} className="grid grid-cols-3 text-xs px-2 py-1 hover:bg-emerald-50 rounded cursor-pointer transition-colors relative overflow-hidden">
            <span className="text-emerald-600 font-mono font-bold z-10">{formatCurrency(order.price)}</span>
            <span className="text-gray-600 text-center z-10">{order.amount}</span>
            <span className="text-gray-400 text-left z-10">{order.total}</span>
            {/* Volume Bar */}
            <div className="absolute right-0 top-0 bottom-0 bg-emerald-100/50 z-0 transition-all duration-500" style={{ width: `${Math.random() * 40 + 10}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};