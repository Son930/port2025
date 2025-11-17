import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const skillsData = [
  {
    title: "Frontend Development",
    skills: ["React", "JavaScript", "HTML5", "CSS", "Tailwind CSS", "Next.js"],
    icon: "🎨",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Backend & DevOps",
    skills: ["Node.js", "Express", "REST APIs", "Docker", "PHP"],
    icon: "⚙️",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Design & Tools",
    skills: [
      "Figma",
      "Git",
      "Jest",
      "Agile Methodologies",
      "Postman",
      "VSCode",
      "Visual Studio",
      "Unity",
      "Unreal Engine",
      "Trello",
    ],
    icon: "🛠️",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Operating Systems & Tools",
    skills: ["Linux", "Windows", "WSL", "ROS & ROS2"],
    icon: "💻",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "C#", "C++", "PHP", "JavaScript", "HTML", "CSS"],
    icon: "👨‍💻",
    color: "from-yellow-500 to-orange-500"
  },
];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="relative z-1 min-h-screen py-16 px-6 text-white bg-gradient-to-br from-darkBg via-black to-darkBg">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#00ffff_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-plutur font-bold mb-12 text-center text-gradient"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((category, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 hover:border-neonBlue/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neonBlue/20 p-8 min-h-[280px] flex flex-col text-white relative overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="relative z-10 font-plutur text-xl text-white font-semibold mb-6 flex items-center gap-3">
                {category.title}
              </h3>

              {/* Skills List */}
              <ul className="relative z-10 space-y-3 flex-1">
                {category.skills.map((skill, idx) => (
                  <motion.li
                    key={idx}
                    variants={skillVariants}
                    className="flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-200 group-hover:translate-x-2 transition-transform duration-300"
                  >
                    <span className="w-2 h-2 bg-neonBlue rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                    {skill}
                  </motion.li>
                ))}
              </ul>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-neonBlue via-neonPurple to-neonPink opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-plutur font-bold text-white mb-8">
            Always <span className="text-gradient">Learning</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["Machine Learning", "Blockchain", "Cloud Native", "AI/ML"].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:border-neonBlue/30 transition-all duration-300 hover:scale-105"
              >
                <p className="text-white font-medium text-sm">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Looking for someone with these skills?
          </p>
          <button className="btn-classic bg-gradient-to-r from-neonBlue to-neonPurple hover:from-neonPurple hover:to-neonBlue text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-neon-blue hover:shadow-neon-purple">
            Let's Work Together
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
