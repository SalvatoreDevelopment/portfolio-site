"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import ParticlesBackground from "@/components/ParticlesBackground";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider } from "@/components/ThemeProvider";


export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-10 bg-gray-900 text-white relative overflow-hidden">
      {/* Effetto particelle animate */}
      <ParticlesBackground />

      {/* Sinistra - Titolo con effetto scrittura */}
      <motion.div
        className="w-full flex flex-col items-center text-center p-6 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-15xl font-bold text-blue-400 drop-shadow-lg">
          Salvatore Guerra
        </h1>
        <p className="text-xl mt-4 drop-shadow-md">
          <span className="text-white">Sono un </span>
          <span className="text-green-400">
            <Typewriter
              words={["AI & Design Developer", "Front-End Enthusiast", "Tech Innovator"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </p>
      </motion.div>
     
      <ThemeProvider>
        <Chatbot/>
      </ThemeProvider>
    </section>
  );
}
