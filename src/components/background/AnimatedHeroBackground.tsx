import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particles component
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate random particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4A9EFF"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Wireframe Torus */}
      <mesh position={[-4, 2, -3]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshBasicMaterial
          color="#26C0E6"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Wireframe Sphere */}
      <mesh position={[4, -2, -2]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#4A9EFF"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Wireframe Box */}
      <mesh position={[0, 3, -4]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshBasicMaterial
          color="#26C0E6"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

// Flowing lines/connections
function FlowingLines() {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, -2, 0),
      new THREE.Vector3(-2, 1, 2),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(2, -1, 1),
      new THREE.Vector3(5, 2, 0),
    ]);
    return curve.getPoints(50);
  }, []);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#4A9EFF"
        transparent
        opacity={0.4}
        linewidth={2}
      />
    </line>
  );
}

export function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <ParticleField />
        <FloatingShapes />
        <FlowingLines />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#0A0A17', 10, 20]} />
      </Canvas>
    </div>
  );
}