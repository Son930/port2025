/* eslint-disable react/no-unknown-property */
import "./Footer.css";

import { motion } from "framer-motion";
import Contact from "../Comp/Contact";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Footer = () => {
  return (
    // <footer className="min-h-[100vh] relative overflow-hidden font-[Plutur] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <footer className="min-h-[100vh] relative overflow-hidden font-plutur bg-gradient-to-br from-darkBg via-black to-darkBg">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        <div className="absolute w-[300%] h-[200%] -top-1/2 -left-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#1e293b_20%,#334155_40%,#0f172a_60%,#1e293b_80%,#0f172a_100%)] rounded-full" />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-neonBlue/10 to-neonPurple/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 min-h-[100vh] flex flex-col">
        <motion.div
          className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
            {/* Left Column - Header & Info */}
            <motion.div className="space-y-8" variants={item}>
              {/* Name Section */}
              <div className="space-y-4">
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl xl:text-10xl tracking-wide capitalize font-[SuperlineOutlineItalic] leading-none"
                  variants={slideIn}
                >
                  Sunny Sondhi
                </motion.h1>

                <motion.div className="space-y-2" variants={item}>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-wide capitalize font-[Superline] text-gray-200">
                    Junior Software Developer
                  </h2>
                  <div className="flex items-center gap-3 mt-4">
                    {/* <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-lg md:text-xl text-emerald-400 font-medium">
                      Currently Looking for a Job
                    </p> */}
                  </div>
                </motion.div>
              </div>

              {/* Skills or Quick Info */}
              <motion.div className="space-y-4 pt-8" variants={item}>
                <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                  Feel free to contact me
                </p>
              </motion.div>

              {/* Social Links or Quick Actions */}
              <motion.div className="flex flex-wrap gap-4 pt-4" variants={item}>
                {[
                  { label: "GitHub 1", href: "https://github.com/SunSondhi" },
                  { label: "GitHub 2", href: "https://github.com/Son930" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/sunny-sondhi/" },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="group relative px-4 py-2 text-gray-400 hover:text-green-400 transition-all duration-300 border border-gray-700 rounded-lg hover:border-cyan-400/50 hover:bg-cyan-400/5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-emerald-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div className="lg:pl-8" variants={item}>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-neonBlue/30 transition-all duration-300">
                <motion.h3
                  className="text-2xl tracking-wide md:text-3xl font-plutur mb-6 text-white"
                  variants={item}
                >
                  Let&apos;s <span className="text-gradient">Connect</span>
                </motion.h3>
                <Contact />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-auto border-t border-gray-800/50 backdrop-blur-sm"
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative">
              {/* Decorative line */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent" />

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                <motion.p className="text-gray-400 text-sm" variants={item}>
                  © {new Date().getFullYear()} Portfolio by Sunny Sondhi.
                </motion.p>

                <motion.div className="flex items-center gap-6" variants={item}>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Available for opportunities</span>
                  </div>
                  <div className="text-xs text-gray-500">Made with React</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
