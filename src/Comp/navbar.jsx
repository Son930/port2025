import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeProvider";

const NAV_LINKS = [
  { name: "About", id: "know me" },
  { name: "Work", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "footer" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const wasOpen = isOpen;
    setIsOpen(false);
    const go = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (wasOpen) {
      window.setTimeout(go, 280);
    } else {
      go();
    }
  };

  const navShell = scrolled
    ? "bg-[var(--surface)]/95 backdrop-blur-sm border-b border-[var(--border-classic)]"
    : "bg-transparent";

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${navShell}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={() => scrollToSection("landing")}
            className="font-cormorant text-sm tracking-[0.14em] uppercase text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          >
            Sunny Sondhi
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="font-cormorant text-sm tracking-[0.1em] uppercase text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[var(--ink)]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-[var(--border-classic)] bg-[var(--surface)]"
            >
              <div className="px-2 py-3 space-y-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left px-3 py-3 font-cormorant text-base tracking-[0.1em] uppercase text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
