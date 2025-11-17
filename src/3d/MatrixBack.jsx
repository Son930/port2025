import React, { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // const matrixChars =
    //   "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const matrixChars =
      // Japanese Katakana + Hiragana
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
      "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" +
      // Chinese (simplified + traditional) basic set
      "汉字漢字" +
      // Korean Hangul (basic syllables)
      "한글" +
      // Cyrillic uppercase + lowercase
      "АБВГДЕЖЗИЙКЛМНЯ" +
      "абвгдежзийклмно" +
      // Greek uppercase + lowercase
      "ΑΒΓΔΕΖΗΘΙΚΛΜ" +
      "αβγδεζηθικλμ" +
      // Arabic basic letters (isolated forms, common letters)
      "اطظعغفقكلمنهوي" +
      // Hindi Devanagari (common consonants + vowels)
      "अआइईउऊऋएऐओऔकखगघङचछजझ" +
      // English uppercase + lowercase + numbers
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz" +
      "0123456789" +
      // Geometric shapes + block elements + math symbols
      "■□◆◇◈◉◎●◌▔▕▖▗▘▙▚▛▜▝▞▟" +
      // Additional accents and marks (for flavor)
      "̧̣̥̃́̀̄̆̌̇̈";



    const fontSize = 20;
    const columns = Math.floor(width / fontSize);

    const drops = new Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; // Increased alpha for faster fade
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0A0"; // Slightly dimmer green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text =
          matrixChars[Math.floor(Math.random() * matrixChars.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.99) {
          // Higher threshold for less frequent resets
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let lastTime = 0;
    const frameDelay = 15; // 100ms delay (~10 FPS)

    const animate = (timestamp) => {
      if (timestamp - lastTime >= frameDelay) {
        draw();
        lastTime = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        backgroundColor: "black",
      }}
    />
  );
};

export default MatrixBackground;
