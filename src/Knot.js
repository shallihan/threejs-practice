import React from "react";
import { TorusKnot } from "@react-three/drei";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import bumpUrl from "./bump.jpeg";

export default function Knot() {
  const bump = useLoader(TextureLoader, bumpUrl);
  return (
    <TorusKnot args={[0.5, 0.4, 256, 64]} position={[2.5, 3, -2]}>
      <meshPhongMaterial
      map={bump}
        displacementMap={bump}
        displacementScale={0.05}
        flatShading={true}
        roughness={1}
        metalness={0.5}
        shininess={100}
        attach="material"
        color={"lightpink"}
      />
    </TorusKnot>
  );
}
