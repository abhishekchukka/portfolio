import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import gsap from "gsap";

// Animated starfield background for footer
function FooterStarfield() {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 50; // x
      arr[i + 1] = (Math.random() - 0.5) * 20; // y
      arr[i + 2] = (Math.random() - 0.5) * 50; // z
    }
    return arr;
  });

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.rotation, {
        y: Math.PI * 2,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffaa00"
        size={0.2}
        sizeAttenuation={false}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

// Social media and contact links data
const socialLinks = [
  {
    name: "GitHub",
    icon: "🐱",
    url: "https://github.com/abhishekchukka",
    color: "#333",
    description: "Code repositories",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    url: "https://linkedin.com/in/abhishekchukka",
    color: "#0077b5",
    description: "Professional network",
  },
  {
    name: "Email",
    icon: "📧",
    url: "mailto:john.chukka@gmail.com",
    color: "#ea4335",
    description: "Direct contact",
  },
  {
    name: "Youtube",
    icon: "⭐",
    url: "https://www.youtube.com/@abhichukka6568",
    color: "#ff0000",
    description: "Video content",
  },
  {
    name: "Instagram",
    icon: "📷",
    url: "https://instagram.com/abhishekchukka",
    color: "#e4405f",
    description: "Visual stories",
  },
  {
    name: "Portfolio",
    icon: "🌐",
    url: "https://portfolio-seven-eosin-klhkdkfb6e.vercel.app/",
    color: "#ffaa00",
    description: "portfolio",
  },
];

// Quick navigation links
const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function Footer() {
  const footerRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && footerRef.current) {
      // Removed ScrollTrigger animation to fix sticky behavior on mobile
      gsap.set(footerRef.current, {
        opacity: 1,
        y: 0,
      });
    }
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white border-t border-gray-800 overflow-hidden"
    >
      {/* 3D Background - Hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-20">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={0.1} />
            <FooterStarfield />
          </Canvas>
        </div>
      )}

      {/* Mobile gradient background */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-gray-900"></div>
      )}

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,170,0,0.2) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-mono">
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, #ffaa00, #87ceeb, #ff6b35)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ABHISHEK.DEV
                </span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                Full Stack Developer & Machine Learning Engineer crafting
                digital experiences that bridge the gap between imagination and
                reality.
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-mono">
              NAVIGATION
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#ffaa00] transition-colors duration-300 text-sm font-mono group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#ffaa00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-mono">
              CONTACT_INFO
            </h4>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-gray-500 font-mono">EMAIL:</span>
                <br />
                <a
                  href="mailto:john.chukka@gmail.com"
                  className="text-gray-400 hover:text-[#ffaa00] transition-colors duration-300"
                >
                  john.chukka@gmail.com
                </a>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 font-mono">STATUS:</span>
                <br />
                <span className="text-green-400 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Available for work
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 font-mono">LOCATION:</span>
                <br />
                <span className="text-gray-400">Earth, Solar System 🌍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="mb-12">
          <h4 className="text-lg font-semibold text-white mb-6 text-center font-mono">
            CONNECT_WITH_ME
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#ffaa00]/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
              >
                <div className="relative z-10 text-center">
                  <div className="text-2xl mb-2">{social.icon}</div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {social.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {social.description}
                  </div>
                </div>

                {/* Hover border effect */}
                <div
                  className="absolute inset-0 border-2 border-transparent group-hover:border-current rounded-lg transition-all duration-300"
                  style={{ color: social.color }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-500 text-sm font-mono">
                © 2025 Abhishek Chukka. All rights reserved.
              </p>
              {/* <p className="text-gray-600 text-xs mt-1">
                Built with ⚛️ React + 🎨 GSAP + 🚀 Three.js
              </p> */}
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ffaa00]/20 to-[#87ceeb]/20 border border-[#ffaa00]/30 rounded-lg hover:border-[#ffaa00]/60 transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-sm font-mono text-[#ffaa00]">
                BACK_TO_TOP
              </span>
              <svg
                className="w-4 h-4 text-[#ffaa00] group-hover:animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Terminal-style signature */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-black/60 border border-gray-700 rounded px-4 py-2">
            <span className="text-green-400 text-xs font-mono">
              $ echo "Thanks for visiting! "
            </span>
          </div>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffaa00] to-transparent">
        <div className="h-full bg-gradient-to-r from-transparent via-[#ffaa00] to-transparent animate-pulse" />
      </div>
    </footer>
  );
}

export default Footer;
