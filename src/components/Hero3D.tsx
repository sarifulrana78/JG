"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import Link from "next/link";

function FloatingGadget() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshPhysicalMaterial 
          color="#febd69" 
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 - 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, -2, -2]}>
      <torusGeometry args={[0.8, 0.15, 32, 100]} />
      <meshPhysicalMaterial
        color="#007185"
        metalness={0.7}
        roughness={0.2}
        clearcoat={0.8}
      />
    </mesh>
  );
}

/** Loading skeleton shown while Three.js initializes */
function HeroSkeleton() {
  return (
    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-4 border-amazon-orange/30 border-t-amazon-orange animate-spin" />
    </div>
  );
}

export default function Hero3D() {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-slate-900 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#febd69" castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#007185" />
          <spotLight position={[0, 15, 0]} intensity={1.5} angle={0.4} penumbra={0.5} color="#ffffff" castShadow />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Suspense fallback={null}>
            <FloatingGadget />
            <FloatingRing />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl px-6 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-outfit font-black text-white tracking-tighter mb-6 leading-tight">
          The Future of <span className="text-gradient-orange">E-Commerce</span> is Here
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto">
          Discover premium gadgets and modern fashion trends with a breathtaking immersive experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          <Link 
            href="/#products"
            className="px-8 py-4 bg-amazon-orange hover:bg-amazon-orange-hover text-black font-bold rounded-full transition-all text-lg shadow-xl hover:-translate-y-1 glow-orange"
          >
            Start Shopping
          </Link>
          <Link 
            href="/#categories"
            className="px-8 py-4 bg-transparent border-2 border-white hover:border-amazon-orange hover:text-amazon-orange text-white font-bold rounded-full transition-all text-lg"
          >
            Explore Offers
          </Link>
        </div>
      </div>
    </div>
  );
}
