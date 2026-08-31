/** Lightweight fixed grain (CSS only, no canvas). */
export default function PageAtmosphere() {
  return (
    <div className="page-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="page-atmosphere__grain" />
    </div>
  );
}
