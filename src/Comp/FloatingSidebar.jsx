import { motion } from "framer-motion";
import { CodeBracketSquareIcon, LinkIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "GitHub", href: "https://github.com/SunSondhi", Icon: CodeBracketSquareIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sunny-sondhi/", Icon: LinkIcon },
];

export default function FloatingSidebar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="flex flex-col items-center gap-6 pl-6"
      >
        <div className="flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 dark:text-stone-400 hover:text-[var(--accent-classic)] transition-colors"
              aria-label={link.name}
            >
              <link.Icon className="w-5 h-5" strokeWidth={1.25} />
            </a>
          ))}
        </div>
        <div className="w-px h-24 bg-stone-300 dark:bg-stone-600" />
      </motion.div>
    </div>
  );
}
