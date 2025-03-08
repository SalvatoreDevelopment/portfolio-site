"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent",
        },
        fullScreen: {
          enable: true,
        },
        particles: {
          number: {
            value: 150, // Aumentiamo il numero di particelle
            density: {
              enable: true,
              value_area: 2000,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.7,
            anim: {
              enable: true,
              speed: 0.1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 3,
              size_min: 0.5,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 2
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: false,
            straight: true,
            out_mode: "out",
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Effetto quando passi sopra col mouse
            },
            onClick: {
              enable: true,
              mode: "repulse", // Aggiunge più particelle quando clicchi
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              line_linked: {
                opacity: 1,
              },
            },
            repulse: {
              distance: 300,
              duration: 12,
            },
            push: {
              particles_nb: 4,
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
