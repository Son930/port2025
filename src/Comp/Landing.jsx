import ScrollHint from "./ScrollHint";
import { useHeroEntrance } from "../hooks/useHeroEntrance";
import "./Landing.css";

const HERO_NAME = "Sunny Sondhi";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Landing() {
  const heroRef = useHeroEntrance();

  return (
    <section id="home" ref={heroRef} className="landing-hero relative section-surface">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 pt-28 pb-12">
        <h1
          data-hero-name
          data-hero-part
          className="classic-title leading-[0.95] text-5xl sm:text-6xl md:text-7xl"
        >
          {HERO_NAME}
        </h1>

        <p data-hero-sub data-hero-part className="mt-5 font-cormorant text-xl sm:text-2xl text-[var(--ink-muted)]">
          Software engineer — robotics &amp; games
        </p>

        <p data-hero-body data-hero-part className="mt-6 max-w-md classic-body text-base sm:text-lg">
          I build websites and products that are clear, responsive, and built to last.
        </p>

        <div data-hero-actions data-hero-part className="mt-9 flex flex-wrap gap-3">
          <button type="button" className="classic-btn" onClick={() => scrollToSection("projects")}>
            View work
          </button>
          <button type="button" className="classic-btn-ghost" onClick={() => scrollToSection("footer")}>
            Get in touch
          </button>
        </div>
      </div>

      <div data-hero-part className="flex justify-center pb-8">
        <ScrollHint />
      </div>
    </section>
  );
}
