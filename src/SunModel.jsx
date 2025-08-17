import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Enhanced Sun component with glowing effects and directional lighting
export function SunModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  autoRotate = true,
  rotationSpeed = 0.1,
  glowIntensity = 2,
  glowColor = "#ffaa00",
  targetPosition = [2, 0, -5], // Position of the space station to illuminate
}) {
  const { scene } = useGLTF("/the_star_sun.glb");
  const meshRef = useRef();
  const glowRef = useRef();
  const directionalRef = useRef();

  // Auto-rotate the sun if enabled
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }

    // Animate glow intensity
    if (glowRef.current) {
      glowRef.current.intensity =
        glowIntensity * 2 + Math.sin(state.clock.elapsedTime * 2) * 1;
    }

    // Update directional light to always point toward target
    if (directionalRef.current) {
      const sunPos = new THREE.Vector3(...position);
      const targetPos = new THREE.Vector3(...targetPosition);
      directionalRef.current.position.copy(sunPos);
      directionalRef.current.target.position.copy(targetPos);
      directionalRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <group position={position}>
      {/* Main sun model */}
      <primitive
        ref={meshRef}
        object={scene}
        scale={scale}
        rotation={rotation}
      />

      {/* Main sun light - strong point light */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0]}
        color={glowColor}
        intensity={glowIntensity * 2}
        distance={100}
        decay={1}
        castShadow={true}
      />

      {/* Directional light from sun to illuminate the space station */}
      <directionalLight
        ref={directionalRef}
        color={glowColor}
        intensity={glowIntensity * 1.5}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Additional rim lighting effect */}
      <pointLight
        position={[2, 2, 2]}
        color={glowColor}
        intensity={glowIntensity * 0.5}
        distance={30}
        decay={2}
      />

      {/* Additional glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[scale[0] * 1.5, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[scale[0] * 2, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Preload the GLB model for better performance
useGLTF.preload("/the_star_sun.glb");

export default SunModel;
