/** Deterministic placeholder photos via Picsum (same approach as Projects). */
export function placeholderImage(seed, w = 800, h = 1000) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}
