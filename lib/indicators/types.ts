export type Level = "NORMAL" | "WATCH" | "STRONG" | "EXTREME";

export interface Zone {
  level: Level;
  label: string;
  threshold: number;
  triggerPrice: number;
}

export interface Indicator {
  id: string;
  shortName: string;
  name: string;
  subtitle: string;
  value: number;
  level: Level;
  zones: Zone[];
  description?: string;
}

export interface OnChainSnapshot {
  price: number;
  realizedPrice: number;
  sthRealizedPrice: number;
  lthRealizedPrice: number;
  sma200d: number;
  trueMarketMean: number;
  vaultedPrice: number;
  terminalPrice: number;
  cvddFloor: number;
  lthSopr: number;
  updatedAt: string;
}