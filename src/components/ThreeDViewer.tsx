// src/components/ThreeDViewer.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ShoeModel = () => {
  const { scene } = useGLTF('/models/shoe.glb');
  return <primitive object={scene} scale={2} />;
};

const ThreeDViewer = () => {
  return (
    <Canvas style={{ height: '400px' }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />
      <ShoeModel />
    </Canvas>
  );
};

export default ThreeDViewer;
