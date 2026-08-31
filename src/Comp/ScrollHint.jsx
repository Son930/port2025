export default function ScrollHint({ label = "Scroll" }) {
  return (
    <div className="scroll-hint flex flex-col items-center gap-2 text-[var(--ink-faint)]" aria-hidden>
      <span className="font-cormorant text-[0.65rem] sm:text-xs tracking-[0.35em] uppercase">({label})</span>
      <span className="scroll-hint__line block w-px h-10 bg-[var(--accent)]" />
    </div>
  );
}
