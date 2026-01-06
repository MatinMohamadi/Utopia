"use client";
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useCryptoTicker } from '@/hooks/use-crypto-ticker';
import { clsx } from 'clsx';

export const TickerCard = () => {
  const { data, formatPrice } = useCryptoTicker();

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-emerald-500" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-rose-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const PriceRow = ({ label, symbol, price, trend, delay }: any) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex justify-between items-center bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${symbol === 'U' ? 'bg-indigo-100 text-indigo-600' : 'bg-purple-100 text-purple-600'}`}>
          {symbol}
        </div>
        <div>
          <p className="font-bold text-gray-800">{label}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            خرید آنلاین
          </div>
        </div>
      </div>
      <div className="text-left">
        <div className="flex items-center justify-end gap-1">
            <span className={clsx("font-bold text-lg font-mono tracking-tight", {
                "text-emerald-600": trend === 'up',
                "text-rose-600": trend === 'down',
                "text-gray-700": trend === 'neutral'
            })}>
            {formatPrice(price)}
            </span>
        </div>
        <div className="flex justify-end items-center gap-1 text-xs mt-1">
            <TrendIcon trend={trend} />
            <span className="text-gray-400">نوسان لحظه‌ای</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-2xl"
    >
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
        تابلو نرخ لحظه‌ای
      </h3>
      
      <div className="space-y-4">
        <PriceRow 
            label="Utopia USD" 
            symbol="U" 
            price={data.uusd.price} 
            trend={data.uusd.trend} 
            delay={0.2} 
        />
        <PriceRow 
            label="U-Voucher" 
            symbol="V" 
            price={data.uvoucher.price} 
            trend={data.uvoucher.trend} 
            delay={0.4} 
        />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200/50 text-center text-xs text-gray-500 font-medium">
        آخرین بروزرسانی: همین الان
      </div>
    </motion.div>
  );
};