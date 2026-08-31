import { useSectionReveal } from "../hooks/useSectionReveal";

const skillsData = [
  { title: "Frontend", skills: ["React", "JavaScript", "HTML5", "CSS", "Tailwind CSS", "Next.js"] },
  { title: "Backend", skills: ["Node.js", "Express", "REST APIs", "Docker", "PHP", "Laravel"] },
  { title: "Languages", skills: ["Python", "Java", "C#", "C++", "PHP", "JavaScript"] },
  { title: "Tools", skills: ["Figma", "Git", "Unity", "Unreal Engine", "Jest", "Postman"] },
  { title: "Systems", skills: ["Linux", "Windows", "WSL", "ROS", "ROS2"] },
];

export default function Skills() {
  const sectionRef = useSectionReveal();

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-16 section-surface">
      <div className="max-w-4xl mx-auto">
        <header data-section-reveal className="mb-10 md:mb-14">
          <p className="classic-eyebrow">Skills</p>
          <h2 className="classic-title text-3xl md:text-4xl lg:text-5xl">What I work with</h2>
        </header>

        <div data-section-reveal className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
          {skillsData.map((category) => (
            <div key={category.title}>
              <h3 className="font-cormorant text-lg text-[var(--ink)] mb-2">
                {category.title}
              </h3>
              <p className="classic-body text-base leading-relaxed">
                {category.skills.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
