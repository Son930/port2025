import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Clip + fade reveal for section blocks marked with data-section-reveal. */
export function useSectionReveal() {
  const scopeRef = useRef(null);

  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const blocks = gsap.utils.toArray("[data-section-reveal]", root);
      if (!blocks.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(blocks, { opacity: 1, y: 0, clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        blocks.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 32,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );

  return scopeRef;
}
