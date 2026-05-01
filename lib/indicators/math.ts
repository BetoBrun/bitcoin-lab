// Pure indicator math — all inputs are numbers, no external state.

export const mvrv = (marketCap: number, realizedCap: number) => marketCap / realizedCap;
export const mayerMultiple = (price: number, sma200d: number) => price / sma200d;
export const aviv = (price: number, trueMarketMean: number) => price / trueMarketMean;

export function sma(values: number[], period: number): number[] {
  const out: number[] = [];
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    out.push(i >= period - 1 ? sum / period : NaN);
  }
  return out;
}

export function ema(values: number[], period: number): number[] {
  const out: number[] = [];
  const k = 2 / (period + 1);
  let prev = values[0];
  for (let i = 0; i < values.length; i++) {
    prev = i === 0 ? values[0] : values[i] * k + prev * (1 - k);
    out.push(prev);
  }
  return out;
}

export function macd(values: number[], fast = 12, slow = 26, signal = 9) {
  const fastE = ema(values, fast);
  const slowE = ema(values, slow);
  const macdLine = values.map((_, i) => fastE[i] - slowE[i]);
  const sig = ema(macdLine, signal);
  const hist = macdLine.map((v, i) => v - sig[i]);
  return { macdLine, signal: sig, histogram: hist };
}

// First bar where histogram is negative but rising (bearish deceleration).
export function macdHistReversal(histogram: number[]): number[] {
  const flags: number[] = histogram.map(() => 0);
  for (let i = 2; i < histogram.length; i++) {
    if (
      histogram[i] < 0 &&
      histogram[i] > histogram[i - 1] &&
      histogram[i - 1] < histogram[i - 2]
    ) {
      flags[i] = 1;
    }
  }
  return flags;
}