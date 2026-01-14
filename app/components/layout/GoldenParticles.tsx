"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Neural Network Lines connecting particles
function NeuralConnections({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineArray: THREE.Vector3[][] = [];
    for (let i = 0; i < count; i++) {
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      const endPoint = new THREE.Vector3(
        startPoint.x + (Math.random() - 0.5) * 5,
        startPoint.y + (Math.random() - 0.5) * 5,
        startPoint.z + (Math.random() - 0.5) * 3
      );
      lineArray.push([startPoint, endPoint]);
    }
    return lineArray;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {lines.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#D4AF37"
            opacity={0.08}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const goldColor = new THREE.Color("#D4AF37");
    const bronzeColor = new THREE.Color("#CD7F32");
    const lightGold = new THREE.Color("#F9E076");
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution with some randomness
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      const r = 8 + THREE.MathUtils.randFloatSpread(8);
      
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta) * 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Vary colors between gold, bronze, and light gold
      const colorChoice = Math.random();
      const color = colorChoice < 0.5 ? goldColor : colorChoice < 0.8 ? bronzeColor : lightGold;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Slow base rotation
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;

      // Subtle mouse interaction
      ref.current.rotation.x += mouse.y * 0.05;
      ref.current.rotation.y += mouse.x * 0.05;

      // Gentle floating motion
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.5;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

// Floating orbs for ambient glow
function FloatingOrbs({ count = 8 }: { count?: number }) {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5 - 2,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 1,
      speed: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <>
      {orbs.map((orb, i) => (
        <OrbMesh key={i} {...orb} />
      ))}
    </>
  );
}

function OrbMesh({ 
  position, 
  scale, 
  speed, 
  phase 
}: { 
  position: [number, number, number]; 
  scale: number; 
  speed: number; 
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed + phase) * 2;
      ref.current.position.x = position[0] + Math.cos(state.clock.getElapsedTime() * speed * 0.5 + phase) * 1;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial
        color="#D4AF37"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ParticleField />
      <NeuralConnections count={80} />
      <FloatingOrbs count={6} />
      <fog attach="fog" args={['#050505', 10, 30]} />
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function GoldenParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }} 
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-40 pointer-events-none" />
    </div>
  );
}
