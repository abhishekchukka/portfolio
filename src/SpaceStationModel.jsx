import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Standalone SpaceStation component that can be imported into other files
export function SpaceStationModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  autoRotate = true,
  rotationSpeed = 0.2,
}) {
  const { scene } = useGLTF("/space_station.glb");
  const meshRef = useRef();

  // Enable shadows on all meshes in the scene
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

  // Auto-rotate the space station if enabled
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * rotationSpeed;
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

// Preload the GLB model for better performance
useGLTF.preload("/space_station.glb");

export default SpaceStationModel;
