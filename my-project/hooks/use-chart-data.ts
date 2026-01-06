"use client";
import { useState, useEffect } from "react";

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const useChartData = (period: "24h" | "7d" | "1m") => {
  const [data, setData] = useState<CandleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/history?period=${period}`);
        const result = await res.json();
        if (result.candles) setData(result.candles);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [period]);

  return { data, isLoading };
};