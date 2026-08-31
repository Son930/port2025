import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useProjectListHover() {
  const scopeRef = useRef(null);

  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      let cleanups = [];

      mm.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray("[data-project-row]", root);

        rows.forEach((row) => {
          const img = row.querySelector("[data-project-img]");
          const arrow = row.querySelector("[data-project-arrow]");
          if (!img) return;

          if (arrow) gsap.set(arrow, { opacity: 0.25, x: 0 });

          const onEnter = () => {
            gsap.to(img, { scale: 1.08, duration: 0.45, ease: "power2.out" });
            if (arrow) gsap.to(arrow, { x: 8, opacity: 1, duration: 0.35, ease: "power2.out" });
          };

          const onLeave = () => {
            gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
            if (arrow) gsap.to(arrow, { x: 0, opacity: 0.25, duration: 0.3 });
          };

          row.addEventListener("mouseenter", onEnter);
          row.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            row.removeEventListener("mouseenter", onEnter);
            row.removeEventListener("mouseleave", onLeave);
          });
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        cleanups = [];
      };
    },
    { scope: scopeRef }
  );

  return scopeRef;
}
