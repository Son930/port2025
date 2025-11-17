import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "**/*.glb",
  ],

  theme: {
    extend: {
      colors: {
        neonPink: "#ff00ff",
        neonBlue: "#00ffff",
        neonPurple: "#8a2be2",
        neonGreen: "#00ff00",
        neonYellow: "#ffff00",
        neonOrange: "#ff6600",
        darkBg: "#0a0a0a",
        cardBg: "rgba(255, 255, 255, 0.05)",
        glassBg: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        plutur: ["Plutur", "monospace"],
        superline: ["Superline", "sans-serif"],
        clofie: ["Clofie", "serif"],
        humble: ["HumbleSpark", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 1s ease-out forwards",
        "fade-delay": "fadeUp 1s ease-out forwards 0.6s",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "matrix": "matrix 20s linear infinite",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-down": "slideDown 0.8s ease-out forwards",
        "slide-left": "slideLeft 0.8s ease-out forwards",
        "slide-right": "slideRight 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff" },
          "100%": { boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff" },
        },
        matrix: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-blue": "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff",
        "neon-pink": "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff",
        "neon-purple": "0 0 5px #8a2be2, 0 0 10px #8a2be2, 0 0 15px #8a2be2",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  darkMode: "class",
  plugins: [
    heroui, 
  ],
};
