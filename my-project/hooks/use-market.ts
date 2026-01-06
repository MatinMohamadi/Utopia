"use client";
import { useState, useEffect, useCallback } from "react";

export const useMarketData = () => {
  const [selectedSource, setSelectedSource] = useState("Auto");
  const [data, setData] = useState({
    uusd: { price: 0, history: [], isLoading: true },
    uvoucher: { price: 0, history: [], isLoading: true },
    source: "Connecting...",
  });

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch(`/api/prices?source=${selectedSource}`, { cache: "no-store" });
      const result = await res.json();

      setData((prev) => {
        const updateHistory = (hist: number[], val: number) => {
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
    setData(prev => ({ ...prev, uusd: { ...prev.uusd, isLoading: true } }));
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return { ...data, setSource: setSelectedSource, selectedSource };
};