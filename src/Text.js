import React from "react";
import { Text } from "@react-three/drei";

export default function Texts({...props}) {
    return <Text anchorX="center" anchorY="middle" textAlign="left" font="/Inter-Bold.woff" {...props} />
};