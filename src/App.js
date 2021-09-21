import * as THREE from "three";
import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, createPortal } from "@react-three/fiber";
import {
  Stage,
  Sky,
  useFBO,
  OrbitControls,
  PerspectiveCamera,
  MeshDistortMaterial,
} from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { Rocks, Rock } from "./Models";
import Texts from "./Text";
import Clouds from "./Clouds";
import Knot from "./Knot";


import "./App.css";

const AnimatedMaterial = a(MeshDistortMaterial);

function MagicMirror({ children, ...props }) {
  const cam = useRef();
  const fbo = useFBO();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state) => {
    cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse);
    state.gl.setRenderTarget(fbo);
    state.gl.render(scene, cam.current);
    state.gl.setRenderTarget(null);
  });

  return (
    <>
      <mesh {...props}>
        <planeGeometry args={[2.5, 5]} />
        <meshBasicMaterial map={fbo.texture} />
      </mesh>
      <PerspectiveCamera
        manual
        ref={cam}
        fov={50}
        aspect={2.5 / 5}
        onUpdate={(c) => c.updateProjectionMatrix()}
      />
      {createPortal(children, scene)}
    </>
  );
}

function Sphere() {
  const sphere = useRef();
  const [hovered, setHovered] = useState(false);
  const [down, setDown] = useState(false);
  const [{ wobble, color }] = useSpring(
    {
      wobble: down ? 1.5 : hovered ? 1.1 : 1,
      color: hovered ? "#E8B059" : "white",
    },
    [hovered, down]
  );
  return (
    <a.mesh
      position={[-2, 1, 3]}
      scale={wobble}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      ref={sphere}
    >
      <sphereBufferGeometry args={[1, 64, 64]} />
      <AnimatedMaterial
        attach="material"
        distort={0.5}
        speed={5}
        color={color}
        envMapIntensity="0.4"
        clearcoat="0.4"
        clearcoatRoughness={0}
        metalness={0.1}
      />
    </a.mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} />
    </>
  );
}

export default function App() {
  const controls = useRef();
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 4, 8], fov: 50 }}>
      <Lights />
      <Suspense fallback={null}>
        <Stage controls={controls}>
          <Texts
            anchorX="center"
            anchorY="middle"
            fontSize={1}
            lineHeight={1}
            letterSpacing={-0.02}
            color={"#000000"}
            position={[0, 6, 1]}
            fillOpacity={0}
            strokeWidth={"2.5%"}
            strokeColor="#949494"
          >
            Portal
          </Texts>
          <MagicMirror position={[0, 2.5, 0]} rotation={[0, 0, 0]}>
            <Lights />
            <Suspense fallback={null}>
              <Clouds />
              <Rocks
                scale={0.05}
                rotation={[5, 4.9, 5]}
                position={[-1, -2, -10]}
              />
            </Suspense>
            <Sky
              azimuth={0.5}
              turbidity={10}
              rayleigh={0.5}
              inclination={0.6}
              distance={100000}
            />
          </MagicMirror>
          <Knot />
          <Rock scale={5} position={[1.5, 0, 3]} />
          <Sphere />
        </Stage>
      </Suspense>
      <OrbitControls ref={controls} />
    </Canvas>
  );
}
