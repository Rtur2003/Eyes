"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      
      const r = 10 + THREE.MathUtils.randFloatSpread(4);
      
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
        // Slow rotation
        ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;

        // Subtle mouse interaction parallax
        const x = state.mouse.x * 0.2;
        const y = state.mouse.y * 0.2;
        ref.current.rotation.x += y * 0.1;
        ref.current.rotation.y += x * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4AF37"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function GoldenParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }} 
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField />
        <fog attach="fog" args={['#050505', 15, 30]} />
      </Canvas>
    </div>
  );
}
