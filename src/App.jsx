import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpaceStationModel } from "./SpaceStationModel";
import { SunModel } from "./SunModel";
import { AstronautModel } from "./AstronautModel";
import About from "./About";
import Projects from "../Projects";

gsap.registerPlugin(ScrollTrigger);

// Starfield component
function StarField() {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(5000 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 50;
    return arr;
  });

  useFrame((state, delta) => {
    ref.current.rotation.y -= delta * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#87ceeb"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// Camera animation wrapper
function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    // Initial zoom out
    gsap.fromTo(
      camera.position,
      { z: 10 },
      {
        z: 50,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          // Zoom back in
          gsap.to(camera.position, {
            z: 5,
            duration: 2,
            ease: "power2.inOut",
          });
        },
      }
    );
  }, [camera]);

  return null;
}

// Typing effect hook
function useTypingEffect(text, speed = 100, delay = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay]);

  return { displayText, isComplete };
}

// Hero text + enhanced effects
function Hero() {
  const nameRef = useRef();
  const subtitleRef = useRef();
  const iconsRef = useRef();
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(false);

  const subtitles = [
    "Full Stack Developer",
    "Machine Learning Engineer",
    "Creative Problem Solver",
  ];

  const { displayText: typedSubtitle, isComplete } = useTypingEffect(
    subtitles[currentSubtitle],
    80,
    showSubtitles ? 0 : 99999
  );

  useEffect(() => {
    // Enhanced name animation with glitch effect
    const tl = gsap.timeline();

    tl.fromTo(
      nameRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotationX: 90,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 2,
        delay: 3,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Glitch effect
          gsap.to(nameRef.current, {
            x: 2,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: "power2.inOut",
          });

          // Show subtitles after name animation
          setTimeout(() => setShowSubtitles(true), 500);
        },
      }
    );

    // Animate icons with stagger and bounce
    gsap.fromTo(
      iconsRef.current.children,
      {
        opacity: 0,
        y: 50,
        scale: 0,
        rotation: 180,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.3,
        delay: 5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: iconsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // Cycle through subtitles
  useEffect(() => {
    if (!showSubtitles) return;

    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [showSubtitles, subtitles.length]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white pointer-events-none">
      {/* Subtle background overlay for better integration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 170, 0, 0.03) 0%, transparent 70%)",
          zIndex: -1,
        }}
      />

      {/* Enhanced name with gradient and glow */}
      <div className="text-center mb-8">
        <h1
          ref={nameRef}
          className="text-4xl md:text-6xl lg:text-8xl font-black tracking-widest mb-4 relative"
          style={{
            background:
              "linear-gradient(45deg, #ffaa00, #ff6b35, #ffffff, #87ceeb)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 4s ease-in-out infinite",
            textShadow:
              "0 0 40px rgba(255, 170, 0, 0.6), 0 0 80px rgba(255, 107, 53, 0.3)",
            fontFamily: '"Orbitron", "Arial Black", sans-serif',
            filter: "drop-shadow(0 0 20px rgba(255, 170, 0, 0.5))",
          }}
        >
          ABHISHEK CHUKKA
        </h1>

        {/* Glowing underline */}
        <div
          className="h-1 mx-auto mt-4 rounded-full"
          style={{
            width: "60%",
            background:
              "linear-gradient(90deg, transparent, #ffaa00, #ff6b35, #ffaa00, transparent)",
            boxShadow: "0 0 25px #ffaa00, 0 0 50px rgba(255, 170, 0, 0.4)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Enhanced subtitle with typing effect */}
      <div
        ref={subtitleRef}
        className="text-xl md:text-2xl lg:text-3xl font-mono h-16 flex items-center justify-center"
        style={{
          minHeight: "4rem",
          color: "#87ceeb",
          textShadow:
            "0 0 15px rgba(135, 206, 235, 0.8), 0 0 30px rgba(255, 170, 0, 0.3)",
        }}
      >
        {showSubtitles && (
          <div className="flex items-center">
            <span className="mr-2" style={{ color: "#ffaa00" }}>
              {">"}
            </span>
            <span className="tracking-wider">{typedSubtitle}</span>
            <span
              className={`inline-block w-0.5 h-6 ml-2 ${
                !isComplete ? "animate-pulse" : "animate-pulse"
              }`}
              style={{ backgroundColor: "#ffaa00" }}
            />
          </div>
        )}
      </div>

      {/* Enhanced navigation buttons - Mobile optimized */}
      <div
        ref={iconsRef}
        className="flex gap-3 sm:gap-6 mt-8 sm:mt-12 pointer-events-auto"
      >
        {["Portfolio", "About", "Contact"].map((item) => (
          <button
            key={item}
            className="group relative px-4 py-2 sm:px-8 sm:py-3 border-2 font-mono text-xs sm:text-sm tracking-wide sm:tracking-widest overflow-hidden transition-all duration-300 hover:scale-110"
            style={{
              borderColor: "#ffaa00",
              color: "#87ceeb",
              backdropFilter: "blur(15px)",
              background:
                "linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(135, 206, 235, 0.05))",
              boxShadow:
                "0 0 25px rgba(255, 170, 0, 0.3), 0 0 50px rgba(135, 206, 235, 0.1)",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                boxShadow:
                  "0 0 40px rgba(255, 170, 0, 0.6), 0 0 80px rgba(135, 206, 235, 0.3)",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                boxShadow:
                  "0 0 25px rgba(255, 170, 0, 0.3), 0 0 50px rgba(135, 206, 235, 0.1)",
                duration: 0.3,
              });
            }}
          >
            {/* Animated background */}
            <div
              className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 170, 0, 0.2), rgba(255, 107, 53, 0.2))",
              }}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              {item}
            </span>

            {/* Corner decorations with space theme */}
            <div
              className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2"
              style={{ borderColor: "#ffaa00" }}
            />
            <div
              className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2"
              style={{ borderColor: "#ffaa00" }}
            />
            <div
              className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2"
              style={{ borderColor: "#ffaa00" }}
            />
            <div
              className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2"
              style={{ borderColor: "#ffaa00" }}
            />
          </button>
        ))}
      </div>

      {/* Enhanced scroll indicator - Now a functional button */}
      <button
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce pointer-events-auto hover:scale-110 transition-transform duration-300"
        style={{ color: "#87ceeb" }}
      >
        <span className="text-xs font-mono tracking-widest opacity-70">
          SCROLL DOWN
        </span>
        <div
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 rounded-full flex justify-center relative overflow-hidden"
          style={{ borderColor: "#ffaa00" }}
        >
          <div
            className="w-1 h-2 sm:h-3 rounded-full mt-1 sm:mt-2"
            style={{
              backgroundColor: "#ffaa00",
              animation: "scrollIndicator 2s ease-in-out infinite",
              boxShadow: "0 0 10px #ffaa00",
            }}
          />
        </div>
        <div className="flex space-x-1">
          <div
            className="w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: "#ffaa00",
              animationDelay: "0s",
              boxShadow: "0 0 5px #ffaa00",
            }}
          />
          <div
            className="w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: "#ffaa00",
              animationDelay: "0.2s",
              boxShadow: "0 0 5px #ffaa00",
            }}
          />
          <div
            className="w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: "#ffaa00",
              animationDelay: "0.4s",
              boxShadow: "0 0 5px #ffaa00",
            }}
          />
        </div>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes scrollIndicator {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.3;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="w-full h-screen relative bg-black">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          shadows
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <StarField />
            <CameraRig />
            {/* Add the Space Station model */}
            <SpaceStationModel
              position={[2, 0, -5]}
              scale={[0.5, 0.5, 0.5]}
              autoRotate={true}
              rotationSpeed={0.1}
            />
            {/* Add the Sun model in a fixed position with glowing effects */}
            <SunModel
              position={[-8, 4, -15]}
              scale={[0.3, 0.3, 0.3]}
              autoRotate={true}
              rotationSpeed={0.05}
              glowIntensity={4}
              glowColor="#ffaa00"
              targetPosition={[2, 0, -5]}
            />
            {/* Add the Astronaut floating beside the name */}
            <AstronautModel
              position={[0, 0, 2]}
              scale={[0.5, 0.5, 0.5]}
              floatIntensity={0.3}
              floatSpeed={0.8}
              autoRotate={true}
              rotationSpeed={0.02}
            />
            {/* Reduced ambient lighting to make sun's effect more dramatic */}
            <ambientLight intensity={0.15} />
            {/* Reduced other lights to let sun dominate */}
            <pointLight
              position={[-10, -10, -5]}
              intensity={0.2}
              color="#00ff88"
            />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        <Hero />
        <div className=" bg-black"></div>
        <About />
        <Projects />
      </div>
    </>
  );
}
