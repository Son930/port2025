import { useEffect, useState } from "react";
import { useSectionReveal } from "../hooks/useSectionReveal";

const GITHUB_USERS = ["Son930", "SunSondhi"];

const SKIP_REPOS = new Set([
  "port2025",
  "Port2025",
  "SunSondhi",
  "Son930",
  "TeamProject36Draft",
  "-Multi-Platform-AI-Assistant-Mock-Demo-",
  "Recovo",
  "Cake-TechnicalTest",
]);

const DISPLAY_TITLES = {
  SunnyFYP: "Robot Receptionist",
  smart_whatsapp_assistance: "Multi-Platform AI Assistant",
  WhalePaperEngine: "Whale Paper Engine",
  DroneSP500: "Drone SP500",
  TheGildedBottle: "The Gilded Bottle",
  "AI-Predictor": "AI Predictor",
};

const EXTRA_DESCRIPTIONS = {
  SunnyFYP:
    "Robot receptionist for the RB1 BASE — ROS2 navigation, voice commands, and campus wayfinding.",
  WhalePaperEngine: "Rust project.",
  DroneSP500: "Python controller for a SNAPTAIN SP500 drone over Wi-Fi, using Nintendo Joy-Cons.",
  TheGildedBottle:
    "Team e-commerce site for beverages, with memberships, admin tools, and a Java stock inventory app.",
};

const FALLBACK_PROJECTS = [
  {
    title: "AI Predictor",
    year: "2025",
    tag: "Python",
    description:
      "Multi-strategy trading research system for MetaTrader 5 with XGBoost, PyTorch, FastAPI, and a React dashboard.",
    link: "https://github.com/Son930/AI-Predictor",
    live: null,
  },
  {
    title: "Smart WhatsApp Assistance",
    year: "2025",
    tag: "JavaScript",
    description:
      "Prototype chat assistant across WhatsApp, Messenger, Instagram, and Telegram — React frontend, Node.js backend.",
    link: "https://github.com/Son930/smart_whatsapp_assistance",
    live: "https://smart-whatsapp-assistance.vercel.app",
  },
  {
    title: "Robot Receptionist",
    year: "2024",
    tag: "Python",
    description: EXTRA_DESCRIPTIONS.SunnyFYP,
    link: "https://github.com/SunSondhi/SunnyFYP",
    live: null,
  },
  {
    title: "The Gilded Bottle",
    year: "2023",
    tag: "JavaScript",
    description: "Team e-commerce site for beverages, with memberships, admin tools, and a Java stock inventory app.",
    link: "https://github.com/SunSondhi/TheGildedBottle",
    live: null,
  },
  {
    title: "Drone SP500",
    year: "2024",
    tag: "Python",
    description: EXTRA_DESCRIPTIONS.DroneSP500,
    link: "https://github.com/Son930/DroneSP500",
    live: null,
  },
  {
    title: "Booking",
    year: "2020",
    tag: "Python",
    description: "A booking system in Python.",
    link: "https://github.com/Son930/Booking",
    live: null,
  },
];

function prettyName(name) {
  if (DISPLAY_TITLES[name]) return DISPLAY_TITLES[name];
  return name
    .replace(/^-+|-+$/g, "")
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function mapRepo(repo) {
  const description = (
    EXTRA_DESCRIPTIONS[repo.name] ||
    repo.description ||
    ""
  )
    .replace(/\s+/g, " ")
    .trim();
  return {
    title: prettyName(repo.name),
    year: String(new Date(repo.created_at).getFullYear()),
    tag: repo.language || "GitHub",
    description: description || "Open source project on GitHub.",
    link: repo.html_url,
    live: repo.homepage && !repo.homepage.includes("github.com") ? repo.homepage : null,
    updated: repo.pushed_at || repo.updated_at,
  };
}

async function fetchGithubProjects() {
  const lists = await Promise.all(
    GITHUB_USERS.map((user) =>
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`).then((res) => {
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        return res.json();
      })
    )
  );

  const seen = new Set();
  const projects = lists
    .flat()
    .filter((repo) => !repo.fork && !repo.archived && repo.size > 0 && !SKIP_REPOS.has(repo.name))
    .filter((repo) => {
      if (seen.has(repo.name.toLowerCase())) return false;
      seen.add(repo.name.toLowerCase());
      return true;
    })
    .map(mapRepo)
    .sort((a, b) => new Date(b.updated) - new Date(a.updated));

  return projects;
}

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const sectionRef = useSectionReveal();

  useEffect(() => {
    let cancelled = false;
    fetchGithubProjects()
      .then((next) => {
        if (!cancelled && next.length) setProjects(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-16 section-surface">
      <div className="max-w-4xl mx-auto">
        <header data-section-reveal className="mb-10 md:mb-14">
          <p className="classic-eyebrow">Work</p>
          <h2 className="classic-title text-3xl md:text-4xl lg:text-5xl tracking-tight">Projects</h2>
        </header>

        <ul className="border-t border-[var(--border-classic)]">
          {projects.map((project, index) => (
            <li key={project.link} className="relative">
              <div className="project-row-link flex items-start gap-4 py-5 md:py-6 border-b border-[var(--border-classic)]">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-cormorant text-[var(--ink)] text-xl md:text-2xl hover:text-[var(--accent)]"
                    >
                      <span className="text-[var(--ink-faint)] tabular-nums text-base md:text-lg mr-3">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {project.title}
                    </a>
                    <span className="font-cormorant text-[var(--ink-muted)] text-sm tabular-nums">
                      {project.year} · {project.tag}
                    </span>
                  </div>
                  <p className="classic-body text-sm md:text-base mt-1.5 sm:pl-10 max-w-xl">
                    {project.description}
                  </p>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block sm:pl-10 mt-2 font-cormorant text-sm text-[var(--accent)] hover:underline"
                    >
                      Live site
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
