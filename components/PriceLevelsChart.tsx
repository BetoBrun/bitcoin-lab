"use client";
import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi } from "lightweight-charts";
import type { Indicator } from "@/lib/indicators/types";

type Pt = { time: string; price: number };
type Ohlc = { time: string; open: number; high: number; low: number; close: number };

function zoneColor(level: string) {
  return level === "EXTREME"
    ? "#ef4444"
    : level === "STRONG"
    ? "#f59e0b"
    : level === "WATCH"
    ? "#f7931a"
    : "#22c55e";
}

export default function PriceLevelsChart({
  history,
  ohlc,
  indicators,
  taMode,
}: {
  history: Pt[];
  ohlc?: Ohlc[];
  indicators: Indicator[];
  taMode?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "#141416" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { color: "#26262a" },
        horzLines: { color: "#26262a" },
      },
      rightPriceScale: { mode: 1 },
      timeScale: { timeVisible: false, secondsVisible: false },
    });
    chartRef.current = chart;

    if (taMode && ohlc?.length) {
      const s = chart.addCandlestickSeries({
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderVisible: false,
        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444",
      });
      s.setData(
        ohlc.map((o) => ({
          time: o.time,
          open: o.open,
          high: o.high,
          low: o.low,
          close: o.close,
        }))
      );
    } else {
      const line = chart.addLineSeries({ color: "#e5e7eb", lineWidth: 1 });
      line.setData(history.map((p) => ({ time: p.time, value: p.price })));
      indicators.forEach((ind) => {
        ind.zones.forEach((z) => {
          line.createPriceLine({
            price: z.triggerPrice,
            color: zoneColor(z.level),
            lineStyle: 2,
            lineWidth: 1,
            axisLabelVisible: true,
            title: `${ind.shortName} ${z.level}`,
          });
        });
      });
    }

    return () => chart.remove();
  }, [history, ohlc, indicators, taMode]);

  return (
    <div className="rounded-2xl border border-border bg-panel p-4">
      <h3 className="font-semibold mb-1">
        {taMode ? "BTC/USD Price Chart" : "BTC Price & On-Chain Signal Levels"}
      </h3>
      <p className="text-xs text-muted mb-3">
        {taMode
          ? "Logarithmic scale, daily candles"
          : "Dashed lines show where BTC price would trigger each indicator zone"}
      </p>
      <div ref={ref} className="h-[420px] w-full" />
    </div>
  );
}