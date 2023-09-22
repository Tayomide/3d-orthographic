import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls} from '@react-three/drei';
import { styled } from 'styled-components';
import { Navbar } from './components/Navbar';
import { useEffect, useRef, useState } from 'react';
// import { useControls } from 'leva';
import * as THREE from "three"
import { SocialLinks } from './components/SocialLinks';
import { BufferGeometry } from './components/BufferGeometry';


const App = () => {
  const [rotation, setRotation] = useState([0, 0, 0])
  const [geometry, setGeometry] = useState(false)
  const [geometry2, setGeometry2] = useState(false)
  const [stl, setStl] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(1)
  const [longestDimension, setLongestDimension] = useState(2)
  const controlsRef = useRef()
  const stlRef = useRef()

  useEffect(() => {
    if(stlRef?.current?.geometry && !stlRef.current.geometry.isBufferGeometry && (geometry || geometry2)){
      const boundingBox = new THREE.Box3().setFromObject(stlRef.current);
      const size = new THREE.Vector3()
      boundingBox.getSize(size)
      const longestDimension = Math.max(size.x, size.y, size.z)

      setScaleFactor(2.5 / longestDimension)
    }
    if(stl){
      // Create a material (e.g., a basic material with a color)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      const tempMesh = new THREE.Mesh(stl, material)

      const boundingBox = new THREE.Box3().setFromObject(tempMesh);
      const size = new THREE.Vector3()
      boundingBox.getSize(size)
      console.log(size, "size")
      setLongestDimension(Math.max(size.x, size.y, size.z))
      console.log("Not the problem dumbass")
    }
  }, [stl, geometry, geometry2])

  useEffect(() => {
    if(controlsRef.current){
      controlsRef.current.reset()
    }
  }, [rotation, stl])

  useEffect(() => {
    if(longestDimension)setScaleFactor(2.5 / longestDimension)
  }, [longestDimension])

  return (
    <Container className='App'>
      <Navbar setRotation={setRotation} setStl={setStl}/>
      <SocialLinks />
      <Canvas>
        {/* Front View */}
        <OrthographicCamera makeDefault={true} position={[0, 0, 3]} zoom={100}/>
        <OrbitControls ref={controlsRef}/>
        {
          stl ? 
          <mesh 
            rotation={rotation}
            ref={stlRef}
            scale={[scaleFactor, scaleFactor, scaleFactor]}
            onUpdate={(e) => {setScaleFactor(2.5 / longestDimension)}}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
          >
            <BufferGeometry stl={stl} />
            <meshBasicMaterial color="#ffffff" />
            <lineSegments onUpdate={e => e.computeLineDistances()}>
              <edgesGeometry args={[stl]} />
              <lineDashedMaterial dashSize={0.05/scaleFactor} gapSize={0.1/scaleFactor} depthTest={false} color="#8c8c8c"/>
            </lineSegments>
            <lineSegments onUpdate={e => e.computeLineDistances()}>
              <edgesGeometry args={[stl]} />
              <lineBasicMaterial color="#333333" depthTest={true} />
            </lineSegments>
          </mesh> 
        :
          <group 
            rotation={rotation}
            ref={stlRef} 
            scale={[scaleFactor, scaleFactor, scaleFactor]}
          >
            <mesh>
              <boxGeometry args={[2,1,1]}
              onUpdate={(geo) => setGeometry(geo)}/>
              <meshBasicMaterial color="white" />
              {
                geometry && <>
                  <lineSegments onUpdate={(line) => line.computeLineDistances()}>
                    <edgesGeometry args={[geometry]}/>
                    <lineDashedMaterial color="#8c8c8c" dashSize={0.05} gapSize={0.1} depthTest={false}/>
                  </lineSegments>
                  <lineSegments onUpdate={(line) => line.computeLineDistances()}>
                    <edgesGeometry args={[geometry]}/>
                    <lineBasicMaterial color="#333" />
                  </lineSegments>

                </>
              }
            </mesh>
            <mesh rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[1,2,2]} onUpdate={(geo) => setGeometry2(geo)}/>
              <meshBasicMaterial color="white" />
              {
                geometry2 && 
                <>
                  <lineSegments
                    onUpdate={(line) => line.computeLineDistances()}
                  >
                    <edgesGeometry args={[geometry2]}/>
                    <lineDashedMaterial color="#8c8c8c" dashSize={0.1} gapSize={0.2} depthTest={false}/>
                  </lineSegments>
                  <lineSegments 
                    onUpdate={(line) => line.computeLineDistances()}
                  >
                    <edgesGeometry args={[geometry2]}/>
                    <lineBasicMaterial color="#333" />
                  </lineSegments>
                </>
              }
            </mesh>
          </group>
        }
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
  canvas{
    cursor: pointer;
  }
`
