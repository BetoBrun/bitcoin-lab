import { computeIndicators } from "@/lib/indicators/compute";
import type { OnChainSnapshot, Indicator } from "@/lib/indicators/types";

function generatePriceHistory(): { time: string; price: number }[] {
  const data: { time: string; price: number }[] = [];
  let price = 40000;
  const startDate = new Date("2024-01-01");
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    price = price * (1 + (Math.random() - 0.48) * 0.05);
    data.push({
      time: date.toISOString().split("T")[0],
      price: Math.round(price),
    });
  }
  return data;
}

function generateOHLCHistory(): { time: string; open: number; high: number; low: number; close: number }[] {
  const data: { time: string; open: number; high: number; low: number; close: number }[] = [];
  let price = 40000;
  const startDate = new Date("2024-01-01");
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const open = price;
    const change = (Math.random() - 0.48) * 0.05;
    const close = price * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    price = close;
    data.push({
      time: date.toISOString().split("T")[0],
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
    });
  }
  return data;
}

function generateSnapshot(): OnChainSnapshot {
  const btcPrice = 77363 + Math.round((Math.random() - 0.5) * 2000);
  const realized = 54099;
  const sthRealized = 52000;
  const lthRealized = 48000;
  const sma200 = Math.round(btcPrice * (0.9 + Math.random() * 0.2));
  const tmm = 77986;
  const vaulted = 148804;
  const terminal = 294275;
  const cvdd = 46764;
  const lthSopr = 1.0 + (Math.random() - 0.5) * 0.5;

  return {
    price: btcPrice,
    realizedPrice: realized,
    sthRealizedPrice: sthRealized,
    lthRealizedPrice: lthRealized,
    sma200d: sma200,
    trueMarketMean: tmm,
    vaultedPrice: vaulted,
    terminalPrice: terminal,
    cvddFloor: cvdd,
    lthSopr: lthSopr,
    updatedAt: new Date().toISOString(),
  };
}

export function generateMockData(tab: "bottom" | "top" | "ta") {
  const priceHistory = generatePriceHistory();
  const ohlcHistory = generateOHLCHistory();
  const snapshot = generateSnapshot();
  const btcPrice = snapshot.price;
  
  const indicators: Indicator[] = computeIndicators(snapshot, tab === "ta" ? "bottom" : tab);

  return {
    btcPrice,
    updatedAt: new Date().toISOString(),
    priceHistory,
    ohlcHistory: tab === "ta" ? ohlcHistory : undefined,
    indicators: tab !== "ta" ? indicators : undefined,
  };
}