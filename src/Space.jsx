import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Stars } from "@react-three/drei";
import { SunModel } from "./SunModel";
import { AstronautModel } from "./AstronautModel";

// Component to load and display the space station GLB model
function SpaceStation({
  position = [10, 10, 100],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) {
  const { scene } = useGLTF("/space_station.glb");
  const meshRef = useRef();

  // Auto-rotate the space station
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// Loading fallback component
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
      <div className="text-center">
        <div className="text-white text-xl mb-4">Loading Space Station...</div>
        <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}

// Main Space component
export default function Space() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        {/* Background stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Lighting setup - reduced ambient to emphasize sun lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} intensity={0.2} color="white" />
        <pointLight position={[10, -10, 5]} intensity={0.2} color="#0088ff" />

        {/* Environment for reflections */}
        <Environment preset="space" />

        {/* Controls for interaction */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={50}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />

        {/* Load the space station model with suspense */}
        <Suspense fallback={null}>
          <SpaceStation scale={[2, 2, 10]} position={[10, 10, 100]} />
          {/* Add the Sun model in a fixed position */}
          <SunModel
            position={[-15, 10, -20]}
            scale={[0.5, 0.5, 0.5]}
            autoRotate={true}
            rotationSpeed={0.03}
            glowIntensity={4}
            glowColor="#ffaa00"
            targetPosition={[10, 10, 100]}
          />
          {/* Add the Astronaut floating in space */}
          <AstronautModel
            position={[5, 5, 80]}
            scale={[10, 10, 10]}
            floatIntensity={1}
            floatSpeed={0.5}
            autoRotate={true}
            rotationSpeed={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <Suspense fallback={<Loader />}>
        <div />
      </Suspense>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <h1 className="text-2xl font-bold text-green-400 mb-2">
          Space Scene - Station, Sun & Astronaut
        </h1>
        <div className="text-sm opacity-70">
          <p>• Use mouse to rotate the view</p>
          <p>• Scroll to zoom in/out</p>
          <p>• Drag to pan around</p>
          <p>• Watch the floating astronaut animation</p>
          <p>• Observe the glowing sun effects</p>
        </div>
      </div>

      {/* Back button */}
      <button
        className="absolute top-4 right-4 px-4 py-2 bg-green-400 text-black font-semibold rounded hover:bg-green-300 transition-colors z-10"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
    </div>
  );
}

// Preload the GLB models for better performance
useGLTF.preload("/space_station.glb");
useGLTF.preload("/the_star_sun.glb");
useGLTF.preload("/astronaut.glb");
