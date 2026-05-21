"use client";

import { Float, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function ObjectField() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#15f5ba" />
      <pointLight position={[-5, -2, 3]} intensity={1.6} color="#7c3aed" />
      <Stars radius={80} depth={40} count={1200} factor={4} fade speed={1} />
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[0, 0, 0]} rotation={[0.4, 0.2, 0]}>
          <icosahedronGeometry args={[1.55, 4]} />
          <MeshDistortMaterial color="#15f5ba" roughness={0.18} metalness={0.65} distort={0.28} speed={1.7} />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-2.3, -0.7, -0.7]}>
          <torusKnotGeometry args={[0.42, 0.13, 120, 18]} />
          <meshStandardMaterial color="#f8d66d" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={1.4} floatIntensity={1.7}>
        <mesh position={[2.2, 1.1, -0.5]}>
          <boxGeometry args={[0.82, 0.82, 0.82]} />
          <meshStandardMaterial color="#7c3aed" metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>
    </>
  );
}

export function Scene() {
  return (
    <div className="h-[420px] overflow-hidden rounded-[2rem]">
      <Canvas camera={{ position: [0, 0, 5], fov: 48 }} dpr={[1, 1.6]}>
        <ObjectField />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
