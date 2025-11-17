import { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
  const posRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const rippleContainerRef = useRef(null);

  // Initialize and cleanup
  useEffect(() => {
    const rippleContainer = document.createElement("div");
    rippleContainer.className = "fixed inset-0 pointer-events-none z-[997]";
    rippleContainerRef.current = rippleContainer;
    document.body.appendChild(rippleContainer);
    document.body.classList.add("cursor-none");

    return () => {
      rippleContainer.remove();
      document.body.classList.remove("cursor-none");
    };
  }, []);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      // Hover detection
      const hoverElement = document.elementFromPoint(e.clientX, e.clientY);
      setIsHovering(!!hoverElement?.closest("[data-cursor-hover]"));
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Click handlers
  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => {
      setIsClicking(false);
      createRipple();
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrameId;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      // Smooth position interpolation
      posRef.current = {
        x: lerp(posRef.current.x, targetPosRef.current.x, 0.2),
        y: lerp(posRef.current.y, targetPosRef.current.y, 0.2),
      };

      if (cursorRef.current && followerRef.current) {
        // Main cursor (instant position)
        cursorRef.current.style.transform = `translate(${
          targetPosRef.current.x
        }px, ${targetPosRef.current.y}px) scale(${isHovering ? 1.5 : 1})`;

        // Follower cursor (smooth position)
        followerRef.current.style.transform = `translate(${
          posRef.current.x
        }px, ${posRef.current.y}px) scale(${
          isClicking ? 0.8 : isHovering ? 1.3 : 1
        })`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering, isClicking]);

  // Ripple effect
  const createRipple = () => {
    if (!rippleContainerRef.current) return;

    const ripple = document.createElement("div");
    ripple.className =
      "absolute w-10 h-10 border-2 border-white rounded-full opacity-80";
    ripple.style.left = `${targetPosRef.current.x}px`;
    ripple.style.top = `${targetPosRef.current.y}px`;
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";

    rippleContainerRef.current.appendChild(ripple);

    // Trigger animation
    requestAnimationFrame(() => {
      ripple.style.transform = "translate(-50%, -50%) scale(2)";
      ripple.style.opacity = "0";
    });

    // Cleanup
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-white mix-blend-difference rounded-full pointer-events-none z-[999] transition-transform duration-100 will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Follower cursor */}
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[998] transition-all duration-200 will-change-transform"
        style={{
          transform: "translate(-50%, -50%)",
          borderWidth: isClicking ? "3px" : "2px",
          transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.32, 1.28)",
        }}
      />
    </>
  );
};

export default CustomCursor;
