import { useSectionReveal } from "../hooks/useSectionReveal";

export default function Intro() {
  const sectionRef = useSectionReveal();

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-16 section-surface"
    >
      <div className="w-full max-w-3xl mx-auto relative z-10">
        <div data-section-reveal>
          <p className="classic-eyebrow">About</p>
          <h2 className="classic-title text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
            Computer science graduate building software, games, and robotics.
          </h2>
        </div>

        <p data-section-reveal className="mt-6 max-w-2xl classic-body text-base sm:text-lg">
          I studied at Aston University. I work with React, Node.js, PHP, and Laravel — aiming for work that is composed, responsive, and lasting.
        </p>

        <div data-section-reveal className="mt-8">
          <button type="button" className="classic-btn">
            Download resume
          </button>
        </div>
      </div>
    </section>
  );
}
