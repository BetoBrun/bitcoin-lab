import type { Level } from "./types";

export interface ThresholdSpec {
  level: Level;
  threshold: number;
  label: string;
}

export interface IndicatorMeta {
  id: string;
  shortName: string;
  name: string;
  subtitle: string;
  basis:
    | "realized"
    | "sth_realized"
    | "lth_realized"
    | "sma200d"
    | "tmm"
    | "vaulted"
    | "terminal"
    | "cvdd"
    | "sopr";
  direction: "below" | "above";
  thresholds: ThresholdSpec[];
  description?: string;
}

export const BOTTOM: IndicatorMeta[] = [
  {
    id: "mvrv", shortName: "MVRV", name: "MVRV Ratio", subtitle: "Market Value / Realized Value",
    basis: "realized", direction: "below",
    thresholds: [
      { level: "EXTREME", threshold: 0.8, label: "<= 0.8" },
      { level: "EXTREME", threshold: 1.0, label: "<= 1.0" },
      { level: "STRONG",  threshold: 1.2, label: "<= 1.2" },
      { level: "WATCH",   threshold: 1.4, label: "<= 1.4" },
    ],
  },
  {
    id: "sth_mvrv", shortName: "STH MVRV", name: "STH MVRV", subtitle: "Short-Term Holder MVRV",
    basis: "sth_realized", direction: "below",
    thresholds: [
      { level: "EXTREME", threshold: 0.60, label: "<= 0.60" },
      { level: "EXTREME", threshold: 0.66, label: "<= 0.66" },
      { level: "STRONG",  threshold: 0.70, label: "<= 0.70" },
      { level: "WATCH",   threshold: 0.80, label: "<= 0.80" },
    ],
  },
  {
    id: "mayer", shortName: "Mayer", name: "Mayer Multiple", subtitle: "Price / 200-day SMA",
    basis: "sma200d", direction: "below",
    thresholds: [
      { level: "EXTREME", threshold: 0.63, label: "<= 0.63" },
      { level: "STRONG",  threshold: 0.80, label: "<= 0.80" },
      { level: "WATCH",   threshold: 1.00, label: "<= 1.00" },
    ],
  },
  {
    id: "lth_mvrv", shortName: "LTH MVRV", name: "LTH MVRV", subtitle: "Long-Term Holder MVRV",
    basis: "lth_realized", direction: "below",
    thresholds: [
      { level: "EXTREME", threshold: 0.77, label: "<= 0.77" },
      { level: "EXTREME", threshold: 1.0,  label: "<= 1.0" },
      { level: "WATCH",   threshold: 1.5,  label: "<= 1.5" },
    ],
  },
  {
    id: "lth_sopr", shortName: "LTH SOPR", name: "LTH SOPR", subtitle: "Long-Term Holder Profit Ratio",
    basis: "sopr", direction: "below",
    thresholds: [
      { level: "EXTREME", threshold: 0.50, label: "<= 0.50" },
      { level: "EXTREME", threshold: 0.60, label: "<= 0.60" },
      { level: "WATCH",   threshold: 1.00, label: "<= 1.00" },
    ],
  },
  {
    id: "aviv", shortName: "AVIV", name: "AVIV Ratio", subtitle: "Price / True Market Mean",
    basis: "tmm", direction: "below",
    thresholds: [
      { level: "EXTREME", threshold: 0.556, label: "<= 0.556" },
      { level: "STRONG",  threshold: 0.75,  label: "<= 0.75" },
      { level: "WATCH",   threshold: 1.00,  label: "<= 1.00" },
    ],
  },
  {
    id: "cvdd", shortName: "CVDD", name: "CVDD Floor", subtitle: "Cumulative Value-Days Destroyed",
    basis: "cvdd", direction: "below",
    thresholds: [{ level: "EXTREME", threshold: 1.0, label: "Below CVDD" }],
  },
  {
    id: "realized", shortName: "Realized", name: "Price vs Realized", subtitle: "Spot vs Realized Price",
    basis: "realized", direction: "below",
    thresholds: [{ level: "EXTREME", threshold: 1.0, label: "Below Realized" }],
  },
];

