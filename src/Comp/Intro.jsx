/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const glitchFade = {
  hidden: {
    opacity: 0,
    filter: "blur(3px)",
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const sentenceFall = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
    },
  }),
};

// Simplified DNA Helix
const DNAHelix = ({ mousePos }) => {
  const helixRef = useRef();
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (helixRef.current && groupRef.current) {
      const t = clock.elapsedTime;
      helixRef.current.rotation.y = t * 0.3;

      // React to mouse movement
      groupRef.current.rotation.x = mousePos.y * 0.2;
      groupRef.current.rotation.y = mousePos.x * 0.2;
    }
  });

  const helixPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * Math.PI * 6;
      const radius = 2;
      points.push(
        new THREE.Vector3(
          Math.cos(t) * radius,
          (i / 100) * 6 - 3,
          Math.sin(t) * radius
        )
      );
    }
    return points;
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={helixRef}>
        {helixPoints.map((point, i) => (
          <mesh key={i} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhysicalMaterial
              color={`hsl(${(i * 4) % 360}, 70%, 60%)`}
              emissive={`hsl(${(i * 4) % 360}, 70%, 20%)`}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Main Component
const ArtisticIntro = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row w-full min-h-screen text-white px-8 md:px-16 py-16 md:py-32 bg-gradient-to-br from-darkBg via-black to-darkBg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#00ffff_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      {/* Left Content */}
      <div className="relative z-10 md:w-1/2 flex flex-col justify-center space-y-8">
        <motion.div
          custom={1}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl font-black leading-none font-plutur">
            <span className="block text-white font-bold mb-2">KNOW</span>
            <span className="block text-gradient font-bold">ME</span>
          </h1>
          <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-neonPurple rotate-45 animate-pulse" />
        </motion.div>

        <motion.div
          variants={glitchFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            As a Computer Science graduate from Aston University, I specialize in
            creating scalable, secure web and mobile applications. Proficient in
            front-end{" "}
            <span className="text-neonBlue font-semibold">
              (React, HTML, CSS)
            </span>
            , back-end{" "}
            <span className="text-neonPurple font-semibold">
              (Node.js, PHP, Laravel)
            </span>
            , and languages like{" "}
            <span className="text-neonPink font-semibold">
              Java, Python, C++, and C#
            </span>
            .
          </p>
          
          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            I excel in Web Development, Game Development, and Robotics. I'm eager to apply my skills to innovative projects, particularly in AI, Gaming and Robotics technology.
          </p>

          {/* Skills Highlights */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: "🌐", label: "Web Dev", color: "from-neonBlue to-cyan-500" },
              { icon: "🎮", label: "Game Dev", color: "from-neonPurple to-pink-500" },
              { icon: "🤖", label: "Robotics", color: "from-neonGreen to-emerald-500" },
              { icon: "🧠", label: "AI/ML", color: "from-neonYellow to-orange-500" }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:border-neonBlue/30 transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="text-2xl mb-2">{skill.icon}</div>
                <p className="text-white font-medium text-sm">{skill.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <button className="btn-classic bg-gradient-to-r from-neonBlue to-neonPurple hover:from-neonPurple hover:to-neonBlue text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-neon-blue hover:shadow-neon-purple">
              Download Resume
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right 3D Canvas - hide on small screens */}
      <div className="relative z-10 md:w-1/2 h-96 md:h-auto mt-12 md:mt-0">
        <div className="relative">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#ff00ff"
            />

            <DNAHelix mousePos={mousePos} />
          </Canvas>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neonBlue rounded-full animate-ping" />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-neonPink rounded-full animate-ping animation-delay-1000" />
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-neonPurple rounded-full animate-ping animation-delay-2000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisticIntro;
