import { useEffect, useRef, useState } from "react";

function textValue(children, dataText) {
  if (dataText) return dataText;
  if (typeof children === "string") return children;
  return "";
}

/**
 * Cyberpunk RGB-split text with optional random burst glitches.
 */
export default function GlitchText({
  as: Tag = "span",
  children,
  dataText,
  className = "",
  random = true,
  burstOnMount = false,
  minInterval = 3500,
  maxInterval = 11000,
  burstDuration = 700,
}) {
  const label = textValue(children, dataText);
  const [burst, setBurst] = useState(burstOnMount);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!burstOnMount) return undefined;
    const t = setTimeout(() => setBurst(false), burstDuration);
    return () => clearTimeout(t);
  }, [burstOnMount, burstDuration]);

  useEffect(() => {
    if (!random) return undefined;

    let timeoutId;
    const schedule = () => {
      const wait = minInterval + Math.random() * (maxInterval - minInterval);
      timeoutId = setTimeout(() => {
        if (!mounted.current) return;
        setBurst(true);
        setTimeout(() => {
          if (mounted.current) setBurst(false);
        }, burstDuration * (0.6 + Math.random() * 0.5));
        schedule();
      }, wait);
    };

    schedule();
    return () => clearTimeout(timeoutId);
  }, [random, minInterval, maxInterval, burstDuration]);

  return (
    <Tag
      className={`glitch glitch-rainbow ${burst ? "glitch-burst" : ""} ${className}`.trim()}
      data-text={label}
    >
      {children}
    </Tag>
  );
}

/** Image/card wrapper with random colorful scanline bursts. */
export function GlitchFrame({
  children,
  className = "",
  random = true,
  minInterval = 4000,
  maxInterval = 14000,
}) {
  const [burst, setBurst] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!random) return undefined;

    let timeoutId;
    const schedule = () => {
      const wait = minInterval + Math.random() * (maxInterval - minInterval);
      timeoutId = setTimeout(() => {
        if (!mounted.current) return;
        setBurst(true);
        setTimeout(() => {
          if (mounted.current) setBurst(false);
        }, 500 + Math.random() * 600);
        schedule();
      }, wait);
    };

    schedule();
    return () => clearTimeout(timeoutId);
  }, [random, minInterval, maxInterval]);

  return (
    <div
      className={`glitch-frame glitch-frame-rainbow ${burst ? "glitch-frame-burst" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
