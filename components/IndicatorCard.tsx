import type { Indicator } from "@/lib/indicators/types";

const colorByLevel: Record<string, string> = {
  NORMAL: "text-muted",
  WATCH: "text-accent",
  STRONG: "text-warn",
  EXTREME: "text-bad",
};

export default function IndicatorCard({ indicator }: { indicator: Indicator }) {
  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold ${colorByLevel[indicator.level]}`}>
          {indicator.level}
        </span>
      </div>
      <h3 className="font-semibold">{indicator.name}</h3>
      <p className="text-xs text-muted mb-4">{indicator.subtitle}</p>
      <p className="text-3xl text-center mb-4">
        {indicator.value.toFixed(indicator.value < 10 ? 2 : 0)}
      </p>
      <div className="grid grid-cols-1 gap-1 text-xs">
        {indicator.zones.map((z, i) => (
          <div key={i} className="flex justify-between">
            <span className={colorByLevel[z.level]}>
              {z.level} ({z.label})
            </span>
            <span>${z.triggerPrice.toLocaleString()}</span>
          </div>
        ))}
      </div>
      {indicator.description && (
        <p className="text-xs text-muted mt-4">{indicator.description}</p>
      )}
    </div>
  );
}