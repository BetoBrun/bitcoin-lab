"use client";
import { useState } from "react";
import TabBar from "@/components/TabBar";
import Scoreboard from "@/components/Scoreboard";
import IndicatorCard from "@/components/IndicatorCard";
import OverlayPanel from "@/components/OverlayPanel";
import PriceLevelsChart from "@/components/PriceLevelsChart";
import { generateMockData } from "@/lib/data/mock";
import type { Indicator } from "@/lib/indicators/types";

type Tab = "bottom" | "top" | "ta";

// Generate data at build time for static export
const bottomData = generateMockData("bottom");
const topData = generateMockData("top");
const taData = generateMockData("ta");

export default function BitcoinLabPage() {
  const [tab, setTab] = useState<Tab>("bottom");

  const data = tab === "top" ? topData : tab === "ta" ? taData : bottomData;
  const indicators = data?.indicators ?? [];
  const activeCount = indicators.filter((i: Indicator) => i.level !== "NORMAL").length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <header className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/20 grid place-items-center text-accent text-xl">₿</div>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Bitcoin Lab
            <span className="text-[10px] bg-accent text-black px-2 py-0.5 rounded-full font-bold">PRO</span>
          </h1>
          <p className="text-muted text-sm">Advanced Bitcoin on-chain analytics</p>
        </div>
      </header>

      <TabBar tab={tab} onChange={setTab} />

      <p className="text-muted text-xs">Updated: {data.updatedAt}</p>

      {tab !== "ta" && (
        <>
          <Scoreboard
            kind={tab as "bottom" | "top"}
            score={activeCount}
            total={indicators.length}
            price={data.btcPrice}
            updatedAt={data.updatedAt}
          />
          <div className="grid lg:grid-cols-[1fr_280px] gap-6">
            <PriceLevelsChart history={data.priceHistory} indicators={indicators} />
            <OverlayPanel indicators={indicators} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {indicators.map((ind: Indicator) => (
              <IndicatorCard key={ind.id} indicator={ind} />
            ))}
          </div>
        </>
      )}

      {tab === "ta" && (
        <PriceLevelsChart
          history={data.priceHistory}
          ohlc={data.ohlcHistory}
          indicators={[]}
          taMode
        />
      )}
    </div>
  );
}