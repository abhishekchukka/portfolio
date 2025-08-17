import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Astronaut component with floating animation
export function AstronautModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  floatIntensity = 0.5,
  floatSpeed = 1,
  autoRotate = true,
  rotationSpeed = 0.1,
}) {
  const { scene } = useGLTF("/astronaut.glb");
  const meshRef = useRef();

  // Debug: Log when model loads
  useEffect(() => {
    if (scene) {
      console.log("Astronaut model loaded:", scene);
      console.log("Model bounding box:", scene.children);
    }
  }, [scene]);

  // Enable shadows on all meshes in the scene and set initial scale
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Ensure materials respond to lighting
          if (child.material) {
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  // Set scale whenever it changes
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(scale[0], scale[1], scale[2]);
    }
  }, [scale]);

  // Enhanced floating animation like stars with gentle rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      // Complex floating motion with multiple sine waves (like stars)
      meshRef.current.position.y =
        position[1] +
        Math.sin(time * floatSpeed) * floatIntensity +
        Math.sin(time * floatSpeed * 0.5) * (floatIntensity * 0.3);

      // Gentle horizontal drift with figure-8 pattern
      meshRef.current.position.x =
        position[0] +
        Math.cos(time * floatSpeed * 0.7) * (floatIntensity * 0.4) +
        Math.sin(time * floatSpeed * 0.3) * (floatIntensity * 0.2);

      // Subtle depth movement
      meshRef.current.position.z =
        position[2] +
        Math.sin(time * floatSpeed * 0.4) * (floatIntensity * 0.2);

      // Very slow rotation if enabled (like celestial bodies)
      if (autoRotate) {
        meshRef.current.rotation.y += delta * rotationSpeed;
      }

      // Gentle bobbing rotation (breathing effect)
      meshRef.current.rotation.x =
        rotation[0] + Math.sin(time * floatSpeed * 0.5) * 0.08;
      meshRef.current.rotation.z =
        rotation[2] + Math.cos(time * floatSpeed * 0.3) * 0.04;

      // Subtle scale breathing effect
      const breathe = 1 + Math.sin(time * floatSpeed * 0.6) * 0.02;
      meshRef.current.scale.set(
        scale[0] * breathe,
        scale[1] * breathe,
        scale[2] * breathe
      );
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Actual astronaut model */}
      <primitive object={scene} scale={scale} rotation={rotation} />
    </group>
  );
}

// Preload the GLB model for better performance
useGLTF.preload("/astronaut.glb");

export default AstronautModel;
