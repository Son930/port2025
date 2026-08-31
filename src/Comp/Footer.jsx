import { useSectionReveal } from "../hooks/useSectionReveal";

export default function Footer() {
  const sectionRef = useSectionReveal();

  return (
    <footer ref={sectionRef} className="relative w-full section-surface py-20 sm:py-24 px-6">
      <div data-section-reveal className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <p className="classic-eyebrow mb-4">Contact</p>
        <a
          href="mailto:hello@sondhi.com"
          className="footer-email font-cormorant text-3xl sm:text-4xl md:text-5xl tracking-tight"
        >
          hello@sondhi.com
        </a>
        <p className="mt-5 max-w-md classic-body text-base">
          Available for projects. Say hello and we can talk about what you need.
        </p>

        <div className="flex items-center gap-8 mt-8">
          <a
            href="https://github.com/SunSondhi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-[var(--ink-muted)] text-sm tracking-[0.14em] uppercase hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sunny-sondhi/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-[var(--ink-muted)] text-sm tracking-[0.14em] uppercase hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="mt-16 text-center font-cormorant text-[var(--ink-faint)] text-xs tracking-[0.2em] uppercase">
        © {new Date().getFullYear()} Sunny Sondhi
      </p>
    </footer>
  );
}
