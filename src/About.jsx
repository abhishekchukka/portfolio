import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animated Card Component with mobile-optimized animations
function Card({ children, className = "", delay = 0, direction = "up" }) {
  const cardRef = useRef();
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
    if (cardRef.current) {
      // Skip animations on mobile for better performance
      if (isMobile) {
        gsap.set(cardRef.current, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
        });
        return;
      }

      // Reduced animations for mobile
      const startY = isMobile
        ? 30
        : direction === "up"
        ? 80
        : direction === "down"
        ? -80
        : 0;
      const startX = isMobile
        ? 0
        : direction === "left"
        ? 80
        : direction === "right"
        ? -80
        : 0;

      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: startY,
          x: startX,
          scale: isMobile ? 0.95 : 0.9,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: isMobile ? 0.6 : 1.2, // Shorter duration on mobile
          delay: delay,
          ease: isMobile ? "power1.out" : "power3.out", // Simpler easing on mobile
          scrollTrigger: !isMobile
            ? {
                trigger: cardRef.current,
                start: "top 85%",
              }
            : null,
        }
      );
    }
  }, [delay, direction, isMobile]);

  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-500 hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
}

// Tech Badge Component
function TechBadge({ tech, index }) {
  const badgeRef = useRef();

  useEffect(() => {
    if (badgeRef.current) {
      // Skip animations on mobile for better performance
      const isMobileDevice = window.innerWidth < 768;

      if (isMobileDevice) {
        gsap.set(badgeRef.current, {
          opacity: 1,
          scale: 1,
        });
        return;
      }

      gsap.fromTo(
        badgeRef.current,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={badgeRef}
      className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#ffaa00]/20 to-[#87ceeb]/20 border border-[#ffaa00]/30 rounded-full text-sm font-medium text-white hover:from-[#ffaa00]/30 hover:to-[#87ceeb]/30 transition-all duration-300 cursor-pointer"
    >
      {tech}
    </div>
  );
}

// Mobile Journey Cards Component - Enhanced card-tap experience
function MobileJourneyCards({ experiences }) {
  const [activeCard, setActiveCard] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeCard < experiences.length - 1) {
      setActiveCard(activeCard + 1);
    }
    if (isRightSwipe && activeCard > 0) {
      setActiveCard(activeCard - 1);
    }
  };

  const getCardColor = (type) => {
    switch (type) {
      case "internship":
        return "#ffaa00";
      case "freelance":
        return "#87ceeb";
      case "fulltime":
        return "#ff6b35";
      default:
        return "#ffaa00";
    }
  };

  return (
    <div className="space-y-6 px-2">
      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {experiences.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCard(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeCard === index ? "bg-[#ffaa00] scale-150" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Main card - Increased height and better spacing */}
      <div className="relative h-96 sm:h-80 overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${activeCard * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {experiences.map((exp, index) => (
            <div key={index} className="min-w-full h-full px-2">
              <div
                className="h-full p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-700 relative overflow-hidden flex flex-col"
                style={{
                  borderColor: `${getCardColor(exp.type)}40`,
                  boxShadow: `0 0 30px ${getCardColor(exp.type)}20`,
                }}
              >
                {/* Background accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-20"
                  style={{ backgroundColor: getCardColor(exp.type) }}
                />

                {/* Header - More compact */}
                <div className="flex items-start justify-between mb-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: getCardColor(exp.type) }}
                    />
                    <div>
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${getCardColor(exp.type)}20`,
                          color: getCardColor(exp.type),
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {index + 1}/{experiences.length}
                  </span>
                </div>

                {/* Content - Improved spacing and scrolling */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                  <div className="flex-shrink-0">
                    <h3
                      className="text-lg sm:text-xl font-bold mb-1 leading-tight"
                      style={{ color: getCardColor(exp.type) }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-gray-300 font-medium text-sm">
                      {exp.company}
                    </p>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Skills tags - More compact */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.slice(0, 5).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full border border-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {exp.skills.length > 5 && (
                      <span className="px-2 py-1 bg-gray-700/80 text-gray-400 text-xs rounded-full">
                        +{exp.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Swipe hint for first card - Better positioning */}
                {index === 0 && activeCard === 0 && (
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                    <span>Swipe</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - More compact */}
      <div className="flex justify-between items-center mt-6 px-4">
        <button
          onClick={() => setActiveCard(Math.max(0, activeCard - 1))}
          disabled={activeCard === 0}
          className={`p-2 sm:p-3 rounded-full border transition-all duration-300 ${
            activeCard === 0
              ? "border-gray-700 text-gray-600 cursor-not-allowed opacity-50"
              : "border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00]/10 hover:scale-105"
          }`}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Center indicator with current experience title */}
        <div className="flex-1 text-center px-4">
          <div className="text-xs text-gray-400 mb-1">Current</div>
          <div className="text-sm font-medium text-white truncate">
            {experiences[activeCard].role}
          </div>
        </div>

        <button
          onClick={() =>
            setActiveCard(Math.min(experiences.length - 1, activeCard + 1))
          }
          disabled={activeCard === experiences.length - 1}
          className={`p-2 sm:p-3 rounded-full border transition-all duration-300 ${
            activeCard === experiences.length - 1
              ? "border-gray-700 text-gray-600 cursor-not-allowed opacity-50"
              : "border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00]/10 hover:scale-105"
          }`}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Timeline Node Component
function TimelineNode({ experience, index, isActive, onClick }) {
  const nodeRef = useRef();

  useEffect(() => {
    if (nodeRef.current) {
      // Skip animations on mobile for better performance
      const isMobileDevice = window.innerWidth < 768;

      if (isMobileDevice) {
        gsap.set(nodeRef.current, {
          scale: 1,
          opacity: 1,
          x: 0,
        });
        return;
      }

      gsap.fromTo(
        nodeRef.current,
        {
          scale: 0,
          opacity: 0,
          x: -50,
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: nodeRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, [index]);

  const getNodeColor = (type) => {
    switch (type) {
      case "internship":
        return "#ffaa00";
      case "freelance":
        return "#87ceeb";
      case "volunteer":
        return "#ff6b35";
      default:
        return "#ffaa00";
    }
  };

  return (
    <div className="relative flex items-center gap-6 mb-16 last:mb-0">
      {/* Timeline Node */}
      <div
        ref={nodeRef}
        className="relative cursor-pointer group flex-shrink-0"
        onClick={() => onClick(index)}
      >
        <div
          className={`w-8 h-8 rounded-full border-4 transition-all duration-500 relative z-10 ${
            isActive ? "scale-125 shadow-lg" : "scale-100 hover:scale-110"
          }`}
          style={{
            backgroundColor: isActive
              ? getNodeColor(experience.type)
              : "transparent",
            borderColor: getNodeColor(experience.type),
            boxShadow: isActive
              ? `0 0 20px ${getNodeColor(experience.type)}40`
              : "none",
          }}
        >
          <div
            className={`absolute inset-1 rounded-full transition-all duration-300 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundColor: getNodeColor(experience.type) }}
          ></div>
        </div>

        {/* Pulse animation for active node */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-75"
            style={{ backgroundColor: getNodeColor(experience.type) }}
          ></div>
        )}

        {/* Connecting line - only show if not last item */}
        {index < 2 && (
          <div
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-current to-transparent opacity-30"
            style={{ color: getNodeColor(experience.type) }}
          ></div>
        )}
      </div>

      {/* Date and Company Label */}
      <div className="flex-shrink-0 w-32">
        <div
          className="text-sm font-bold"
          style={{ color: getNodeColor(experience.type) }}
        >
          {experience.period}
        </div>
        <div className="text-xs text-gray-400 mt-1">{experience.company}</div>
      </div>
    </div>
  );
}

