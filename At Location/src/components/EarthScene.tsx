import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Main Earth sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a4d6f"
          emissive="#0a2540"
          emissiveIntensity={0.3}
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>

      {/* Atmospheric glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function Satellites() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 120, 240].map((angle, i) => {
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * 3.5;
        const z = Math.sin(radian) * 3.5;

        return (
          <group key={i}>
            {/* Satellite */}
            <mesh position={[x, 0, z]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={0.8}
              />
            </mesh>

            {/* Orbit trail */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[3.5, 0.005, 16, 100]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 50 + Math.random() * 50;

    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
}

export const EarthScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars />
        <Earth />
        <Satellites />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
