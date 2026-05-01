export default function Scoreboard({
  kind,
  score,
  total,
  price,
  updatedAt,
}: {
  kind: "bottom" | "top";
  score: number;
  total: number;
  price: number;
  updatedAt: string;
}) {
  const level =
    score === 0
      ? "NO SIGNAL"
      : score >= Math.ceil(total * 0.75)
      ? "EXTREME"
      : score >= Math.ceil(total * 0.5)
      ? "STRONG"
      : "WATCH";

  const color =
    level === "EXTREME"
      ? "bg-bad"
      : level === "STRONG"
      ? "bg-warn"
      : level === "WATCH"
      ? "bg-accent"
      : "bg-border";

  const dt = new Date(updatedAt);

  return (
    <div className="rounded-2xl border border-border bg-panel p-8">
      <div className="flex items-center justify-end gap-3">
        <span className="text-accent text-2xl">₿</span>
        <span className="text-4xl font-bold">${price.toLocaleString()}</span>
      </div>
      <div className="text-right text-xs text-muted mb-6">
        Updated {dt.toUTCString().slice(5, 22)} UTC
      </div>
      <div className="border-t border-border pt-6 text-center">
        <p className="text-muted text-sm tracking-widest mb-3">
          IS BITCOIN MAKING A {kind === "bottom" ? "BOTTOM" : "TOP"}?
        </p>
        <p className="text-5xl font-bold">
          <span className="text-accent">{score}</span>
          <span className="text-muted"> / {total}</span>
        </p>
        <span
          className={`inline-block mt-3 px-4 py-1 rounded-full text-xs font-bold text-black ${color}`}
        >
          {level}
        </span>
        <div className="flex gap-1 justify-center mt-4">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-12 rounded-full ${i < score ? color : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}