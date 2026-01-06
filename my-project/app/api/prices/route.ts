import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface PriceSource {
  name: string;
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  parse: (data: any) => number;
}

const SOURCES: PriceSource[] = [
  {
    name: "Nobitex",
    url: "https://api.nobitex.ir/market/stats",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Origin": "https://nobitex.ir",
      "Referer": "https://nobitex.ir/",
    },
    body: { srcCurrency: "usdt", dstCurrency: "rls" },
    parse: (data: any) => {
      if (data.status === "ok" && data.stats["usdt-rls"]) {
        return Math.floor(parseInt(data.stats["usdt-rls"].latest) / 10);
      }
      throw new Error("Invalid Data");
    },
  },
  {
    name: "TetherLand",
    url: "https://api.tetherland.com/currencies",
    method: "GET",
    headers: { "User-Agent": "Mozilla/5.0" },
    parse: (data: any) => parseInt(data.data.currencies.USDT.price),
  },
  {
    name: "Wallex",
    url: "https://api.wallex.ir/v1/markets",
    method: "GET",
    parse: (data: any) => parseInt(data.result.symbols.USDTTMN.stats.lastPrice),
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedSource = searchParams.get("source");

  const sourcesToTry = (requestedSource && requestedSource !== "Auto")
    ? SOURCES.filter((s) => s.name === requestedSource)
    : SOURCES;

  let finalPrice = 0;
  let successSource = "";

  for (const source of sourcesToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const fetchOptions: RequestInit = {
        method: source.method || "GET",
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
          ...(source.headers || {}),
        },
        signal: controller.signal,
        cache: "no-store",
      };

      if (source.body) fetchOptions.body = JSON.stringify(source.body);

      const res = await fetch(source.url, fetchOptions);
      clearTimeout(timeoutId);

      if (res.ok) {
        const text = await res.text();
        const data = JSON.parse(text);
        const price = source.parse(data);

        if (price > 50000) {
          finalPrice = price;
          successSource = source.name;
          break;
        }
      }
    } catch (error) {
      console.warn(`Failed: ${source.name}`);
    }
  }

  if (finalPrice === 0) {
    return NextResponse.json({ uusd: 0, uvoucher: 0, source: "Error" });
  }

  return NextResponse.json({
    uusd: finalPrice,
    uvoucher: finalPrice + 400,
    source: successSource,
  });
}