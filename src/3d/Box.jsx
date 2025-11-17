import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Html, Text } from "@react-three/drei";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import * as THREE from "three";
import { easing } from "maath";
import "../index.css";
import Lanche from "../Fonts/Lanche-Otf.otf";

// Constants
const SPHERE_COLORS = [
  "royalblue",
  "hotpink",
  "limegreen",
  "goldenrod",
  "violet",
  "cyan",
];
const SPHERE_POSITIONS = [
  [-4, 2, 0],
  [0, 1, 2],
  [3, -1, -1],
  [-2, -2, -4],
  [5, -4, -7],
  [-5, 4, -7],
];

// Sphere Component with improved props and randomization
const Sphere = React.memo(({ position, colorIndex }) => {
  const ref = useRef();
  const api = useRef();
  const floatSpeeds = useRef({
    x: Math.random() * 0.4 + 0.2,
    y: Math.random() * 0.2 + 0.2,
    z: Math.random() * 0.3 + 0.2,
  }).current;
  const FLOAT_DISTANCE = 2;

  useFrame((state, delta) => {
    if (api.current) {
      const time = state.clock.getElapsedTime();
      api.current.setTranslation(
        {
          x: position[0] + Math.sin(time * floatSpeeds.x) * FLOAT_DISTANCE,
          y: position[1] + Math.cos(time * floatSpeeds.y) * FLOAT_DISTANCE,
          z: position[2] + Math.sin(time * floatSpeeds.z) * FLOAT_DISTANCE,
        },
        true
      );
    }
    if (ref.current) {
      easing.dampC(
        ref.current.material.color,
        SPHERE_COLORS[colorIndex],
        0.5,
        delta
      );
    }
  });

  return (
    <RigidBody
      ref={api}
      linearDamping={4}
      angularDamping={1}
      friction={0.15}
      position={position}
    >
      <BallCollider args={[1]} />
      <mesh ref={ref} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />{" "}
        {/* Reduced segments for performance */}
        <meshPhysicalMaterial
          color="white"
          transparent
          opacity={0.5}
          roughness={0.4}
          metalness={1}
          reflectivity={2}
          clearcoat={0.5}
          clearcoatRoughness={0}
          transmission={1}
          ior={1.1}
          thickness={0.1}
        />
      </mesh>
    </RigidBody>
  );
});

// Camera Rig with smooth movement
const Rig = () => {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 3.5,
        15 + Math.cos(state.pointer.x) * 10,
      ],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// Text Components
const NameText = () => (
  <Text
    font={Lanche}
    fontSize={1.7}
    letterSpacing={-0.042}
    position={[0, 0, 0]}
    color="white"
    anchorX="center"
    anchorY="middle"
    outlineWidth={0.02}
    outlineColor="black"
  >
    Sunny Sondhi
    <meshStandardMaterial
      color="white"
      emissive="white"
      emissiveIntensity={1}
      metalness={1}
      roughness={0.5}
    />
  </Text>
);

const TitleText = () => (
  <Text
    font={Lanche}
    fontSize={0.23}
    letterSpacing={-0.042}
    position={[0, -1, 0]}
    color="white"
    anchorX="center"
    anchorY="middle"
    outlineWidth={0.01}
    outlineColor="black"
  >
    Junior Software Developer/Engineer
  </Text>
);

const CircularText = () => {
  const text = "SUNNYSONDHI";
  const radius = 50;
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <Html position={[-8, -3, 0]}>
      <div style={{ position: "relative", width: "100px", height: "100px" }}>
        {text.split("").map((char, index) => {
          const angle = (index / text.length) * Math.PI * 2 + rotation;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <span
              key={index}
              style={{
                position: "absolute",
                left: `${50 + x}px`,
                top: `${50 + y}px`,
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                color: "cyan",
                fontSize: "20px",
                fontFamily: "sans-serif",
                textShadow: "0 0 5px blue",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </Html>
  );
};

// Main Component
const Box = () => {
  return (
    <Canvas
      shadows
      dpr={[0.5, 1]}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 90 }}
      style={{ height: "100vh" }}
    >
      {/* <color attach="background" args={["#0C090A"]} /> */}

      <Physics timeStep={1 / 60} gravity={[0, 0, 0]}>
        {SPHERE_POSITIONS.map((pos, index) => (
          <Sphere
            key={index}
            position={pos}
            colorIndex={index % SPHERE_COLORS.length}
          />
        ))}
      </Physics>

      <NameText />
      <TitleText />
      <CircularText />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={100}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
          <Lightformer
            form="ring"
            color="#4060ff"
            intensity={80}
            position={[10, 10, 0]}
            scale={10}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </group>
      </Environment>

      <Rig />
    </Canvas>
  );
};

export default Box;