export const TOP: IndicatorMeta[] = [
  {
    id: "mvrv", shortName: "MVRV", name: "MVRV Ratio", subtitle: "Market Value / Realized Value",
    basis: "realized", direction: "above",
    thresholds: [
      { level: "EXTREME", threshold: 3.90, label: ">= 3.90" },
      { level: "EXTREME", threshold: 3.65, label: ">= 3.65" },
      { level: "STRONG",  threshold: 2.95, label: ">= 2.95" },
      { level: "STRONG",  threshold: 2.70, label: ">= 2.70" },
      { level: "WATCH",   threshold: 2.40, label: ">= 2.40" },
    ],
  },
  {
    id: "sth_mvrv", shortName: "STH MVRV", name: "STH MVRV", subtitle: "Short-Term Holder MVRV",
    basis: "sth_realized", direction: "above",
    thresholds: [
      { level: "EXTREME", threshold: 1.60, label: ">= 1.60" },
      { level: "EXTREME", threshold: 1.50, label: ">= 1.50" },
      { level: "STRONG",  threshold: 1.40, label: ">= 1.40" },
      { level: "STRONG",  threshold: 1.32, label: ">= 1.32" },
      { level: "WATCH",   threshold: 1.20, label: ">= 1.20" },
    ],
  },
  {
    id: "mayer", shortName: "Mayer", name: "Mayer Multiple", subtitle: "Price / 200-day SMA",
    basis: "sma200d", direction: "above",
    thresholds: [
      { level: "EXTREME", threshold: 2.40, label: ">= 2.40" },
      { level: "EXTREME", threshold: 2.00, label: ">= 2.00" },
      { level: "STRONG",  threshold: 1.70, label: ">= 1.70" },
      { level: "WATCH",   threshold: 1.50, label: ">= 1.50" },
    ],
  },
  {
    id: "aviv", shortName: "AVIV", name: "AVIV Ratio", subtitle: "Price / True Market Mean",
    basis: "tmm", direction: "above",
    thresholds: [
      { level: "EXTREME", threshold: 1.880, label: ">= 1.880" },
      { level: "EXTREME", threshold: 1.800, label: ">= 1.800" },
      { level: "STRONG",  threshold: 1.700, label: ">= 1.700" },
      { level: "WATCH",   threshold: 1.650, label: ">= 1.650" },
    ],
  },
  {
    id: "lth_mvrv", shortName: "LTH MVRV", name: "LTH MVRV", subtitle: "Long-Term Holder MVRV",
    basis: "lth_realized", direction: "above",
    thresholds: [
      { level: "EXTREME", threshold: 11.0, label: ">= 11.0" },
      { level: "EXTREME", threshold: 8.0,  label: ">= 8.0" },
      { level: "STRONG",  threshold: 4.0,  label: ">= 4.0" },
      { level: "STRONG",  threshold: 3.0,  label: ">= 3.0" },
      { level: "WATCH",   threshold: 2.90, label: ">= 2.90" },
    ],
  },
  {
    id: "vaulted", shortName: "Vaulted", name: "Price vs Vaulted", subtitle: "Spot vs Vaulted Price",
    basis: "vaulted", direction: "above",
    thresholds: [
      { level: "EXTREME", threshold: 1.20, label: ">= 1.20" },
      { level: "EXTREME", threshold: 1.00, label: ">= 1.00" },
      { level: "STRONG",  threshold: 0.80, label: ">= 0.80" },
    ],
  },
  {
    id: "terminal", shortName: "Terminal", name: "Terminal Price", subtitle: "Awe & Wonder Terminal",
    basis: "terminal", direction: "above",
    thresholds: [
      { level: "EXTREME", threshold: 1.10, label: ">= 1.10" },
      { level: "EXTREME", threshold: 1.00, label: ">= 1.00" },
      { level: "STRONG",  threshold: 0.90, label: ">= 0.90" },
      { level: "WATCH",   threshold: 0.80, label: ">= 0.80" },
    ],
  },
];