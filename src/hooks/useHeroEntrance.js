import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useHeroEntrance() {
  const scopeRef = useRef(null);

  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.querySelectorAll("[data-hero-part]"), {
          clearProps: "all",
          y: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.from("[data-hero-name]", { y: 18, duration: 0.5 })
            .from("[data-hero-sub]", { y: 12, duration: 0.4 }, "-=0.32")
            .from("[data-hero-body]", { y: 10, duration: 0.35 }, "-=0.24")
            .from("[data-hero-actions]", { y: 8, duration: 0.3 }, "-=0.2");
        }, root);

        return () => ctx.revert();
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );

  return scopeRef;
}
