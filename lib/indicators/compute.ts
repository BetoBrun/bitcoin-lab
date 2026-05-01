import { BOTTOM, TOP } from "./registry";
import type { Indicator, OnChainSnapshot, Level } from "./types";

function determineLevel(value: number, thresholds: { level: Level; threshold: number }[], direction: "below" | "above"): Level {
  for (const t of thresholds) {
    if (direction === "below" && value <= t.threshold) return t.level;
    if (direction === "above" && value >= t.threshold) return t.level;
  }
  return "NORMAL";
}

function computeZones(
  meta: typeof BOTTOM[number],
  snapshot: OnChainSnapshot
): Indicator["zones"] {
  const basisMap: Record<string, number> = {
    realized: snapshot.realizedPrice,
    sth_realized: snapshot.sthRealizedPrice,
    lth_realized: snapshot.lthRealizedPrice,
    sma200d: snapshot.sma200d,
    tmm: snapshot.trueMarketMean,
    vaulted: snapshot.vaultedPrice,
    terminal: snapshot.terminalPrice,
    cvdd: snapshot.cvddFloor,
    sopr: snapshot.lthSopr,
  };

  const basis = basisMap[meta.basis] || snapshot.realizedPrice;
  
  return meta.thresholds.map((t) => ({
    level: t.level,
    label: t.label,
    threshold: t.threshold,
    triggerPrice: Math.round(t.threshold * basis),
  }));
}

export function computeIndicators(
  snapshot: OnChainSnapshot,
  which: "bottom" | "top"
): Indicator[] {
  const metas = which === "bottom" ? BOTTOM : TOP;
  
  const valueMap: Record<string, number> = {
    mvrv: snapshot.price / snapshot.realizedPrice,
    sth_mvrv: snapshot.price / snapshot.sthRealizedPrice,
    lth_mvrv: snapshot.price / snapshot.lthRealizedPrice,
    mayer: snapshot.price / snapshot.sma200d,
    aviv: snapshot.price / snapshot.trueMarketMean,
    lth_sopr: snapshot.lthSopr,
    cvdd: snapshot.price / snapshot.cvddFloor,
    realized: snapshot.price / snapshot.realizedPrice,
    vaulted: snapshot.price / snapshot.vaultedPrice,
    terminal: snapshot.price / snapshot.terminalPrice,
  };

  return metas.map((meta) => {
    const value = valueMap[meta.id] ?? 1;
    const level = determineLevel(value, meta.thresholds, meta.direction);
    
    return {
      id: meta.id,
      shortName: meta.shortName,
      name: meta.name,
      subtitle: meta.subtitle,
      value,
      level,
      zones: computeZones(meta, snapshot),
      description: meta.description,
    };
  });
}