import { useGLTF } from "@react-three/drei";

export function Rocks(props) {
  const { scene } = useGLTF("/tomb/scene.gltf");
  return <primitive object={scene} {...props} />;
}

export function Rock(props) {
  const { scene } = useGLTF("/rock/scene.gltf");
  return <primitive object={scene} {...props} />;
}
