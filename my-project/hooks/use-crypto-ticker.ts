// hooks/use-crypto-ticker.ts
import { useState, useEffect } from 'react';

type Trend = 'up' | 'down' | 'neutral';

interface TickerData {
  price: number;
  trend: Trend;
}

interface MarketData {
  uusd: TickerData;
  uvoucher: TickerData;
}

export const useCryptoTicker = () => {
  const [data, setData] = useState<MarketData>({
    uusd: { price: 62500, trend: 'neutral' },
    uvoucher: { price: 62800, trend: 'neutral' },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const fluctuate = (base: number) => {
          const change = Math.floor(Math.random() * 101) - 50;
          return {
            price: base + change,
            trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
          } as TickerData;
        };

        return {
          uusd: fluctuate(62500),
          uvoucher: fluctuate(62800),
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('fa-IR').format(price) + ' تومان';

  return { data, formatPrice };
};