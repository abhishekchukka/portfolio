import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";

const projects = [
  {
    id: 1,
    title: "Blog Application",
    summary: "📖 A futuristic storytelling hub where words meet design.",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    description:
      "A full-stack blogging platform with a sleek UI that allows users to create, edit, and manage blog posts. Integrated Firebase authentication ensures secure login while CRUD functionality provides smooth content management. Designed to be scalable for personal blogging or community-driven platforms.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/blog-app",
    color: "#ffaa00",
    icon: "📖",
  },
  {
    id: 2,
    title: "YouTube Clone",
    summary: "▶️ A next-gen video streaming clone that mimics YouTube's DNA.",
    techStack: ["React", "RapidAPI", "Material UI", "React Router"],
    description:
      "A modern clone of YouTube leveraging RapidAPI for video data. The platform supports authentication, video browsing, and search, offering a seamless streaming experience with React Router for navigation and Material UI for a polished interface.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/youtube-clone",
    color: "#ff4444",
    icon: "▶️",
  },
  {
    id: 3,
    title: "Fitness Generator",
    summary: "💪 Your AI-powered fitness coach in your pocket.",
    techStack: ["React", "Express.js", "Gemini API"],
    description:
      "An AI-powered fitness and meal recommendation system that generates tailored workout plans and recipes based on user details. The backend API integrates with Gemini to deliver smart, personalized health insights.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/fitness-gen",
    color: "#00ff88",
    icon: "💪",
  },
  {
    id: 4,
    title: "Watch Movie Platform",
    summary: "🎬 A pocket cinema with your personal movie vault.",
    techStack: ["React", "Local Storage"],
    description:
      "A movie discovery app that lets users search for films, save favorites, and rate them locally. Focused on simplicity and exploring React concepts, it marked the beginning of your React journey.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/movie-app",
    color: "#9d4edd",
    icon: "🎬",
  },
  {
    id: 5,
    title: "Campus Connect",
    summary: "🎭 The ultimate survival kit for every college student.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Firebase Auth"],
    description:
      "A futuristic campus platform designed to solve real student struggles. From forming study groups and finding help with assignments to earning money through micro-tasks, Campus Connect makes college life easier. To ensure authenticity, groups cost ₹2 to create, keeping spam away. Soon to evolve into a mini-LinkedIn for showcasing student skills.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/campus-connect",
    color: "#87ceeb",
    icon: "🎭",
  },
  {
    id: 6,
    title: "E-Commerce Platform",
    summary:
      "🛍️ A futuristic digital marketplace with dual power – Admin + Customer.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase Auth",
      "Stripe API",
    ],
    description:
      "A full-fledged e-commerce application built with separate Admin and Customer dashboards. Admins manage products, inventory, and orders, while customers can browse, add to cart, and make purchases securely. The backend is designed to handle scalable transactions and order flows.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/ecommerce-platform",
    color: "#06d6a0",
    icon: "🛍️",
  },
  {
    id: 7,
    title: "Itinerary Generator",
    summary: "🌍 Your AI-powered travel planner that never sleeps.",
    techStack: ["Streamlit", "Gemini Flash API", "Python"],
    description:
      "A smart travel itinerary generator built with Streamlit and Gemini Flash API. It tailors trip schedules based on user preferences, location, and time, providing an AI-powered, instant travel companion.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/itinerary-generator",
    color: "#ff6b35",
    icon: "🌍",
  },
  {
    id: 8,
    title: "AI News Classifier",
    summary: "📰 An AI journalist that reads, understands, and sorts the news.",
    techStack: ["Python", "BeautifulSoup", "Word2Vec", "ANN", "Scikit-learn"],
    description:
      "A news classification engine using Word2Vec embeddings and a simple ANN model to classify articles. Combined with a web crawler built in BeautifulSoup, it automatically scrapes fresh articles and classifies them in real time.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/ai-news-classifier",
    color: "#4ecdc4",
    icon: "📰",
  },
  {
    id: 9,
    title: "Hotel Complaint Classification",
    summary: "🏨 Turning hotel rants into structured insights with AI.",
    techStack: ["PyTorch", "Python", "NLP", "Scikit-learn"],
    description:
      "A machine learning pipeline for classifying hotel complaints into categories using NLP and PyTorch. It automates complaint management for hospitality businesses, improving customer experience by quickly identifying the root cause.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/hotel-complaint-nlp",
    color: "#f7931e",
    icon: "🏨",
  },
  {
    id: 10,
    title: "Little Soldiers Family Daycare",
    summary: "👶 A safe digital home for kids' first learning journey.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    description:
      "A professional client project built with Next.js to showcase a daycare center's services. The site highlights facilities, enrollment processes, and testimonials, providing parents with an intuitive digital experience while maintaining brand trust.",
    image: "/api/placeholder/400/250",
    link: "https://github.com/yourusername/daycare-website",
    color: "#ff69b4",
    icon: "👶",
  },
];

