import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';

const AnimatedSphere = () => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingRing = ({ position, rotation, color }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 + rotation[0];
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + rotation[1];
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.9, 0.1, 16, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

const ThreeDScene = ({ height = '400px' }) => {
  return (
    <div style={{ height, width: '100%' }} className="relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <AnimatedSphere />
          <FloatingRing position={[2.5, 0.5, -1]} rotation={[0.5, 0.3, 0]} color="#8b5cf6" />
          <FloatingRing position={[-2.5, -0.5, -1]} rotation={[0.8, 0.1, 0]} color="#06b6d4" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDScene;
