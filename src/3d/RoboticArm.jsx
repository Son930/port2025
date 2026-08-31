/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Bounds } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";
import modelUrl from "./Rmk3.obj";

const LERP = 0.12;

function classifyPart(name) {
  if (/LEFT_GRIP|RIGHT_GRIP/i.test(name)) return "grip";
  if (/HEAD__rotating/i.test(name)) return "headRot";
  if (/HEAD__pith/i.test(name)) return "headPitch";
  if (/ARM__rotating/i.test(name)) return "armRot";
  if (/ARM__second/i.test(name)) return "armSecond";
  if (/ARM__prime/i.test(name)) return "armPrime";
  if (/BASE__rotating/i.test(name)) return "baseRot";
  if (/BASE__not_moving/i.test(name)) return "baseFixed";
  return "other";
}

function boxOf(objects) {
  const box = new THREE.Box3();
  objects.forEach((obj) => {
    if (obj) box.expandByObject(obj);
  });
  if (box.isEmpty()) {
    box.set(new THREE.Vector3(-0.1, 0, -0.1), new THREE.Vector3(0.1, 0.2, 0.1));
  }
  return box;
}

function pivotAt(worldPos) {
  const pivot = new THREE.Group();
  pivot.position.copy(worldPos);
  return pivot;
}

