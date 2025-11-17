/* eslint-disable react/no-unknown-property */
import "./Footer.css";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Component to handle the background
function Background() {
  const scene = useRef();
  useFrame(() => {
    if (scene.current) {
      scene.current.background = new THREE.Color("#1a1a3d");
    }
  });

  return <scene ref={scene} />;
}

function PillarsAndDoor() {
  const pillarWidth = 0.5;
  const maxPillarHeight = 7; // Maximum height for the closest pillars
  const numberOfPillarsPerSide = 6;
  const pillarSpacing = 1;
  const zSpacing = 2; // Spacing along the z-axis for each pillar

  const hugeDoorWidth = 5; // Width of the huge door in the middle
  const hugeDoorHeight = 10; // Height of the huge door
  const hugeDoorDepth = 0.5;
  const glowRef = useRef();

  // Animate the glow intensity for a pulsing effect
  useFrame(() => {
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(Date.now() * 0.002) * 0.5;
    }
  });

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: "#1a1a1a",
    roughness: 0.9,
    metalness: 0.1,
  });

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
    transparent: true,
    opacity: 0.9,
  });

  const pillarMaterial = new THREE.MeshStandardMaterial({
    color: "#0f0f0f",
    roughness: 0.8,
    metalness: 0.2,
  });

  const groundMaterial = new THREE.MeshStandardMaterial({
    color: "#2a2a2a",
    roughness: 0.7,
    metalness: 0.1,
  });

  // Function to calculate pillar height based on z-position
  const calculatePillarHeight = (zPosition) => {
    const minHeight = 3; // Minimum height for the farthest pillars
    const maxZ = (numberOfPillarsPerSide - 1) * zSpacing; // Farthest z-position
    const heightRange = maxPillarHeight - minHeight;
    const height = maxPillarHeight - (zPosition / maxZ) * heightRange;
    return Math.max(height, minHeight); // Ensure height doesn't go below minHeight
  };

  // Function to create a single pillar with dynamic height
  const createPillar = (xPosition, zPosition) => {
    const pillarHeight = calculatePillarHeight(zPosition);
    return (
      <mesh position={[xPosition, pillarHeight / 2, zPosition]}>
        <cylinderGeometry args={[pillarWidth, pillarWidth, pillarHeight, 8]} />
        <primitive object={pillarMaterial} attach="material" />
      </mesh>
    );
  };

  // Function to create the huge door in the middle
  const createHugeDoor = () => (
    <group position={[0, hugeDoorHeight / 2, 0]}>
      {/* Left frame */}
      <mesh position={[-hugeDoorWidth / 2 - 0.2, 0, 0]}>
        <boxGeometry args={[0.4, hugeDoorHeight + 0.4, hugeDoorDepth + 0.2]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      {/* Right frame */}
      <mesh position={[hugeDoorWidth / 2 + 0.2, 0, 0]}>
        <boxGeometry args={[0.4, hugeDoorHeight + 0.4, hugeDoorDepth + 0.2]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      {/* Top frame */}
      <mesh position={[0, hugeDoorHeight / 2 + 0.2, 0]}>
        <boxGeometry args={[hugeDoorWidth + 0.8, 0.4, hugeDoorDepth + 0.2]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
      {/* Glowing Door */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[hugeDoorWidth, hugeDoorHeight]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  );

  return (
    <group>
      {/* Pillars on the Left Side */}
      {[...Array(numberOfPillarsPerSide)].map((_, i) => {
        const xPosition =
          -((numberOfPillarsPerSide - 1) * pillarSpacing) / 2 -
          i * pillarSpacing -
          3;
        const zPosition = i * zSpacing; // Increase z as we move away from the camera
        return (
          <group key={`left-${i}`}>{createPillar(xPosition, zPosition)}</group>
        );
      })}

      {/* Pillars on the Right Side */}
      {[...Array(numberOfPillarsPerSide)].map((_, i) => {
        const xPosition =
          ((numberOfPillarsPerSide - 1) * pillarSpacing) / 2 +
          i * pillarSpacing +
          3;
        const zPosition = i * zSpacing; // Increase z as we move away from the camera
        return (
          <group key={`right-${i}`}>{createPillar(xPosition, zPosition)}</group>
        );
      })}

      {/* Huge Door in the Middle */}
      {createHugeDoor()}

      {/* Character in Front of the Door */}
      <group position={[0, 1, 3]} scale={[1.5, 1.5, 1.5]}>
        <mesh>
          <capsuleGeometry args={[0.3, 1, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[50, 50]} />
        <primitive object={groundMaterial} attach="material" />
      </mesh>

      {/* Glowing Particles */}
      <points position={[0, 0.1, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(100 * 3).map(
              () => (Math.random() - 0.5) * 10
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#ff0000" size={0.1} transparent opacity={0.8} />
      </points>

      {/* Red Glow Light */}
      <pointLight
        ref={glowRef}
        color="#ff0000"
        intensity={2}
        position={[0, hugeDoorHeight / 2, 1]}
        distance={30}
      />
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 15], fov: 75 }}>
      <Background />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <PillarsAndDoor />
    </Canvas>
  );
}

const HomePage = () => {
  return (
    <div className="HomePage h-[100vh]">
      <Scene />
    </div>
  );
};

export default HomePage;
