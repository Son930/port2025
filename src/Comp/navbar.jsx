import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const links = [
    { name: "LANDING", id: "landing" },
    { name: "KNOW ME", id: "know me" },
    { name: "PROJECTS", id: "projects" },
    { name: "SKILLS", id: "skills" },
    { name: "MOSAIC", id: "mosaic" },
    { name: "CONTACT ME", id: "footer" },
  ];

  const navItemVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo or Branding */}
          <div className="flex-shrink-0 text-neonBlue font-bold text-xl tracking-wide">
            <span className="hidden md:inline-block font-plutur">SUNNY</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, i) => (
              <motion.a
                key={link.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariant}
                onClick={() => scrollToSection(link.id)}
                className="text-white uppercase text-sm font-medium hover:text-neonBlue transition-colors relative group cursor-pointer font-clofie"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neonBlue transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neonBlue focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {links.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    onClick={() => {
                      scrollToSection(link.id);
                      setIsOpen(false);
                    }}
                    className="block px-3 py-2 text-white uppercase text-sm font-medium hover:bg-white/10 hover:text-neonBlue rounded-md transition-colors font-clofie"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
