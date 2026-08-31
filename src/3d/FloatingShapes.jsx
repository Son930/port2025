import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = ["#BC6709", "#CD8D47", "#107E7D", "#E3B505"];

function Shape({ geometry, color, position, speed = 0.3 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x += delta * speed * 0.4;
    }
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

export default function FloatingShapes() {
  const torus = React.useMemo(() => new THREE.TorusGeometry(0.4, 0.15, 16, 32), []);
  const octa = React.useMemo(() => new THREE.OctahedronGeometry(0.5, 0), []);
  const dodeca = React.useMemo(() => new THREE.DodecahedronGeometry(0.35, 0), []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={0.9} />
      <Shape geometry={torus} color={COLORS[0]} position={[0, 0.2, 0]} speed={0.25} />
      <Shape geometry={octa} color={COLORS[1]} position={[-0.8, -0.3, 0.2]} speed={0.2} />
      <Shape geometry={dodeca} color={COLORS[2]} position={[0.7, -0.2, -0.1]} speed={0.35} />
    </>
  );
}
