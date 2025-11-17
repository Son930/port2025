/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import modelPath from "../assets/julius_caesar_-_3d_printable.glb";

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
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.material.metalness = 0.2;
        node.material.roughness = 0.5;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    modelRef.current.rotation.y += delta * 0.6;
  });

  return <primitive {...props} ref={modelRef} object={scene} />;
}

export default function ModelViewer() {
  const [loading, setLoading] = useState(true);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [rotationPaused, setRotationPaused] = useState(false);

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-gray-900">
      {/* 3D Viewer Section */}
      <div className="relative h-1/2 lg:h-full w-full lg:w-1/2">
        {loading && <LoadingSpinner />}

        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={() => setLoading(false)}
          className="bg-gradient-to-br from-gray-800 to-gray-900"
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
          <directionalLight
            position={[-5, 5, 5]}
            intensity={0.5}
            color="#ffffff"
          />

          <Suspense fallback={null}>
            <Model
              scale={[0.2, 0.2, 0.2]}
              position={[0, -1, -5]}
              onPointerOver={() => setRotationPaused(true)}
              onPointerOut={() => setRotationPaused(false)}
            />
            <Environment preset="sunset" />
          </Suspense>

          <OrbitControls
            enabled={controlsEnabled}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            onStart={() => setRotationPaused(true)}
            onEnd={() => setRotationPaused(false)}
          />
        </Canvas>
      </div>

      {/* Information Panel */}
      <div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black backdrop-blur-lg overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Gaius Julius Caesar
        </h1>

        <div className="space-y-6 text-gray-300 max-w-2xl">
          <p className="text-lg leading-relaxed">
            Explore this meticulously crafted 3D reconstruction of Julius
            Caesar, based on historical records and archaeological findings. The
            model showcases Roman sculptural accuracy with modern PBR material
            rendering.
          </p>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-amber-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Interaction Guide
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <div className="p-2 rounded-md bg-amber-400/10">
                  <span className="text-amber-400">🖱️</span>
                </div>
                <div>
                  <p className="font-medium">Rotate View</p>
                  <p className="text-sm text-gray-400">Left click + drag</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <div className="p-2 rounded-md bg-amber-400/10">
                  <span className="text-amber-400">📌</span>
                </div>
                <div>
                  <p className="font-medium">Pan View</p>
                  <p className="text-sm text-gray-400">Right click + drag</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <div className="p-2 rounded-md bg-amber-400/10">
                  <span className="text-amber-400">🔍</span>
                </div>
                <div>
                  <p className="font-medium">Zoom</p>
                  <p className="text-sm text-gray-400">Scroll wheel</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Technical Specifications
            </h4>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <dt className="text-gray-400">Polygon Count</dt>
                <dd className="font-mono">≈150k tris</dd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <dt className="text-gray-400">Textures</dt>
                <dd className="font-mono">4K PBR</dd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <dt className="text-gray-400">Format</dt>
                <dd className="font-mono">GLB 2.0</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
