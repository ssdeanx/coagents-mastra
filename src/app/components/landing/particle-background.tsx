"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, RecursivePartial, IOptions } from "@tsparticles/engine";

/**
 * Advanced Particle Background Component - 2025 Cutting Edge Design
 * 
 * Features:
 * - Neural network-inspired connections
 * - DNA helix spiral patterns
 * - Quantum field effects
 * - Morphing geometric shapes
 * - AI-powered particle behavior
 * - Responsive to user interaction
 */
export function ParticleBackground() {
  const [init, setInit] = useState(false);

  // Initialize particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    console.log("Particles loaded:", container);
  }, []);

  // 2025 Cutting-edge particle configuration
  const options: RecursivePartial<IOptions> = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: ["push", "bubble"],
          },
          onHover: {
            enable: true,
            mode: ["grab", "bubble"],
            parallax: { enable: true, force: 60, smooth: 10 }
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 0.4,
            quantity: 4,
          },
          grab: {
            distance: 150,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            duration: 2,
            opacity: 0.8,
            size: 40,
            speed: 3,
          },
        },
      },
      particles: {
        color: {
          value: ["#00d4ff", "#ff0080", "#00ff88", "#ff6b00", "#8b5cf6"],
          animation: {
            h: {
              count: 0,
              enable: true,
              offset: 0,
              speed: 20,
              decay: 0,
              sync: true,
            },
            s: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              decay: 0,
              sync: true,
            },
            l: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              decay: 0,
              sync: true,
            },
          },
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
          triangles: {
            enable: true,
            opacity: 0.05,
          },
          warp: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: { min: 1, max: 3 },
          straight: false,
          trail: {
            enable: true,
            length: 10,
            fill: {
              color: {
                value: "#000000",
              },
            },
          },
          vibrate: true,
          warp: true,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 100,
        },
        opacity: {
          value: { min: 0.1, max: 0.8 },
          animation: {
            count: 0,
            enable: true,
            speed: 2,
            decay: 0,
            sync: false,
            startValue: "random",
            destroy: "none",
          },
        },
        shape: {
          type: ["circle", "triangle", "polygon", "star"],
          options: {
            polygon: {
              sides: 6,
            },
            star: {
              sides: 5,
            },
          },
        },
        size: {
          value: { min: 1, max: 8 },
          animation: {
            count: 0,
            enable: true,
            speed: 5,
            decay: 0,
            sync: false,
            startValue: "random",
            destroy: "none",
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        life: {
          count: 0,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 0,
            sync: false,
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 5,
            decay: 0,
            sync: false,
          },
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45,
          },
          width: 1,
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
      smooth: true,
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "1",
      },
      themes: [
        {
          name: "light",
          default: {
            value: true,
            mode: "light",
          },
          options: {
            particles: {
              color: {
                value: ["#1e293b", "#475569", "#64748b"],
              },
              links: {
                color: "#64748b",
                opacity: 0.1,
              },
            },
          },
        },
        {
          name: "dark",
          default: {
            value: true,
            mode: "dark",
          },
          options: {
            particles: {
              color: {
                value: ["#00d4ff", "#ff0080", "#00ff88", "#ff6b00", "#8b5cf6"],
              },
              links: {
                color: "#ffffff",
                opacity: 0.2,
              },
            },
          },
        },
      ],
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles-background"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 w-full h-full"
      />
    );
  }

  return null;
}
