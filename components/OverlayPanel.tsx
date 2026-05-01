"use client";
import { useState } from "react";
import type { Indicator } from "@/lib/indicators/types";

export default function OverlayPanel({ indicators }: { indicators: Indicator[] }) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(indicators.map((i) => [i.id, true]))
  );

  return (
    <aside className="rounded-2xl border border-border bg-panel p-5 space-y-3 h-fit">
      <h3 className="font-semibold">On-Chain Overlays</h3>
      <p className="text-xs text-muted">Toggle signal levels on the chart</p>
      {indicators.map((i) => (
        <div key={i.id} className="flex items-center justify-between">
          <div>
            <p className="text-sm">{i.shortName}</p>
            <p className="text-xs text-muted">{i.value.toFixed(2)}</p>
          </div>
          <button
            onClick={() => setEnabled((s) => ({ ...s, [i.id]: !s[i.id] }))}
            className={`w-10 h-6 rounded-full transition ${
              enabled[i.id] ? "bg-good" : "bg-border"
            }`}
            aria-label={`Toggle ${i.name}`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white m-0.5 transition ${
                enabled[i.id] ? "translate-x-4" : ""
              }`}
            />
          </button>
        </div>
      ))}
      <div className="flex gap-3 text-xs text-muted pt-2 border-t border-border">
        <button
          onClick={() =>
            setEnabled(Object.fromEntries(indicators.map((i) => [i.id, true])))
          }
        >
          Show all
        </button>
        <span>|</span>
        <button
          onClick={() =>
            setEnabled(Object.fromEntries(indicators.map((i) => [i.id, false])))
          }
        >
          Hide all
        </button>
      </div>
    </aside>
  );
}