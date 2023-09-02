import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls} from '@react-three/drei';
import { styled } from 'styled-components';
import { Navbar } from './components/Navbar';
import { useEffect, useRef, useState } from 'react';
// import { useControls } from 'leva';
import * as THREE from "three"
import { SocialLinks } from './components/SocialLinks';


const App = () => {
  const [rotation, setRotation] = useState([0, 0, 0])
  const [geometry, setGeometry] = useState(false)
  const [geometry2, setGeometry2] = useState(false)
  const [stl, setStl] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(1)
  const [longestDimension, setLongestDimension] = useState(2)
  const [hover, setHover] = useState(false)
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
    if(stlRef?.current?.type === "Mesh" ){
      stlRef.current.children[0].rotation.set(...rotation)
      stlRef.current.children[1].rotation.set(...rotation)
    }
  }, [rotation])

  useEffect(() => {
    console.log(stlRef.current)
    if(stlRef?.current?.type === "Mesh" ){
      const tempGeometry = stl.clone()
      stlRef.current.geometry = null
      stlRef.current.geometry = tempGeometry
      const material = new THREE.MeshBasicMaterial({ color: "white"})
      stlRef.current.material = material
      stlRef.current.children = []
      const edgesGeometry = new THREE.EdgesGeometry(stl)
      const dashMaterial = new THREE.LineDashedMaterial()
      dashMaterial.dashSize = 0.05/scaleFactor
      dashMaterial.gapSize = 0.1/scaleFactor
      dashMaterial.depthTest = false
      dashMaterial.color = new THREE.Color("#8c8c8c")
      const dashSegment = new THREE.LineSegments(edgesGeometry, dashMaterial)
      dashSegment.scale.set(scaleFactor, scaleFactor, scaleFactor)
      dashSegment.computeLineDistances()
      dashSegment.rotation.set(...rotation)
      stlRef.current.children.push(dashSegment)
      const lineMaterial = new THREE.LineBasicMaterial()
      lineMaterial.color = new THREE.Color("#333")
      lineMaterial.depthTest = true
      const lineSegment = new THREE.LineSegments(edgesGeometry, lineMaterial)
      lineSegment.scale.set(scaleFactor, scaleFactor, scaleFactor)
      lineSegment.computeLineDistances()
      lineSegment.rotation.set(...rotation)
      stlRef.current.children.push(lineSegment)
    }
  }, [scaleFactor, stl])

  // const { gap } = useControls({ scaleFactor, gap:0.1/scaleFactor})

  return (
    <Container className='App'>
      <Navbar setRotation={setRotation} setStl={setStl}/>
      <SocialLinks />
      <Canvas className={hover ? 'hover' : ''}>
        {/* Front View */}
        <OrthographicCamera makeDefault={true} position={[0, 0, 2]} zoom={100}/>
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
          </mesh> 
        :
          <group 
            rotation={rotation}
            ref={stlRef} 
            scale={[scaleFactor, scaleFactor, scaleFactor]}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
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
                    onPointerEnter={() => setHover(true)}
                  >
                    <edgesGeometry args={[geometry2]}/>
                    <lineDashedMaterial color="#8c8c8c" dashSize={0.1} gapSize={0.2} depthTest={false}/>
                  </lineSegments>
                  <lineSegments 
                    onUpdate={(line) => line.computeLineDistances()}
                    onPointerEnter={() => setHover(true)}
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
  .hover{
    cursor: pointer;
  }
`
