import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Simulate real-time BTC price (in production, use CoinGecko/Coinbase API)
  const basePrice = 77000;
  const variation = Math.floor(Math.random() * 2000) - 1000;
  const price = basePrice + variation;

  return NextResponse.json({
    price,
    timestamp: new Date().toISOString(),
  });
}