"use client";
import { TrendingDown, TrendingUp, LineChart } from "lucide-react";

type Tab = "bottom" | "top" | "ta";

export default function TabBar({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
}) {
  const items: { id: Tab; label: string; icon: any }[] = [
    { id: "bottom", label: "Bottom", icon: TrendingDown },
    { id: "top", label: "Top", icon: TrendingUp },
    { id: "ta", label: "TA", icon: LineChart },
  ];
  return (
    <div className="flex gap-6 border-b border-border">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-2 px-1 pb-2 text-sm transition ${
            tab === id ? "text-white border-b-2 border-white" : "text-muted hover:text-white"
          }`}
        >
          <Icon size={16} /> {label}
        </button>
      ))}
    </div>
  );
}