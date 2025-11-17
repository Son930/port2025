/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import modelPath from "../assets/space_station_3/scene.gltf";

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-t-transparent border-l-transparent border-r-blue-400 border-b-blue-400" />
        <div className="h-8 w-8 rounded-full border-2 border-dashed border-white/30" />
      </div>
    </div>
  );
}

function Model(props) {
  const { scene, animations } = useGLTF(modelPath);
  const modelRef = useRef();

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        // Adjust material properties to help with texture visibility
        node.material.metalness = 0.2;
        node.material.roughness = 0.5;
        // Ensure textures are applied
        if (node.material.map) {
          node.material.map.flipY = false; // Might help with texture orientation
          node.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return <primitive {...props} ref={modelRef} object={scene} />;
}

export default function ModelViewer() {
  const [loading, setLoading] = useState(true);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 50 }}
      onCreated={() => setLoading(false)}
      className="bg-black"
    >
      <ambientLight intensity={0.75} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.25}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={2048}
      />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#ffffff" />
      <Suspense fallback={<LoadingSpinner />}>
        <Model scale={[1, 1, 1]} position={[0, -1, -5]} />
        <Environment preset="sunset" />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Suspense>
    </Canvas>
  );
}