// Experience Card Component
function ExperienceCard({ experience, isActive }) {
  const cardRef = useRef();

  useEffect(() => {
    if (cardRef.current) {
      if (isActive) {
        // Skip animations on mobile for better performance
        const isMobileDevice = window.innerWidth < 768;

        if (isMobileDevice) {
          gsap.set(cardRef.current, {
            opacity: 1,
            x: 0,
            scale: 1,
          });
          return;
        }

        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            x: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      }
    }
  }, [isActive]);

  if (!isActive) return null;

  const getNodeColor = (type) => {
    switch (type) {
      case "internship":
        return "#ffaa00";
      case "freelance":
        return "#87ceeb";
      case "volunteer":
        return "#ff6b35";
      default:
        return "#ffaa00";
    }
  };

  return (
    <div ref={cardRef} className="w-full">
      <div
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
        style={{ borderColor: `${getNodeColor(experience.type)}40` }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {experience.role}
            </h3>
            <p
              className="text-lg font-semibold"
              style={{ color: getNodeColor(experience.type) }}
            >
              {experience.company}
            </p>
          </div>
          <span
            className="text-sm px-4 py-2 rounded-full font-bold uppercase tracking-wide"
            style={{
              backgroundColor: `${getNodeColor(experience.type)}20`,
              color: getNodeColor(experience.type),
              border: `1px solid ${getNodeColor(experience.type)}40`,
            }}
          >
            {experience.type}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-300 text-base leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1.5 bg-gray-800/60 text-gray-200 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Achievement */}
        {experience.achievements && (
          <div className="border-t border-gray-700/50 pt-6">
            <h4
              className="text-sm font-semibold mb-2 uppercase tracking-wide"
              style={{ color: getNodeColor(experience.type) }}
            >
              Key Achievement
            </h4>
            <div className="text-white font-medium text-lg">
              {experience.achievements}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Vertical Timeline Component
function VerticalTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef();

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const experiences = [
    {
      role: "Frontend Intern",
      company: "Woodesy",
      period: "2024",
      type: "internship",
      description:
        "Built interactive UI components and optimized website performance. Collaborated with the team to deliver seamless user experiences using modern React patterns and best practices. Focused on creating responsive designs that work across all device types.",
      skills: [
        "Next.js",
        "React",
        "Microsoft sql server",
        "Performance Optimization",
        "Responsive Design",
      ],
      achievements: "Crafted responsive UI components with Next.js",
    },
    {
      role: "Full Stack Developer",
      company: "Daycare Center",
      period: "2024",
      type: "freelance",
      description:
        " Handled end-to-end development from design to deployment. Matched client’s needs with designs and color patterns, built user-friendly interfaces, and ensured smooth functionality.",
      skills: ["Next.js", "Client Management", "UI/UX Design"],
      achievements: "Delivered required application on time",
    },
    {
      role: "Creative Volunteer",
      company: "NGO BASS",
      period: "2023-present",
      type: "volunteer",
      description:
        "Created presentations and digital content for community awareness campaigns, reports. Contributing to social impact initiatives through creative and technical skills. Developed engaging visual content that effectively communicated important social messages.",
      skills: [
        "Content Creation",
        "Presentation Design",
        "Community Outreach",
        "Visual Design",
      ],
      achievements: "Reached 500+ community members through digital campaigns",
    },
  ];

  return (
    <div
      ref={timelineRef}
      className={`py-6 lg:py-8 ${
        isMobile ? "space-y-6" : "grid grid-cols-12 gap-12"
      }`}
    >
      {isMobile ? (
        // Mobile Layout - Enhanced card-tap based journey
        <MobileJourneyCards experiences={experiences} />
      ) : (
        // Desktop Layout - Original timeline design
        <>
          {/* Left Side - Vertical Timeline */}
          <div className="col-span-4">
            <div className="sticky top-32">
              <div className="relative">
                {/* Main Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ffaa00] via-[#87ceeb] to-[#ff6b35] opacity-30"></div>

                {/* Timeline Nodes */}
                <div className="space-y-0">
                  {experiences.map((exp, index) => (
                    <TimelineNode
                      key={index}
                      experience={exp}
                      index={index}
                      isActive={activeIndex === index}
                      onClick={setActiveIndex}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Experience Details */}
          <div className="col-span-8">
            <div className="min-h-96">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  isActive={activeIndex === index}
                />
              ))}
            </div>

            {/* Navigation Indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[#ffaa00] scale-125 shadow-lg shadow-[#ffaa00]/50"
                      : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function About() {
  const sectionRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Changed to 1024 for laptop/desktop distinction
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const techStack = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
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
    // Skip animations on mobile for better performance
    const isMobileDevice = window.innerWidth < 768;

    if (isMobileDevice) {
      gsap.set(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      gsap.set(lineRef.current, {
        scaleX: 1,
      });
      return;
    }

    // Title animation
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? 0.8 : 1.5, // Shorter duration on mobile
        ease: isMobile ? "power2.out" : "power3.out", // Simpler easing on mobile
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    // Animated line
    gsap.fromTo(
      lineRef.current,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: isMobile ? 0.8 : 1.5, // Shorter duration on mobile
        delay: isMobile ? 0.2 : 0.5, // Shorter delay on mobile
        ease: isMobile ? "power2.out" : "power3.out", // Simpler easing on mobile
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
        },
      }
    );
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-black text-white py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* CSS Animations for enhanced background effects */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(0px) translateX(10px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(-100px) translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-100px);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
      {/* Enhanced Starry Background with colorful lights */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Animated stars with different colors */}
        <div className="absolute inset-0">
          {[...Array(isMobile ? 40 : 80)].map((_, i) => {
            const colors = [
              "#ffaa00",
              "#87ceeb",
              "#ff6b35",
              "#00ff88",
              "#ff69b4",
              "#9d4edd",
              "#ffffff",
            ];
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            const isLargeStarr = Math.random() > 0.8;

            return (
              <div
                key={i}
                className={`absolute rounded-full animate-pulse ${
                  isLargeStarr ? "w-2 h-2" : "w-1 h-1"
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: randomColor,
                  boxShadow: `0 0 ${
                    isLargeStarr ? "8px" : "4px"
                  } ${randomColor}`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            );
          })}
        </div>

        {/* Floating light orbs */}
        <div className="absolute inset-0">
          {[...Array(isMobile ? 5 : 8)].map((_, i) => {
            const colors = ["#ffaa00", "#87ceeb", "#ff6b35", "#00ff88"];
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];

            return (
              <div
                key={`orb-${i}`}
                className="absolute w-4 h-4 rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: randomColor,
                  boxShadow: `0 0 20px ${randomColor}, 0 0 40px ${randomColor}`,
                  animation: `float ${
                    8 + Math.random() * 4
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            );
          })}
        </div>

        {/* Shooting stars */}
        <div className="absolute inset-0">
          {[...Array(isMobile ? 2 : 4)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animation: `shootingStar ${
                  3 + Math.random() * 2
                }s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
                boxShadow: "0 0 6px #ffffff, 0 0 12px #87ceeb",
              }}
            />
          ))}
        </div>

        {/* Enhanced grid overlay with subtle color variation */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(255,170,0,0.4) 1px, transparent 0),
                radial-gradient(circle at 20px 20px, rgba(135,206,235,0.3) 1px, transparent 0),
                radial-gradient(circle at 40px 10px, rgba(255,107,53,0.3) 1px, transparent 0)
              `,
              backgroundSize: isMobile
                ? "20px 20px, 40px 40px, 60px 60px"
                : "40px 40px, 80px 80px, 120px 120px",
            }}
          />
        </div>

        {/* Nebula-like gradient overlays */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #ffaa00 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #87ceeb 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #ff6b35 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Responsive */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
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
            className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#ffaa00] to-[#87ceeb] mx-auto mb-4 sm:mb-6 origin-left"
          ></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Final-year Computer Science student passionate about crafting
            digital experiences and exploring the frontiers of technology
          </p>
        </div>

        {/* Main Content Layout - Responsive */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Introduction Row - Responsive grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <Card className="lg:col-span-7" delay={0.2} direction="left">
              <div className="bg-gradient-to-br from-[#ffaa00]/10 via-transparent to-[#87ceeb]/10 backdrop-blur-sm border border-[#ffaa00]/20 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:border-[#ffaa00]/40 transition-colors duration-500">
                <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#ffaa00] rounded-full animate-pulse"></div>
                  <span className="text-[#ffaa00] font-semibold text-base lg:text-lg">
                    Currently
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 text-white">
                  Hey there! I'm a CS student who codes with purpose.
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3 lg:mb-4 text-sm lg:text-base">
                  I'm in my final year of{" "}
                  <span className="text-[#ffaa00] font-medium">
                    B.Tech Computer Science
                  </span>
                  , preparing for campus placements while diving deep into web
                  development and AI. Every project I build is a step toward
                  creating something meaningful.
                </p>
                <p className="text-gray-400 text-sm">
                  Based in Vijayawada • Looking for opportunities to grow and
                  contribute
                </p>
              </div>
            </Card>

            <Card className="lg:col-span-5" delay={0.4} direction="right">
              <div className="bg-gradient-to-tl from-[#87ceeb]/15 to-transparent backdrop-blur-sm border border-[#87ceeb]/25 rounded-xl lg:rounded-2xl p-4 lg:p-6 h-full hover:border-[#87ceeb]/50 transition-colors duration-500">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-[#87ceeb] mb-1 lg:mb-2">
                    2026
                  </div>
                  <div className="text-base lg:text-lg text-white font-semibold mb-2 lg:mb-3">
                    Final Year
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      Campus Placements
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#ffaa00] to-[#87ceeb] h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Ready for the next chapter
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Experience Timeline Section - Mobile optimized */}
          <div className="space-y-6 lg:space-y-8">
            <Card delay={0.6}>
              <div className="text-center mb-6 lg:mb-8">
                <div className="flex items-center justify-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                  <div className="w-6 lg:w-8 h-0.5 bg-[#ffaa00]"></div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#ffaa00]">
                    My Journey
                  </h3>
                  <div className="w-6 lg:w-8 h-0.5 bg-[#ffaa00]"></div>
                </div>
                <p className="text-gray-400 text-base lg:text-lg px-4">
                  {isMobile
                    ? "Tap on any card to learn more"
                    : "Click on any timeline node to explore my experience"}
                </p>
              </div>
            </Card>

            <Card delay={0.8}>
              <VerticalTimeline />
            </Card>
          </div>

          {/* Skills & Focus - Responsive grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <Card className="lg:col-span-5" delay={1.4} direction="left">
              <div className="bg-gradient-to-br from-[#87ceeb]/10 to-[#ffaa00]/5 backdrop-blur-sm border border-[#87ceeb]/20 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:border-[#87ceeb]/40 transition-colors duration-500">
                <h3 className="text-xl lg:text-2xl font-bold text-[#87ceeb] mb-4 lg:mb-6">
                  What I'm Exploring
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ffaa00] rounded-full"></div>
                    <span className="text-white font-medium">
                      Generative AI & NLP
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#87ceeb] rounded-full"></div>
                    <span className="text-white font-medium">
                      Deep Learning Applications
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                    <span className="text-white font-medium">
                      Advanced Web Development
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-700">
                  <p className="text-gray-300 text-sm">
                    Always learning, always building. The intersection of
                    creativity and logic is where I find the most interesting
                    problems to solve.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-7" delay={1.6} direction="right">
              <div className="bg-gradient-to-br from-[#ffaa00]/10 to-[#87ceeb]/5 backdrop-blur-sm border border-[#ffaa00]/20 rounded-xl lg:rounded-2xl p-6 lg:p-8 hover:border-[#ffaa00]/40 transition-colors duration-500">
                <h3 className="text-xl lg:text-2xl font-bold text-[#ffaa00] mb-4 lg:mb-6">
                  Technologies I Work With
                </h3>
                <div className="flex flex-wrap gap-2 lg:gap-3 mb-4 lg:mb-6">
                  {techStack.map((tech, index) => (
                    <TechBadge key={tech} tech={tech} index={index} />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 pt-4 lg:pt-6 border-t border-gray-700">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Frontend</div>
                    <div className="text-white font-medium text-sm">
                      React, TypeScript, Tailwind
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Backend</div>
                    <div className="text-white font-medium text-sm">
                      Node.js, Express, Firebase
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">AI/ML</div>
                    <div className="text-white font-medium text-sm">
                      Python, PyTorch
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Call to Action - Mobile optimized */}
          <Card delay={1.8}>
            <div className="text-center py-8 lg:py-12">
              <div className="max-w-2xl mx-auto px-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                  Ready to build something together?
                </h3>
                <p className="text-gray-300 mb-6 lg:mb-8 text-sm lg:text-base">
                  I'm actively looking for opportunities where I can contribute,
                  learn, and grow. Let's connect and create something
                  meaningful.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
                  <button className="px-6 lg:px-8 py-3 bg-gradient-to-r from-[#ffaa00] to-[#ff8800] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ffaa00]/30 transition-all duration-300 hover:scale-105">
                    Get In Touch
                  </button>
                  {/* <button className="px-6 lg:px-8 py-3 border border-[#87ceeb] text-[#87ceeb] font-semibold rounded-lg hover:bg-[#87ceeb]/10 transition-all duration-300 hover:scale-105">
                    View My Work
                  </button> */}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default About;
