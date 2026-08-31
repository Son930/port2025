export default function Marquee({ items, className = "" }) {
  const line = items.join(" — ");
  const repeated = `${line} — ${line} — `;

  return (
    <div
      className={`marquee border-y border-stone-300 dark:border-stone-700 bg-[var(--surface-muted)]/60 ${className}`.trim()}
      aria-hidden
    >
      <div className="marquee-track font-cormorant text-sm sm:text-base tracking-[0.2em] uppercase text-stone-500 dark:text-stone-500 py-3">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
}
