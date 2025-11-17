/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import Img1 from "../assets/8.jpg";
import Img2 from "../assets/2.jpg";
import Img3 from "../assets/3.jpg";
import Img4 from "../assets/4.jpg";
import Img5 from "../assets/7.jpg";

// Project data
const projectData = [
  {
    title: "AI-Powered Analytics Platform",
    img: Img1,
    description: "Machine learning solution for business intelligence and predictive analytics",
    technologies: ["Python", "TensorFlow", "React", "Node.js"],
    status: "Completed",
    link: "#"
  },
  {
    title: "Cross-Platform Mobile App",
    img: Img2,
    description: "React Native application with real-time synchronization and offline support",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    status: "In Progress",
    link: "#"
  },
  {
    title: "Cloud Infrastructure Solution",
    img: Img3,
    description: "Scalable microservices architecture deployed on AWS with CI/CD pipeline",
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
    status: "Completed",
    link: "#"
  },
  {
    title: "Game Development Framework",
    img: Img4,
    description: "Unity-based game engine with custom physics and AI systems",
    technologies: ["Unity", "C#", "OpenGL", "Python"],
    status: "In Progress",
    link: "#"
  },
  {
    title: "IoT Smart Home System",
    img: Img5,
    description: "Connected home automation with mobile app control and voice commands",
    technologies: ["Arduino", "Raspberry Pi", "MQTT", "Flutter"],
    status: "Planning",
    link: "#"
  },
];

// Project card list component
function ProjectCards({ onHover }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 py-8">
      {projectData.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card
            isPressable
            className="group relative h-80 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 hover:border-neonBlue/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-neon-blue"
            onMouseEnter={() => onHover(project.img)}
            onMouseLeave={() => onHover("")}
          >
            <CardBody className="flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 font-plutur">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-300 font-light mb-4 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 text-white text-xs rounded-md border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-md border border-white/20">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <button className="w-full py-2 px-4 bg-gradient-to-r from-neonBlue to-neonPurple hover:from-neonPurple hover:to-neonBlue text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  View Project
                </button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

ProjectCards.propTypes = {
  onHover: PropTypes.func.isRequired,
};

// Main Projects section
export default function Projects() {
  const [bgImage, setBgImage] = useState(Img1);

  return (
    <section className="relative w-full overflow-hidden lg:min-h-screen">
      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out hidden lg:block"
        style={{
          backgroundImage: `url(${bgImage})`,
          maskImage: "linear-gradient(to left, black 20%, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 20%, transparent 75%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* Mobile Overlay */}
      <div className="lg:hidden absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full py-12 sm:py-16 lg:py-0 flex flex-col justify-center mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 lg:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-plutur font-bold leading-tight mb-6">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my technical expertise and creative problem-solving across various domains
          </p>
        </motion.header>

        <ProjectCards onHover={setBgImage} />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Interested in collaborating on a project?
          </p>
          <button className="btn-classic bg-gradient-to-r from-neonBlue to-neonPurple hover:from-neonPurple hover:to-neonBlue text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-neon-blue hover:shadow-neon-purple">
            Let's Build Something Together
          </button>
        </motion.div>
      </div>
    </section>
  );
}
