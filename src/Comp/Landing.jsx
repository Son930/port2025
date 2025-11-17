import React from "react";
import { motion } from "framer-motion";
import MatrixBackground from "../3d/MatrixBack";

const letterVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  }),
};

const Landing = () => {
  const name = "Sunny Sondhi".split("");

  return (
    <div className="relative w-screen h-screen overflow-hidden font-plutur bg-black">
      {/* Background */}
      <MatrixBackground />

      {/* Cyberpunk Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neonPink via-black to-neonBlue opacity-10 pointer-events-none mix-blend-screen"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 space-y-12">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-4xl text-neonBlue font-mono tracking-wider"
        >
          HELLO WORLD 🧠 I AM
        </motion.p>

        {/* Cyberpunk Name */}
        <div className="flex flex-wrap justify-center drop-shadow-neon">
          {name.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              animate="visible"
              className={`font-bold text-[12vw] md:text-[10vw] text-neonPink hover:text-neonBlue transition-colors duration-300 ${
                char === " " ? "w-4" : ""
              }`}
              style={{
                lineHeight: 1.1,
                fontFamily: "Plutur, Orbitron, monospace",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Taglines */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          whileInView="visible"
          viewport={{ once: false }}
          className="text-xl md:text-2xl text-neonPurple font-mono tracking-wide"
        >
          🛠️ Full Stack | 🎮 Game Dev | 🤖 Robotics (ROS)
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8"
        >
          <button className="btn-classic bg-gradient-to-r from-neonBlue to-neonPurple hover:from-neonPurple hover:to-neonBlue text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-neon-blue hover:shadow-neon-purple transition-all duration-300 transform hover:scale-105">
            Explore My Work
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-neonBlue animate-bounce-slow">
            <span className="text-sm mb-2 font-mono">SCROLL</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
