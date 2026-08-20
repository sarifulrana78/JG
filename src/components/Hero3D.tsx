"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

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
          color="#008060" 
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-slate-900 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#008060" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Suspense fallback={null}>
            <FloatingGadget />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl px-6 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-outfit font-black text-white tracking-tighter mb-6 leading-tight">
          The Future of <span className="text-shopify-green">E-Commerce</span> is Here
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto">
          Discover premium gadgets and modern fashion trends with a breathtaking immersive experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          <button className="px-8 py-4 bg-shopify-green hover:bg-shopify-green-dark text-white font-bold rounded-full transition-all text-lg shadow-xl hover:-translate-y-1">
            Start Shopping
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white hover:border-shopify-green hover:text-shopify-green text-white font-bold rounded-full transition-all text-lg">
            Explore Offers
          </button>
        </div>
      </div>
    </div>
  );
}
