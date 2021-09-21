import React from "react";
import { Text } from "@react-three/drei";


export default function Texts({ ...props }) {
  return (
    <Text
      anchorX="center"
      anchorY="middle"
      textAlign="left"
      font="/Inter-Bold.woff"
      fontSize={3}
      lineHeight={1}
      letterSpacing={-0.06}
      position={[0, 6, 1]}
      {...props}
    >
      Portals
      <meshBasicMaterial toneMapped={false}>
      </meshBasicMaterial>
    </Text>
  );
}

