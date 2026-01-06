"use client";
import { useState, useEffect, useCallback } from "react";

// 1. تعریف دقیق اینترفیس‌ها
interface AssetData {
  price: number;
  history: number[]; // 👈 نکته کلیدی: مشخص کردیم که این آرایه‌ای از اعداد است
  isLoading: boolean;
}

interface MarketData {
  uusd: AssetData;
  uvoucher: AssetData;
  source: string;
}

export const useMarketData = () => {
  const [selectedSource, setSelectedSource] = useState("Auto");
  
  // 2. اعمال اینترفیس به useState
  const [data, setData] = useState<MarketData>({
    uusd: { price: 0, history: [], isLoading: true },
    uvoucher: { price: 0, history: [], isLoading: true },
    source: "Connecting...",
  });

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch(`/api/prices?source=${selectedSource}`, { cache: "no-store" });
      const result = await res.json();

      setData((prev) => {
        // مشخص کردن نوع ورودی و خروجی تابع
        const updateHistory = (hist: number[], val: number): number[] => {
           if (!val) return hist;
           const newHist = [...hist, val];
           if (newHist.length > 15) newHist.shift();
           return newHist;
        };

        return {
          uusd: {
            price: result.uusd,
            history: updateHistory(prev.uusd.history, result.uusd),
            isLoading: false,
          },
          uvoucher: {
            price: result.uvoucher,
            history: updateHistory(prev.uvoucher.history, result.uvoucher),
            isLoading: false,
          },
          source: result.source,
        };
      });
    } catch (error) {
      setData(prev => ({ ...prev, source: "Connection Failed" }));
    }
  }, [selectedSource]);

  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        uusd: { ...prev.uusd, isLoading: true },
        uvoucher: { ...prev.uvoucher, isLoading: true }
    }));
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // اکسپورت کردن
  return { 
      ...data, 
      setSource: setSelectedSource, 
      selectedSource 
  };
};