function ArmRig({ mouse }) {
  const joints = useRef({});
  const obj = useLoader(OBJLoader, modelUrl);

  const prepared = useMemo(() => {
    const root = obj.clone(true);

    const buckets = {
      baseFixed: [],
      baseRot: [],
      armPrime: [],
      armSecond: [],
      armRot: [],
      headPitch: [],
      headRot: [],
      grip: [],
      other: [],
    };

    root.traverse((node) => {
      if (!node.isMesh) return;
      buckets[classifyPart(node.name || "")].push(node);
      node.castShadow = true;
      node.receiveShadow = true;
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      mats.forEach((mat) => {
        if (!mat) return;
        mat.metalness = 0.45;
        mat.roughness = 0.4;
        mat.color = new THREE.Color("#a1a1aa");
        mat.needsUpdate = true;
      });
    });

    // Fit into frame: ~2.2 units tall, grounded, XZ-centered
    root.updateMatrixWorld(true);
    const rawBox = new THREE.Box3().setFromObject(root);
    const size = rawBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 1);
    root.scale.setScalar(1 / maxDim);
    root.updateMatrixWorld(true);

    const scaledBox = new THREE.Box3().setFromObject(root);
    const mid = scaledBox.getCenter(new THREE.Vector3());
    root.position.set(-mid.x, -scaledBox.min.y, -mid.z);
    root.updateMatrixWorld(true);

    const baseRot = buckets.baseRot;
    const arm1 = buckets.armPrime.length ? buckets.armPrime : baseRot;
    const arm2 = buckets.armSecond.length ? buckets.armSecond : arm1;
    const arm3 = buckets.armRot.length ? buckets.armRot : arm2;
    const headBits = [...buckets.headPitch, ...buckets.headRot, ...buckets.grip];

    const yawBox = boxOf(baseRot.length ? baseRot : arm1);
    const shoulderBox = boxOf(arm1);
    const elbowBox = boxOf(arm2);
    const wristBox = boxOf(arm3);
    const headBox = boxOf(headBits.length ? headBits : arm3);

    const yawC = yawBox.getCenter(new THREE.Vector3());
    const shC = shoulderBox.getCenter(new THREE.Vector3());
    const elC = elbowBox.getCenter(new THREE.Vector3());
    const wrC = wristBox.getCenter(new THREE.Vector3());
    const hdC = headBox.getCenter(new THREE.Vector3());
    const shSize = shoulderBox.getSize(new THREE.Vector3());
    const elSize = elbowBox.getSize(new THREE.Vector3());
    const wrSize = wristBox.getSize(new THREE.Vector3());

    // World-space pivots first, then .attach() so nesting keeps world transforms
    const yawPivot = pivotAt(new THREE.Vector3(yawC.x, yawBox.min.y, yawC.z));
    const shoulderPivot = pivotAt(new THREE.Vector3(shC.x, shoulderBox.min.y + shSize.y * 0.12, shC.z));
    const elbowPivot = pivotAt(new THREE.Vector3(elC.x, elbowBox.min.y + elSize.y * 0.18, elC.z));
    const wristPivot = pivotAt(new THREE.Vector3(wrC.x, wristBox.min.y + wrSize.y * 0.22, wrC.z));
    const headPivot = pivotAt(hdC);

    root.attach(yawPivot);
    yawPivot.attach(shoulderPivot);
    shoulderPivot.attach(elbowPivot);
    elbowPivot.attach(wristPivot);
    wristPivot.attach(headPivot);

    const attachMeshes = (pivot, list) => {
      list.forEach((mesh) => {
        if (mesh.parent) pivot.attach(mesh);
      });
    };

    // Fixed pedestal stays on root — never under yaw
    attachMeshes(root, buckets.baseFixed);
    attachMeshes(yawPivot, buckets.baseRot);
    attachMeshes(shoulderPivot, buckets.armPrime);
    attachMeshes(elbowPivot, buckets.armSecond);
    attachMeshes(wristPivot, buckets.armRot);
    attachMeshes(headPivot, headBits);
    attachMeshes(yawPivot, buckets.other);

    return {
      root,
      joints: {
        yaw: yawPivot,
        shoulder: shoulderPivot,
        elbow: elbowPivot,
        wrist: wristPivot,
        head: headPivot,
      },
      counts: {
        baseFixed: buckets.baseFixed.length,
        baseRot: buckets.baseRot.length,
        armPrime: buckets.armPrime.length,
        armSecond: buckets.armSecond.length,
        armRot: buckets.armRot.length,
        head: headBits.length,
      },
    };
  }, [obj]);

  useEffect(() => {
    joints.current = prepared.joints;
  }, [prepared]);

  useFrame(() => {
    const j = joints.current;
    if (!j.yaw) return;

    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Pedestal (BASE__not_moving_) stays fixed; turret + links track pointer
    j.yaw.rotation.y = THREE.MathUtils.lerp(j.yaw.rotation.y, mx * 1.0, LERP);
    j.shoulder.rotation.z = THREE.MathUtils.lerp(j.shoulder.rotation.z, my * 0.65, LERP);
    j.elbow.rotation.z = THREE.MathUtils.lerp(j.elbow.rotation.z, my * 0.45 + 0.1, LERP);
    j.wrist.rotation.z = THREE.MathUtils.lerp(j.wrist.rotation.z, -my * 0.28, LERP);
    j.head.rotation.y = THREE.MathUtils.lerp(j.head.rotation.y, mx * 0.28, LERP);
    j.head.rotation.x = THREE.MathUtils.lerp(j.head.rotation.x, -my * 0.2, LERP);
  });

  return (
    <group rotation={[0, Math.PI * 0.35, 0]} position={[0, -0.05, 0]}>
      <primitive object={prepared.root} />
    </group>
  );
}

function ArmScene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 6, 4]} intensity={1.35} />
      <directionalLight position={[-4, 2, -2]} intensity={0.55} />
      <hemisphereLight args={["#f4f4f5", "#18181b", 0.45]} />
      <Bounds fit clip observe margin={1.35}>
        <ArmRig mouse={mouse} />
      </Bounds>
      <ContactShadows position={[0, -0.85, 0]} opacity={0.28} scale={5} blur={2.2} far={4} />
    </>
  );
}

/** Interactive Rmk3 arm — fixed base, arm tracks pointer. */
export default function RoboticArm({ className = "" }) {
  const mouse = useRef({ x: 0, y: 0 });
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      mouse.current.y = THREE.MathUtils.clamp(-(((e.clientY - rect.top) / rect.height) * 2 - 1), -1, 1);
    };

    const onLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative h-full w-full touch-none ${className}`.trim()}>
      <Canvas
        dpr={1}
        camera={{ position: [2.5, 1.8, 3.2], fov: 35, near: 0.05, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ArmScene mouse={mouse} />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-cormorant text-[0.65rem] tracking-[0.22em] uppercase text-zinc-500">
        Move to aim the arm
      </p>
    </div>
  );
}
