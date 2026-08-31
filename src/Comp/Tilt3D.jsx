import { useRef, useState, useCallback } from "react";

const MAX_TILT = 14;
const PERSPECTIVE = 1200;

/**
 * Wraps content in a 3D oblique that tilts (rotateX/rotateY) based on mouse position over the element.
 */
export default function Tilt3D({ children, className = "" }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -2 * MAX_TILT;
    const tiltY = (x - 0.5) * 2 * MAX_TILT;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        perspective: PERSPECTIVE,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
