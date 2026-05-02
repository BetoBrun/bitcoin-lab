# Bitcoin Lab (Open Source)

Advanced Bitcoin on-chain analytics dashboard inspired by YLD Lab Bitcoin Lab.

## Features

- **3 Tabs**: Bottom, Top, TA
- **8 Bottom Indicators**: MVRV, STH MVRV, Mayer Multiple, LTH MVRV, LTH SOPR, AVIV, CVDD, Realized Price
- **7 Top Indicators**: MVRV, STH MVRV, Mayer, AVIV, LTH MVRV, Vaulted, Terminal
- **Technical Analysis**: Candlestick charts with Moving Averages and MACD
- **Scoreboard**: Shows signal strength (EXTREME/STRONG/WATCH/NO SIGNAL)
- **On-Chain Overlays**: Toggle indicators on chart

## Live Demo

**GitHub Pages**: https://betobrun.github.io/bitcoin-lab/bitcoin-lab/

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## For Static Export (GitHub Pages)

```bash
npm run build
```

The output will be in the `out` folder - deploy this to any static host.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- lightweight-charts (TradingView)
- Pure-function indicator math

## Data Sources

This version uses mock data. To connect real data:

1. **Glassnode** - MVRV, SOPR, STH/LTH cohorts (paid)
2. **CoinMetrics Community** - RealizedCap, prices (free)
3. **mempool.space** - UTXO sets
4. **CoinGecko/Coinbase** - Spot price

Edit `lib/data/mock.ts` to connect real APIs.

## License

MIT