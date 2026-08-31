import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GRID_SIZE = 58;
const SPACING = 0.26;
const CUBE_SIZE = 0.18;
const AMPLITUDE = 0.48;
const WAVE_SPEED = 0.4;
// Periodic frequency so the wave tiles seamlessly (infinite loop feel)
const GRID_EXTENT = (GRID_SIZE - 1) * SPACING;
const WAVE_FREQ = (2 * Math.PI * 2) / GRID_EXTENT; // 2 full waves across = seamless repeat

// Palette: valleys (dark) → peaks (light) = Oxblood to Saffron
const PALETTE = [
  "#95190C", // Oxblood
  "#9F2E22", // Brown Red
  "#A84136", // Reddish Brown
  "#BC6709", // Copperwood
  "#CD8D47", // Golden Apricot
  "#DEB384", // Sandy Clay
  "#F1DA82", // Light Gold
  "#E3B505", // Saffron
];

function getColorForHeight(normalizedT) {
  const i = Math.max(0, Math.min(PALETTE.length - 1, Math.floor(normalizedT * PALETTE.length)));
  return PALETTE[i];
}

function WaveCube({ x, z, geometry, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * WAVE_SPEED;
    // Same periodic formula – infinite looping motion
    const waveY =
      AMPLITUDE *
      (Math.sin(x * WAVE_FREQ + time) * Math.cos(z * WAVE_FREQ + time * 0.7) +
        Math.sin((x + z) * (WAVE_FREQ * 0.5) + time * 1.1) * 0.5);
    const h = Math.max(0.04, waveY + AMPLITUDE);
    meshRef.current.position.set(x, h / 2, z);
    meshRef.current.scale.set(1, h / CUBE_SIZE, 1);
    meshRef.current.updateMatrixWorld(true);
  });

  const baseY = useMemo(
    () =>
      AMPLITUDE *
      (Math.sin(x * WAVE_FREQ) * Math.cos(z * WAVE_FREQ) +
        Math.sin((x + z) * (WAVE_FREQ * 0.5)) * 0.5),
    [x, z]
  );

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[x, (baseY + AMPLITUDE) / 2, z]}
      scale={[1, (baseY + AMPLITUDE) / CUBE_SIZE, 1]}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.08}
        flatShading
      />
    </mesh>
  );
}

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default function WaveSurface3D() {
  const isDark = useIsDark();
  const bg = isDark ? "#0c0a09" : "#f7f5f0";
  const geometry = useMemo(() => new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE), []);

  const cells = useMemo(() => {
    const list = [];
    let minY = Infinity;
    let maxY = -Infinity;
    for (let iz = 0; iz < GRID_SIZE; iz++) {
      for (let ix = 0; ix < GRID_SIZE; ix++) {
        const x = (ix - GRID_SIZE / 2) * SPACING;
        const z = (iz - GRID_SIZE / 2) * SPACING;
        const baseY =
          AMPLITUDE *
          (Math.sin(x * WAVE_FREQ) * Math.cos(z * WAVE_FREQ) +
            Math.sin((x + z) * (WAVE_FREQ * 0.5)) * 0.5);
        minY = Math.min(minY, baseY);
        maxY = Math.max(maxY, baseY);
        list.push({ x, z, baseY, key: `${ix}-${iz}` });
      }
    }
    const range = maxY - minY || 1;
    list.forEach((c) => {
      c.t = (c.baseY - minY) / range;
      c.color = getColorForHeight(c.t);
    });
    return list;
  }, []);

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 4, 14]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 12, 5]} intensity={1.35} />
      <directionalLight position={[-5, 2, -4]} intensity={0.5} />
      <directionalLight position={[0, -2, 2]} intensity={0.15} />
      <group>
        {cells.map(({ x, z, key, color }) => (
          <WaveCube key={key} x={x} z={z} geometry={geometry} color={color} />
        ))}
      </group>
    </>
  );
}
