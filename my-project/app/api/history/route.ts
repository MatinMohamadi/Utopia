import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "24h";

  const now = Math.floor(Date.now() / 1000);
  let from = now;
  let resolution = "60";

  // تنظیم رزولوشن برای کندل‌های زیبا
  switch (period) {
    case "24h":
      from = now - 24 * 3600;
      resolution = "30"; // کندل‌های ۳۰ دقیقه‌ای (حدود ۴۸ کندل)
      break;
    case "7d":
      from = now - 7 * 24 * 3600;
      resolution = "240"; // کندل‌های ۴ ساعته (حدود ۴۲ کندل)
      break;
    case "1m":
      from = now - 30 * 24 * 3600;
      resolution = "1D"; // کندل‌های روزانه (۳۰ کندل)
      break;
  }

  try {
    const url = `https://api.wallex.ir/v1/udf/history?symbol=USDTTMN&resolution=${resolution}&from=${from}&to=${now}`;

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();

    if (data.s === "ok" && data.t) {
      // تشخیص ریال یا تومان
      const sample = data.c[0];
      const isRial = sample > 500000;
      const div = isRial ? 10 : 1;

      // ساخت آرایه کندل‌ها
      const candles = data.t.map((time: number, i: number) => ({
        time,
        open: Math.floor(data.o[i] / div),
        high: Math.floor(data.h[i] / div),
        low: Math.floor(data.l[i] / div),
        close: Math.floor(data.c[i] / div),
      }));

      // برگرداندن ۵۰ کندل آخر برای خوانایی بهتر
      return NextResponse.json({ candles: candles.slice(-50) });
    }

    throw new Error("No Data");
  } catch (error) {
    // دیتای ساختگی برای حالت Fallback (کندل)
    const mockCandles = Array.from({ length: 30 }, (_, i) => {
      const base = 64000 + i * 50;
      const open = base + Math.random() * 200 - 100;
      const close = base + Math.random() * 200 - 100;
      return {
        time: Date.now() - (30 - i) * 3600 * 1000,
        open: Math.floor(open),
        close: Math.floor(close),
        high: Math.floor(Math.max(open, close) + Math.random() * 50),
        low: Math.floor(Math.min(open, close) - Math.random() * 50),
      };
    });
    return NextResponse.json({ candles: mockCandles });
  }
}