import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-triggered stagger reveal for children with [data-reveal].
 */
export function useScrollReveal({ itemSelector = "[data-reveal]" } = {}) {
  const scopeRef = useRef(null);

  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const items = gsap.utils.toArray(itemSelector, root);
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { opacity: 1, y: 0, clearProps: "transform" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { opacity: 0, y: 28 });

        const triggers = ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.1,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });

        return () => triggers.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );

  return scopeRef;
}
