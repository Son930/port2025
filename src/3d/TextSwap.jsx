import React, { useState, useEffect } from "react";
import "./TextSwap.css"; // Create this CSS file

const TextSwap = ({
  words,
  animationType = "fade",
  duration = 3000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500); // Animation duration
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  const getAnimationClass = () => {
    switch (animationType) {
      case "slide-up":
        return "slide-up";
      case "slide-down":
        return "slide-down";
      case "flip":
        return "flip";
      case "rotate":
        return "rotate";
      default:
        return "fade";
    }
  };

  return (
    <div className={`text-swap-container ${className}`}>
      <span
        className={`text-swap-word ${getAnimationClass()} ${
          isAnimating ? "out" : "in"
        }`}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
};

export default TextSwap;
