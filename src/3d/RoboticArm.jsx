/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import modelPath from "../assets/black_honey_-_robotic_arm.glb";

function ArmLogic({ mouse, isPinching }) {
  const baseGroup = useRef();
  const armGroup = useRef();
  const { scene } = useGLTF(modelPath);
  const pinchNode = useRef(null);

  useEffect(() => {
    if (!scene || !baseGroup.current || !armGroup.current) return;

    const roboarmNodes = [];
    const baseNodes = [];

    scene.traverse((node) => {
      if (!node.isObject3D) return;
      const name = node.name;
      if (name.startsWith("roboarm")) {
        roboarmNodes.push(node);
        if (name === "roboarm_low_28") pinchNode.current = node;
      } else if (name.startsWith("robot_base")) {
        baseNodes.push(node);
      }
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.material.metalness = 0.2;
        node.material.roughness = 0.5;
      }
    });

    baseGroup.current.position.set(0, 0, 0);
    baseGroup.current.rotation.set(0, 0, 0);
    baseNodes.forEach((node) => baseGroup.current.add(node.clone()));

    roboarmNodes.sort((a, b) => {
      const aNum = parseInt(
        a.name.match(/\d+/)?.[0] || (a.name === "roboarm_low_28" ? 999 : 0)
      );
      const bNum = parseInt(
        b.name.match(/\d+/)?.[0] || (b.name === "roboarm_low_28" ? 999 : 0)
      );
      return aNum - bNum;
    });

    roboarmNodes.forEach((node, index) => {
      const clonedNode = node.clone();
      if (index === 0) {
        baseGroup.current.add(clonedNode);
      } else {
        roboarmNodes[index - 1].add(clonedNode);
      }
      armGroup.current.add(clonedNode);
    });
  }, [scene]);

  useFrame(() => {
    if (!armGroup.current || !pinchNode.current) return;

    const targetX = mouse.current.x * 2;
    const targetY = mouse.current.y * 2;

    armGroup.current.children.forEach((part, index) => {
      if (index === 0) return;
      part.rotation.x = THREE.MathUtils.lerp(
        part.rotation.x,
        targetY * Math.PI * 0.5,
        0.1
      );
      part.rotation.y = THREE.MathUtils.lerp(
        part.rotation.y,
        targetX * Math.PI * 0.5,
        0.1
      );
    });

    pinchNode.current.rotation.z = THREE.MathUtils.lerp(
      pinchNode.current.rotation.z,
      isPinching ? -0.5 : 0,
      0.2
    );
  });

  return (
    <group>
      <group ref={baseGroup} />
      <group ref={armGroup} />
    </group>
  );
}

export default function RoboticArm() {
  const mouse = useRef({ x: 0, y: 0 });
  const [isPinching, setIsPinching] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!window) return; // Ensure window exists
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) setIsPinching(true);
  }, []);

  const handleMouseUp = useCallback((e) => {
    if (e.button === 0) setIsPinching(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return; // Guard for non-browser environments

    const events = [
      ["mousemove", handleMouseMove],
      ["mousedown", handleMouseDown],
      ["mouseup", handleMouseUp],
    ];

    events.forEach(([event, handler]) =>
      window.addEventListener(event, handler)
    );

    return () => {
      events.forEach(([event, handler]) =>
        window.removeEventListener(event, handler)
      );
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
      camera={{ position: [0, 2, 5], fov: 60, near: 0.1, far: 1000 }}
      shadows
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          console.warn("WebGL context lost, attempting to restore...");
          e.preventDefault();
        });
        gl.domElement.addEventListener("webglcontextrestored", () => {
          console.log("WebGL context restored");
        });
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera={{
          near: 0.5,
          far: 50,
          top: 20,
          right: 20,
          bottom: -20,
          left: -20,
        }}
      />
      <ArmLogic mouse={mouse} isPinching={isPinching} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={2}
        maxDistance={10}
      />
    </Canvas>
  );
}
