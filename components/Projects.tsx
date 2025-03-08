"use client";
import { motion } from "framer-motion";
import Image from "next/image";




const projects = [
  {
    title: "AI Chatbot",
    description: "Un chatbot basato su AI che può rispondere e personalizzare lo stile del sito.",
    image: "/images/ai-chatbot.webp",
    link: "#",
  },
  {
    title: "Portfolio Design",
    description: "Un design UI futuristico per un portfolio interattivo.",
    image: "/images/portfolio-design.webp",
    link: "#",
  },
  {
    title: "Deep Learning Project",
    description: "Un modello di deep learning per l'elaborazione delle immagini.",
    image: "/images/deep-learning.webp",
    link: "#",
  },
  {
    title: "Deep Learning Project",
    description: "Un modello di deep learning per l'elaborazione delle immagini.",
    image: "/images/deep-learning.webp",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section className="py-20 px-6 text-white bg-gradient-to-b from-gray-900 to-gray-800" id="projects">
      <h2 className="text-4xl font-bold text-center mb-10">🚀 I miei Progetti</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Overlay trasparente con effetto hover */}
            <div className="absolute inset-0"></div>

            {/* Immagine del progetto */}
            <Image 
              src={project.image} 
              alt={project.title} 
              width={400} 
              height={300} 
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            {/* Testo */}
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-400 mt-2">{project.description}</p>

            {/* Pulsante interattivo */}
            <a
              href={project.link}
              className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Scopri di più →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

