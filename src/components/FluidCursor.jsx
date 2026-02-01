/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { easing } from 'maath'
import './FluidCursor.css'

// Simplified lens cursor - distorts what's behind it
function LensCursor() {
  const meshRef = useRef()
  const planeRef = useRef()
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    const { viewport, pointer } = state
    const v = viewport.getCurrentViewport(state.camera, [0, 0, 0])
    
    // Follow pointer smoothly
    const destX = (pointer.x * v.width) / 2
    const destY = (pointer.y * v.height) / 2
    
    easing.damp(meshRef.current.position, 'x', destX, 0.2, delta)
    easing.damp(meshRef.current.position, 'y', destY, 0.2, delta)
    
    // Gentle rotation
    meshRef.current.rotation.z += delta * 0.2
  })

  return (
    <>
      {/* Background plane - this represents the page content */}
      <mesh ref={planeRef} position={[0, 0, -1]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#f8f4f0" />
      </mesh>
      
      {/* Lens mesh */}
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.5, 0.5, 0.05, 64]} />
        <MeshTransmissionMaterial
          background={new THREE.Color('#f8f4f0')}
          backside={false}
          samples={16}
          resolution={1024}
          transmission={1}
          roughness={0}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#d4af37"
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
        />
      </mesh>
    </>
  )
}

const FluidCursor = () => {
  const [isTouch, setIsTouch] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouch(isTouchDevice)
    setMounted(true)
    
    if (!isTouchDevice) {
      console.log('FluidGlass cursor mounted')
    }
  }, [])

  if (isTouch || !mounted) return null

  return (
    <div className="fluid-cursor-container">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 25 }} 
        gl={{ 
          alpha: true, 
          antialias: true,
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={1} />
        <LensCursor />
      </Canvas>
    </div>
  )
}

export default FluidCursor