// Enhanced Futuristic ProjectCard Component
function ProjectCard({ project, isVisible }) {
  const cardRef = useRef();
  const glitchRef = useRef();

  useEffect(() => {
    if (isVisible && cardRef.current) {
      // Enhanced entry animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: 100,
          rotationY: 45,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Glitch effect animation
      if (glitchRef.current) {
        gsap.to(glitchRef.current, {
          x: "random(-2, 2)",
          y: "random(-1, 1)",
          duration: 0.1,
          repeat: -1,
          yoyo: true,
        });
      }
    }
  }, [isVisible]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div ref={cardRef} className="w-full h-full overflow-y-auto">
          {/* Main Futuristic Card */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 backdrop-blur-2xl border border-gray-600/30 rounded-2xl overflow-hidden shadow-2xl">
            {/* Animated Border Effect */}
            <div className="absolute inset-0 rounded-2xl">
              <div
                className="absolute inset-0 rounded-2xl animate-pulse"
                style={{
                  background: `linear-gradient(45deg, transparent, ${project.color}40, transparent)`,
                  filter: "blur(1px)",
                }}
              />
            </div>

            {/* Top Status Bar */}
            <div className="relative flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  SYSTEM://PROJECTS/ACTIVE
                </div>
              </div>
              <div
                className="text-xs font-mono px-2 py-1 rounded"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                  border: `1px solid ${project.color}40`,
                }}
              >
                {project.id.toString().padStart(2, "0")}
              </div>
            </div>

            {/* Main Content */}
            <div className="relative p-6 space-y-6">
              {/* Project Title with Icon */}
              <div className="flex items-start gap-4">
                <div
                  className="text-4xl p-3 rounded-xl border"
                  style={{
                    backgroundColor: `${project.color}10`,
                    borderColor: `${project.color}30`,
                  }}
                >
                  {project.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400 font-mono mb-1">
                    PROJECT_NAME:
                  </div>
                  <h3
                    ref={glitchRef}
                    className="text-2xl font-bold text-white mb-2 font-mono"
                  >
                    {project.title.toUpperCase()}
                  </h3>
                  <div className="text-sm text-gray-300">{project.summary}</div>
                </div>
              </div>

              {/* Holographic Divider */}
              <div className="relative">
                <div
                  className="h-px bg-gradient-to-r from-transparent via-current to-transparent"
                  style={{ color: project.color }}
                />
                <div
                  className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-current to-transparent animate-pulse"
                  style={{ color: project.color }}
                />
              </div>

              {/* Tech Stack Grid */}
              <div>
                <div className="text-xs text-gray-400 font-mono mb-3">
                  TECHNOLOGIES:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {project.techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-sm transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: `${project.color}08`,
                        borderColor: `${project.color}30`,
                        color: project.color,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: project.color }}
                      />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Terminal */}
              <div>
                <div className="text-xs text-gray-400 font-mono mb-2">
                  DESCRIPTION:
                </div>
                <div className="bg-black/50 border border-gray-700/50 rounded-lg p-4 font-mono text-sm text-gray-300 leading-relaxed">
                  <div className="text-green-400 text-xs mb-2">
                    $ cat project_details.txt
                  </div>
                  {project.description}
                </div>
              </div>

              {/* Preview Window */}
              <div>
                <div className="text-xs text-gray-400 font-mono mb-2">
                  PREVIEW:
                </div>
                <div
                  className="relative w-full h-24 rounded-lg border overflow-hidden"
                  style={{
                    backgroundColor: `${project.color}05`,
                    borderColor: `${project.color}30`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-3xl opacity-60 animate-pulse"
                      style={{ color: project.color }}
                    >
                      {project.icon}
                    </div>
                  </div>
                  {/* Scanning Lines Effect */}
                  <div className="absolute inset-0">
                    <div
                      className="w-full h-px bg-current animate-pulse"
                      style={{
                        color: project.color,
                        animation: "scan 2s linear infinite",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 py-3 px-4 rounded-lg font-mono text-sm font-bold border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: project.color,
                    color: project.color,
                  }}
                  onClick={() => window.open(project.link, "_blank")}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = `${project.color}20`;
                    e.target.style.boxShadow = `0 0 20px ${project.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <div className="relative z-10">INIT_PROJECT.EXE</div>
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                    style={{ backgroundColor: `${project.color}10` }}
                  />
                </button>

                <button className="px-4 py-3 rounded-lg font-mono text-sm font-bold border border-gray-500 text-gray-300 hover:border-gray-300 hover:text-white hover:bg-gray-800/30 transition-all duration-300">
                  DEMO
                </button>
              </div>
            </div>

            {/* Bottom Status */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent"
              style={{ color: project.color }}
            >
              <div className="h-full bg-current animate-pulse" />
            </div>
          </div>

          {/* CSS for scanning animation */}
          <style jsx>{`
            @keyframes scan {
              0% {
                transform: translateY(-100%);
              }
              100% {
                transform: translateY(2400%);
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

// Simplified Starfield component
function StarField() {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 100; // x
      arr[i + 1] = (Math.random() - 0.5) * 100; // y
      arr[i + 2] = (Math.random() - 0.5) * 100; // z
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// Simple test component to make sure 3D works (no longer needed)

export default function Projects() {
  const titleRef = useRef();
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const displayedProject = projects[carouselIndex];

  return (
    <section
      id="projects"
      className="min-h-screen relative bg-black text-white overflow-hidden"
    >
      {/* Title - Responsive */}
      <div className="absolute top-8 sm:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 z-20 px-4">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-center font-mono"
          style={{
            background: "linear-gradient(135deg, #ffaa00, #87ceeb, #ff6b35)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SOLAR_SYSTEM.PROJECTS
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 text-center max-w-2xl font-mono">
          Navigate through my digital universe
        </p>
      </div>

      {/* Layout Container - Responsive */}
      <div className="flex flex-col lg:flex-row h-screen pt-16 lg:pt-24">
        {/* 3D Canvas - Responsive */}
        <div className="flex-1 relative h-64 sm:h-80 lg:h-full">
          <Canvas
            camera={{ 
              position: [0, 0, window.innerWidth < 768 ? 15 : 10], 
              fov: window.innerWidth < 768 ? 85 : 75 
            }}
            style={{ height: "100%", background: "black" }}
          >
            {/* Very simple lighting */}
            <ambientLight intensity={1} />

            {/* Enhanced starfield with many more stars - Responsive density */}
            <Points
              positions={(() => {
                const starCount = window.innerWidth < 768 ? 500 : 1000;
                const positions = new Float32Array(starCount * 3);
                for (let i = 0; i < positions.length; i += 3) {
                  positions[i] = (Math.random() - 0.5) * 200; // x
                  positions[i + 1] = (Math.random() - 0.5) * 200; // y
                  positions[i + 2] = (Math.random() - 0.5) * 200; // z
                }
                return positions;
              })()}
              stride={3}
              frustumCulled={false}
            >
              <PointMaterial
                transparent
                color="#ffffff"
                size={window.innerWidth < 768 ? 0.4 : 0.3}
                sizeAttenuation={false}
                depthWrite={false}
                opacity={0.8}
              />
            </Points>

            {/* Additional scattered bright stars - Fewer on mobile */}
            {Array.from({ length: window.innerWidth < 768 ? 25 : 50 }, (_, i) => {
              const x = (Math.random() - 0.5) * 150;
              const y = (Math.random() - 0.5) * 150;
              const z = (Math.random() - 0.5) * 150;
              const size = Math.random() * 0.2 + 0.1;
              return (
                <mesh key={`star-${i}`} position={[x, y, z]}>
                  <sphereGeometry args={[size, 6, 6]} />
                  <meshBasicMaterial
                    color="#ffffff"
                    opacity={Math.random() * 0.5 + 0.5}
                    transparent
                  />
                </mesh>
              );
            })}

            {/* Enhanced Central Sun - Responsive size */}
            <group>
              {/* Sun core - Smaller on mobile */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[window.innerWidth < 768 ? 0.8 : 1.2, 32, 32]} />
                <meshBasicMaterial color="#ffaa00" transparent opacity={0.9} />
              </mesh>

              {/* Sun corona layers - Responsive */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[window.innerWidth < 768 ? 1.0 : 1.5, 16, 16]} />
                <meshBasicMaterial
                  color="#ff8800"
                  transparent
                  opacity={0.3}
                  side={THREE.BackSide}
                />
              </mesh>

              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[window.innerWidth < 768 ? 1.2 : 1.8, 16, 16]} />
                <meshBasicMaterial
                  color="#ffcc44"
                  transparent
                  opacity={0.1}
                  side={THREE.BackSide}
                />
              </mesh>
            </group>

            {/* Responsive Solar System Planets */}
            {projects.map((project, i) => {
              const angle = (i / projects.length) * Math.PI * 2;
              // Responsive orbital spacing
              const mobileRadius = 2.5 + (i % 3) * 1.5;
              const desktopRadius = 4 + (i % 3) * 2.5;
              const radius = window.innerWidth < 768 ? mobileRadius : desktopRadius;
              
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const isSelected = i === carouselIndex;

              // Responsive planet sizes
              const baseSizes = [0.4, 0.35, 0.45, 0.3, 0.5, 0.55, 0.4, 0.35, 0.4, 0.35];
              const mobileScale = 0.7;
              const actualBaseSize = window.innerWidth < 768 ? baseSizes[i] * mobileScale : baseSizes[i];
              const planetSize = isSelected ? actualBaseSize + 0.15 : actualBaseSize;

              return (
                <group key={i}>
                  {/* Main Planet */}
                  <mesh
                    position={[x, 0, z]}
                    onClick={() => setCarouselIndex(i)}
                  >
                    <sphereGeometry args={[planetSize, 32, 32]} />
                    <meshBasicMaterial
                      color={project.color}
                      transparent
                      opacity={0.9}
                    />
                  </mesh>

                  {/* Selection indicators - Responsive */}
                  {isSelected && (
                    <mesh position={[x, planetSize + 0.3, z]}>
                      <sphereGeometry args={[0.06, 8, 8]} />
                      <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={1}
                      />
                    </mesh>
                  )}

                  {/* Selection ring - Responsive */}
                  {isSelected && (
                    <mesh position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
                      <ringGeometry
                        args={[planetSize + 0.08, planetSize + 0.12, 32]}
                      />
                      <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                      />
                    </mesh>
                  )}

                  {/* Planet atmosphere when selected */}
                  {isSelected && (
                    <mesh position={[x, 0, z]}>
                      <sphereGeometry args={[planetSize + 0.08, 16, 16]} />
                      <meshBasicMaterial
                        color={project.color}
                        transparent
                        opacity={0.2}
                        side={THREE.BackSide}
                      />
                    </mesh>
                  )}

                  {/* Planet rings - Only on larger screens */}
                  {(i + 1) % 3 === 0 && window.innerWidth >= 768 && (
                    <mesh
                      position={[x, 0, z]}
                      rotation={[Math.PI / 6, 0, Math.PI / 8]}
                    >
                      <ringGeometry
                        args={[planetSize + 0.15, planetSize + 0.35, 32]}
                      />
                      <meshBasicMaterial
                        color={project.color}
                        transparent
                        opacity={isSelected ? 0.6 : 0.4}
                        side={THREE.DoubleSide}
                      />
                    </mesh>
                  )}

                  {/* Moons - Only on larger screens */}
                  {baseSizes[i] > 0.4 && window.innerWidth >= 768 && (
                    <mesh position={[x + planetSize + 0.4, 0, z]}>
                      <sphereGeometry args={[0.08, 8, 8]} />
                      <meshBasicMaterial color="#cccccc" />
                    </mesh>
                  )}

                  {/* Orbital path indicator */}
                  <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
                    <meshBasicMaterial
                      color={project.color}
                      transparent
                      opacity={isSelected ? 0.4 : 0.15}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                </group>
              );
            })}

            <OrbitControls
              enableZoom={true}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={window.innerWidth < 768 ? 0.5 : 1}
              enablePan={window.innerWidth >= 768}
              minDistance={window.innerWidth < 768 ? 8 : 5}
              maxDistance={window.innerWidth < 768 ? 25 : 30}
            />
          </Canvas>
        </div>{" "}
        {/* Enhanced Project Card - Responsive Right Side */}
        <div className="w-full lg:w-96 p-3 sm:p-4 bg-gradient-to-b from-gray-900/50 via-black/80 to-gray-900/50 backdrop-blur-xl border-t lg:border-l lg:border-t-0 border-gray-700/50">
          <div className="h-full flex flex-col max-h-screen overflow-hidden">
            {/* Header - Responsive */}
            <div className="mb-3 sm:mb-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                  NAVIGATION_SYSTEM
                </h3>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </div>

              {/* Progress Indicators - More responsive */}
              <div className="flex gap-1 mb-3 sm:mb-4 overflow-x-auto pb-1">
                {projects.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 cursor-pointer flex-shrink-0 ${
                      index === carouselIndex ? "w-6 sm:w-8" : "w-2 hover:w-3 sm:hover:w-4"
                    }`}
                    style={{
                      backgroundColor:
                        index === carouselIndex
                          ? projects[carouselIndex].color
                          : "#4a5568",
                    }}
                    onClick={() => setCarouselIndex(index)}
                  />
                ))}
              </div>

              <div className="text-xs text-gray-400 font-mono">
                TARGET: PROJECT_{carouselIndex + 1} | STATUS: ACTIVE | DISTANCE:{" "}
                {(2.5 + carouselIndex * 0.5).toFixed(1)}AU
              </div>
            </div>

            {/* Project Card Container - Responsive */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <ProjectCard
                  project={displayedProject}
                  isVisible={true}
                  key={displayedProject.id}
                />
              </div>
            </div>

            {/* Enhanced Navigation Controls - Mobile Optimized */}
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handlePrev}
                  className="group flex-1 relative px-3 sm:px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 rounded-lg hover:border-gray-500/70 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-1 sm:gap-2 text-gray-300 group-hover:text-white">
                    <div className="text-blue-400 text-lg sm:text-xl font-mono">‹</div>
                    <span className="font-mono font-bold text-sm sm:text-base">PREV</span>
                  </div>
                </button>

                <button
                  onClick={handleNext}
                  className="group flex-1 relative px-3 sm:px-4 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50 rounded-lg hover:border-gray-500/70 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-1 sm:gap-2 text-gray-300 group-hover:text-white">
                    <span className="font-mono font-bold text-sm sm:text-base">NEXT</span>
                    <div className="text-cyan-400 text-lg sm:text-xl font-mono">›</div>
                  </div>
                </button>
              </div>

              {/* Random Project Button - Mobile Responsive */}
              <button
                onClick={() => {
                  const randomIndex = Math.floor(
                    Math.random() * projects.length
                  );
                  setCarouselIndex(randomIndex);
                }}
                className="w-full px-3 sm:px-4 py-2 bg-purple-800/30 hover:bg-purple-700/50 border border-purple-600/50 rounded text-xs sm:text-sm text-purple-300 hover:text-purple-200 transition-all duration-300 font-mono"
              >
                🎲 RANDOM_PROJECT.EXE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions - Mobile Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10 px-4 w-full max-w-4xl">
        <p className="text-xs sm:text-sm text-gray-400 mb-2 font-mono">
          <span className="hidden sm:inline">🖱️ DRAG_TO_ROTATE • 🔍 SCROLL_TO_ZOOM • </span>
          <span className="sm:hidden">👆 TAP_PLANETS • 📱 PINCH_TO_ZOOM • </span>
          ✨ <span className="hidden sm:inline">CLICK</span><span className="sm:hidden">TAP</span>_PLANETS_TO_EXPLORE
        </p>
        <div className="flex justify-center gap-3 sm:gap-6 text-xs flex-wrap">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ffaa00]"></div>
            <span className="text-gray-500 font-mono">WEB_DEV</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
            <span className="text-gray-500 font-mono">AI_ML</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-[#87ceeb]"></div>
            <span className="text-gray-500 font-mono">FULLSTACK</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff6b35]"></div>
            <span className="text-gray-500 font-mono">CLIENT_WORK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
