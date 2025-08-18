import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Simple Earth Hologram for desktop only
function EarthHologram() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        map={new THREE.TextureLoader().load("/earth_texture.jpg")}
        transparent
        opacity={0.7}
        emissive="#004477"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function About() {
  const sectionRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const techStack = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "Firebase",
    "Next.js",
    "Tailwind CSS",
    "Express",
    "PostgreSQL",
    "PyTorch",
    "VS Code",
    "GitHub",
  ];

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );
    }

    // Line animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-black text-white py-12 sm:py-20 overflow-hidden"
    >
      {/* Background Canvas - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Canvas
            camera={{ position: [0, 0, 1], fov: 75 }}
            style={{ background: "transparent" }}
          >
            <EarthHologram />
            <ambientLight intensity={0.3} />
            <directionalLight position={[0, 30, 5]} intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
          </Canvas>
        </div>
      )}

      {/* Mobile background */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-black/40"></div>
      )}

      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,170,0,0.3) 1px, transparent 0)`,
            backgroundSize: isMobile ? "20px 20px" : "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-7xl font-bold mb-4 sm:mb-6"
            style={{
              background: "linear-gradient(135deg, #ffaa00, #87ceeb, #ff6b35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Me
          </h2>
          <div
            ref={lineRef}
            className="w-20 sm:w-32 h-1 bg-gradient-to-r from-[#ffaa00] to-[#87ceeb] mx-auto mb-4 sm:mb-6 origin-left"
          ></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Final-year Computer Science student passionate about crafting
            digital experiences
          </p>
        </div>

        {/* Content */}
        {isMobile ? (
          // Mobile Simple Layout
          <div className="space-y-8">
            {/* About Card */}
            <div className="bg-gradient-to-br from-[#ffaa00]/10 via-transparent to-[#87ceeb]/10 backdrop-blur-sm border border-[#ffaa00]/20 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Hi! I'm a CS student who codes with purpose.
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm in my final year of{" "}
                <span className="text-[#ffaa00] font-medium">
                  B.Tech Computer Science
                </span>
                , preparing for campus placements while diving deep into web
                development and AI.
              </p>
              <p className="text-gray-400 text-sm">
                Based in Vijayawada • Looking for opportunities to grow
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 backdrop-blur-sm border border-[#87ceeb]/25 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#87ceeb] mb-1">
                  2024
                </div>
                <div className="text-sm text-gray-400">Final Year</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-[#ffaa00]/25 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#ffaa00] mb-1">
                  50+
                </div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Tech Stack
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {techStack.slice(0, 9).map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/60 rounded-lg p-2 text-center"
                  >
                    <span className="text-xs text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Ready to connect?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-[#ffaa00] to-[#ff8800] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ffaa00]/30 transition-all duration-300">
                  Get In Touch
                </button>
                <button className="px-6 py-3 border border-[#87ceeb] text-[#87ceeb] font-semibold rounded-lg hover:bg-[#87ceeb]/10 transition-all duration-300">
                  View My Work
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop Complex Layout (keeping original)
          <div className="space-y-16">
            {/* Your existing desktop content here - I'll keep it simple for now */}
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-7">
                <div className="bg-gradient-to-br from-[#ffaa00]/10 via-transparent to-[#87ceeb]/10 backdrop-blur-sm border border-[#ffaa00]/20 rounded-2xl p-8">
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    Hey there! I'm a CS student who codes with purpose.
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    I'm in my final year of{" "}
                    <span className="text-[#ffaa00] font-medium">
                      B.Tech Computer Science
                    </span>
                    , preparing for campus placements while diving deep into web
                    development and AI.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Based in Vijayawada • Looking for opportunities to grow and
                    contribute
                  </p>
                </div>
              </div>
              <div className="col-span-5">
                <div className="bg-gradient-to-tl from-[#87ceeb]/15 to-transparent backdrop-blur-sm border border-[#87ceeb]/25 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#87ceeb] mb-2">
                      2024
                    </div>
                    <div className="text-lg text-white font-semibold mb-3">
                      Final Year
                    </div>
                    <div className="text-sm text-gray-300">
                      Campus Placements Ready
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack for Desktop */}
            <div className="grid grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center hover:border-[#ffaa00]/30 transition-colors"
                >
                  <span className="text-gray-300">{tech}</span>
                </div>
              ))}
            </div>

            {/* CTA for Desktop */}
            <div className="text-center py-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to build something together?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                I'm actively looking for opportunities where I can contribute,
                learn, and grow.
              </p>
              <div className="flex justify-center gap-6">
                <button className="px-8 py-3 bg-gradient-to-r from-[#ffaa00] to-[#ff8800] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ffaa00]/30 transition-all duration-300 hover:scale-105">
                  Get In Touch
                </button>
                <button className="px-8 py-3 border border-[#87ceeb] text-[#87ceeb] font-semibold rounded-lg hover:bg-[#87ceeb]/10 transition-all duration-300 hover:scale-105">
                  View My Work
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default About;
