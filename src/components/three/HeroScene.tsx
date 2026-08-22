import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, Points, PointMaterial, RoundedBox, Torus } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";

function Particles() {
  const positions = useMemo(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 18;
      arr[i + 1] = (Math.random() - 0.5) * 12;
      arr[i + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);
  const ref = useRef<import("three").Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00E5FF" size={0.035} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  );
}

function Brain() {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <Icosahedron ref={ref} args={[1.35, 2]} position={[0, 0.1, 0]}>
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={0.55}
        wireframe
        roughness={0.2}
      />
    </Icosahedron>
  );
}

function Cube({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.4}>
      <RoundedBox args={[1, 1, 1]} radius={0.14} smoothness={4} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </RoundedBox>
    </Float>
  );
}

function Hologram() {
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.4;
    if (ref.current) ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15 - 1.4;
  });
  return (
    <group ref={ref} position={[0, -1.4, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
      <Torus args={[2.4, 0.012, 8, 128]}>
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
      </Torus>
      <Torus args={[3.1, 0.008, 8, 128]}>
        <meshBasicMaterial color="#FF4D8D" transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, pointer.x * 0.45, 3, delta);
    ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.28, 3, delta);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#7C3AED" />
      <pointLight position={[-6, -3, 4]} intensity={45} color="#00E5FF" />
      <pointLight position={[0, 4, -6]} intensity={35} color="#FF4D8D" />
      <Rig>
        <Brain />
        <Hologram />
        <Cube position={[-3.1, 1.3, -1]} color="#00E5FF" scale={0.75} />
        <Cube position={[3.2, 0.9, -0.5]} color="#FF4D8D" scale={0.6} />
        <Cube position={[2.4, -1.7, 0.6]} color="#7C3AED" scale={0.5} />
        <Cube position={[-2.6, -1.9, 0.4]} color="#7C3AED" scale={0.42} />
        <Particles />
      </Rig>
    </Canvas>
  );
}
