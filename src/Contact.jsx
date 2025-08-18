import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import emailjs from "@emailjs/browser";

/*
 * EmailJS Setup Instructions:
 * 1. Go to https://www.emailjs.com/ and create an account
 * 2. Create a new service (Gmail recommended)
 * 3. Create an email template with the following variables:
 *    - {{from_name}} - sender's name
 *    - {{from_email}} - sender's email
 *    - {{message}} - the message content
 *    - {{to_email}} - your email (john.chukka@gmail.com)
 * 4. Get your Service ID, Template ID, and Public Key
 * 5. Replace the placeholder values below in the handleSubmit function
 */

// Floating particles for 3D background
const FloatingParticles = () => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={meshRef}>
      {Array.from({ length: 50 }).map((_, index) => (
        <Float
          key={index}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Sphere
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
            ]}
            scale={0.1 + Math.random() * 0.2}
          >
            <MeshDistortMaterial
              color="#00f5ff"
              transparent
              opacity={0.3}
              distort={0.3}
              speed={2}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// 3D Contact Text
const Contact3DText = () => {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={[-2, 2, -5]}>
        <mesh>
          <boxGeometry args={[4, 0.8, 0.2]} />
          <MeshDistortMaterial
            color="#00f5ff"
            distort={0.1}
            speed={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Holographic border component
const HolographicBorder = () => {
  return (
    <div className="absolute inset-0 rounded-xl">
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>

      {/* Animated border lines */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      <div className="absolute right-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // EmailJS configuration
      const serviceId = "service_your_id"; // You'll need to replace with your EmailJS service ID
      const templateId = "template_your_id"; // You'll need to replace with your EmailJS template ID
      const publicKey = "your_public_key"; // You'll need to replace with your EmailJS public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "john.chukka@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden bg-black pt-16 md:pt-24"
    >
      {/* 3D Background - Only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={0.3} />
            <pointLight
              position={[10, 10, 10]}
              intensity={0.5}
              color="#00f5ff"
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.3}
              color="#ff00f5"
            />
            <FloatingParticles />
            <Contact3DText />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      )}

      {/* Starry background for mobile */}
      {isMobile && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-blue-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#00f5ff_0%,_transparent_50%)] opacity-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_#ff00f5_0%,_transparent_50%)] opacity-20"></div>
          {/* Stars */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {/* Mobile Title */}
          {isMobile && (
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-cyan-400 mb-2">CONTACT</h2>
              <p className="text-gray-300">
                Let's build something amazing together
              </p>
            </div>
          )}

          {/* Contact Card */}
          <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <HolographicBorder />

            {/* Desktop Title */}
            {!isMobile && (
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-cyan-400 mb-2">
                  GET IN TOUCH
                </h2>
                <p className="text-gray-300 text-lg">
                  Ready to bring your ideas to life?
                </p>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-cyan-400 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-cyan-400 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-cyan-400 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg relative overflow-hidden group transition-all duration-300 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Launch Message"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="text-center p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="text-center p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                  Failed to send message. Please try again or email me directly
                  at john.chukka@gmail.com
                </div>
              )}
            </form>

            {/* Direct Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="text-center space-y-4">
                <p className="text-gray-300">Or reach out directly:</p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <a
                    href="mailto:john.chukka@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>📧</span>
                    <span>john.chukka@gmail.com</span>
                  </a>
                  <div className="text-gray-400 hidden sm:block">|</div>
                  <span className="text-gray-300 flex items-center space-x-2">
                    <span>🌍</span>
                    <span>Available worldwide</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
