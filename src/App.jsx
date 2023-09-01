import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls, Edges } from '@react-three/drei';
import { styled } from 'styled-components';
import { Navbar } from './components/Navbar';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';


const App = () => {
  const [camera, setCamera] = useState("front")
  const [geometry, setGeometry] = useState(false)
  const [geometry2, setGeometry2] = useState(false)
  const controlsRef = useRef()

  useEffect(() => {
    if(controlsRef.current){
      controlsRef.current.reset()
    }
  }, [camera])

  return (
    <Container className='App'>
      <Navbar setCamera={setCamera}/>
      <Canvas>
        {/* Front View */}
        <OrthographicCamera makeDefault={camera === "front"} position={[0, 0, 2]} zoom={100}/>
        {/* Top View */}
        <OrthographicCamera makeDefault={camera === "top"} position={[0, 2, 0]} up={[0, 0, -1]} zoom={100} />
        {/* Right Side View */}
        <OrthographicCamera makeDefault={camera === "rside"} position={[-2, 0, 0]} side={[0, 0 , 1]} zoom={100} />
        {/* Back View */}
        <OrthographicCamera makeDefault={camera === "back"} position={[0, 0, 2]} zoom={100}/>
        {/* Bottom View */}
        <OrthographicCamera makeDefault={camera === "bottom"} position={[-2, 0, 0]} up={[0, 0, 1]} zoom={100} />
        {/* Left Side View */}
        <OrthographicCamera makeDefault={camera === "lside"} position={[-2, 0, 0]} side={[0, 0 , -1]} zoom={100} />
        <OrbitControls ref={controlsRef}/>

        <group>
          <mesh>
            <boxGeometry args={[2,1,1]}
            onUpdate={(geo) => setGeometry(geo)}/>
            <meshBasicMaterial color="white" />
            {
              geometry && 
              <lineSegments onUpdate={(line) => line.computeLineDistances()}>
                <edgesGeometry args={[geometry]}/>
                <lineDashedMaterial color="#333" dashSize={0.05} gapSize={0.1} depthTest={false}/>
              </lineSegments>
            }
            <Edges scale={1} renderOrder={1000}> 
              <meshBasicMaterial transparent color="#333" depthTest={true} />
            </Edges>
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1,2,2]}/>
            <meshBasicMaterial color="white" />
            {
              geometry2 && 
              <lineSegments onUpdate={(line) => line.computeLineDistances()}>
                <edgesGeometry args={[geometry2]}/>
                <lineDashedMaterial color="#333" dashSize={0.1} gapSize={0.2} depthTest={false}/>
              </lineSegments>
            }
            <Edges scale={1} renderOrder={1000}>
              <meshBasicMaterial transparent color="#333" depthTest={true} />
            </Edges>
          </mesh>

        </group>
      </Canvas>
    </Container>
  )
}

export default App

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #e2e2e2;
`
