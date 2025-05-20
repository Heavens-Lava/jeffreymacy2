// import libraries
import React, { useRef, useState, useEffect, useContext } from "react";

import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// import textures
import videoUrl from "../../textures/iceland.mp4";
import { FrontSide } from "three";
import { useFrame } from "@react-three/fiber";

import { StyleContext } from "../StyleContext";

export function RoomModel(props) {
  const group = useRef();
  // this path must be from 'public' folder, glb file in public
  const { nodes, materials, animations } = useGLTF("/models/Room.glb");
  const { actions } = useAnimations(animations, group);

  // set rotationY to default, then we set it to equal the mouse
  const [rotationY, setRotationY] = useState(Math.PI / 4);

  // sets textposition to move along with room
  const { textPosition, setTextPosition } = useContext(StyleContext);
  // moves room
  const [positionX, setPositionX] = useState([0, 0, 10]);
  const [isScrolling, setIsScrolling] = useState(false);

  // current y scroll position
  const [y, setY] = useState(window.scrollY);
  const [movementDirection, setMovementDirection] = useState(1);

  // used to change properties depending on screen viewport size
  const { mobileView, setMobileView } = useContext(StyleContext);
  const [scale, setScale] = useState(1);

  // ---------------------------------------- animations ----------------------------------------
  // plays animation when scene is rendered
  useEffect(() => {
    // console.log(actions);
    actions.FishAction.play(); // plays fish animation

    // console.log(window.scrollY);

    const scrollMovesRoom = () => {
      // can only scroll when room gets into viewport
      if (window.scrollY > 4700) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
        setPositionX([0, 0, 10]);
        // console.log(positionX);
      }

      if (y > window.scrollY) {
        // console.log("scrolling up");
        setMovementDirection(-2.9);
      } else if (y < window.scrollY) {
        // console.log("scrolling down");
        setMovementDirection(2.8);
      }
      setY(window.scrollY);

      // if scrollY goes lower than 3500, reset room to default position
      if (window.scrollY < 5000) {
        setPositionX(0, 0, 10);
      }
    };

    window.addEventListener("scroll", scrollMovesRoom);
    return () => {
      window.removeEventListener("scroll", scrollMovesRoom);
    };
  }, [y]); //end useEffect

  //---------------------------------------- useFrame Start
  // Mouse Animations using useFrame
  useFrame((state, delta) => {
    // console.log(state.mouse.x);
    // sets the models rotation depending on mouse positionX on screen(while in 3d canvas)
    setRotationY(state.mouse.x * 0.2);

    // if no longer scrolling, set to false
    if (y === window.scrollY) {
      setIsScrolling(false);
      // console.log(group.current.position);
    }

    setTextPosition(group.current.position.x);
    // console.log(textPosition);

    if (mobileView === false) {
      setScale(1);

      // move room based off scrollingY
      // console.log(group.current.position);
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x, //current position
        isScrolling //if user is scrolling
          ? group.current.position.x + movementDirection // if scrolling, move the current position in a position direction or negative direction,
          : group.current.position.x, //else do not move(use current position)
        0.1 // time (using interpolation)
      );
    } else if (mobileView === true) {
      setScale(0.5);
    }
  });

  // ---------------------------------------- materials ----------------------------------------
  // material for fish tank
  const aquaMaterial = new THREE.MeshPhysicalMaterial();

  aquaMaterial.roughness = 0;
  aquaMaterial.color.set(0x549dd2);
  // aquaMaterial.color.set(0x279fdd);
  // aquaMaterial.color.set(0xffffff);
  aquaMaterial.ior = 3;
  aquaMaterial.transmission = 1;
  aquaMaterial.opacity = 0.4;
  aquaMaterial.transparent = true;

  // material for screen
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = videoUrl;
    vid.crossOrigin = "Anonymous";
    vid.autoplay = true;
    vid.muted = true;
    vid.loop = true;
    vid.play();

    return vid;
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      // starting rotation
      rotation={[0, rotationY, 0]}
      // starting position
      position={positionX}
      scale={scale}
    >
      <group name="Scene">
        <group
          name="Room001"
          position={[-6.45, -0.7, 12.2]}
          rotation={[0, Math.PI / 4, 0]}
          // rotation={[0, rotationY, 0]}
        >
          <mesh
            name="Cube070_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube070_1.geometry}
            material={materials.Wall}
          />
          <mesh
            name="Cube070_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube070_2.geometry}
            material={materials.Floor}
          />
        </group>
        <group
          name="Room"
          position={[-0.06, 7.5, 2.48]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <mesh
            name="Cube012_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_1.geometry}
            material={materials.Wall}
          />
          <mesh
            name="Cube012_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_2.geometry}
            material={materials.Floor}
          />
          <mesh
            name="Cube012_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_3.geometry}
            material={nodes.Cube012_3.material}
          />
        </group>
        <mesh
          name="TableTop"
          castShadow
          receiveShadow
          geometry={nodes.TableTop.geometry}
          material={materials.Keyboard}
          position={[-6.09, 2.35, 1.46]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="TableTop002"
          castShadow
          receiveShadow
          geometry={nodes.TableTop002.geometry}
          material={materials.Keyboard}
          position={[-7.22, 10.21, 0.33]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="TableBottom"
          castShadow
          receiveShadow
          geometry={nodes.TableBottom.geometry}
          material={materials.TableLeg}
          position={[-8.21, 0.05, 3.58]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <group
          name="TableLegs"
          position={[-8.21, 0.15, 3.58]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <mesh
            name="Cube004_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube004_1.geometry}
            material={materials.TableLeg}
          />
          <mesh
            name="Cube004_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube004_2.geometry}
            material={materials["Table Leg Black"]}
          />
        </group>
        <mesh
          name="Table_Drawer"
          castShadow
          receiveShadow
          geometry={nodes.Table_Drawer.geometry}
          material={materials.Keyboard}
          position={[-7.1, 2.3, 3.03]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Lid"
          castShadow
          receiveShadow
          geometry={nodes.Lid.geometry}
          material={materials["Lid Color"]}
          position={[-6.83, 0.55, 4.17]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="TableTop001"
          castShadow
          receiveShadow
          geometry={nodes.TableTop001.geometry}
          material={materials.Keyboard}
          position={[-7.22, 7.38, 0.33]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Peddle"
          castShadow
          receiveShadow
          geometry={nodes.Peddle.geometry}
          material={nodes.Peddle.material}
          position={[-6.67, 0, 4.32]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Base001"
          castShadow
          receiveShadow
          geometry={nodes.Base001.geometry}
          material={nodes.Base001.material}
          position={[-6.83, 0.21, 4.17]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Base"
          castShadow
          receiveShadow
          geometry={nodes.Base.geometry}
          material={materials.Keyboard}
          position={[-4.07, 0.8, 0.91]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Leaf003"
          castShadow
          receiveShadow
          geometry={nodes.Leaf003.geometry}
          material={materials["Color.002"]}
          position={[-4.9, 2.81, -1.11]}
          rotation={[-Math.PI, -0.55, -Math.PI]}
        />
        <mesh
          name="Leaf006"
          castShadow
          receiveShadow
          geometry={nodes.Leaf006.geometry}
          material={materials["Color.002"]}
          position={[-4.81, 2.53, -1.35]}
          rotation={[-Math.PI, 1.08, -Math.PI]}
        />
        <mesh
          name="Monitor2"
          castShadow
          receiveShadow
          geometry={nodes.Monitor2.geometry}
          material={materials.Base}
          position={[-6.96, 3.71, 0.57]}
          rotation={[0, Math.PI / 4, 0]}
          scale={[1.41, 0.66, -0.04]}
        />
        <mesh
          name="TableTop003"
          castShadow
          receiveShadow
          geometry={nodes.TableTop003.geometry}
          material={materials.Keyboard}
          position={[-6.59, 7.84, 0.3]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube008"
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.42]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube014"
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube017"
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={materials.Key}
          position={[-6.28, 2.57, 2.45]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube020"
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube024"
          castShadow
          receiveShadow
          geometry={nodes.Cube024.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube027"
          castShadow
          receiveShadow
          geometry={nodes.Cube027.geometry}
          material={materials.Key}
          position={[-6.28, 2.57, 2.44]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Leaf"
          castShadow
          receiveShadow
          geometry={nodes.Leaf.geometry}
          material={materials.Color}
          position={[-4.82, 2.74, -1.01]}
          rotation={[-Math.PI, -0.99, -Math.PI]}
        />
        <mesh
          name="Drawer"
          castShadow
          receiveShadow
          geometry={nodes.Drawer.geometry}
          material={materials.Keyboard}
          position={[-4.06, 1.56, 0.92]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Leaf001"
          castShadow
          receiveShadow
          geometry={nodes.Leaf001.geometry}
          material={materials["Color.002"]}
          position={[-4.71, 2.63, -1.15]}
          rotation={[-Math.PI, -1.37, -Math.PI]}
        />
        <mesh
          name="Leaf004"
          castShadow
          receiveShadow
          geometry={nodes.Leaf004.geometry}
          material={materials["Color.002"]}
          position={[-4.66, 2.7, -1.22]}
          rotation={[0, -0.68, 0]}
        />
        <mesh
          name="Leaf002"
          castShadow
          receiveShadow
          geometry={nodes.Leaf002.geometry}
          material={materials["Color.002"]}
          position={[-4.66, 2.64, -1.35]}
          rotation={[0, 1.09, 0]}
        />
        <mesh
          name="Cube031"
          castShadow
          receiveShadow
          geometry={nodes.Cube031.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Leaf007"
          castShadow
          receiveShadow
          geometry={nodes.Leaf007.geometry}
          material={materials["Color.002"]}
          position={[-4.85, 2.73, -1.28]}
          rotation={[0, -0.2, 0]}
        />
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Leaf005"
          castShadow
          receiveShadow
          geometry={nodes.Leaf005.geometry}
          material={materials["Color.002"]}
          position={[-4.8, 2.58, -1.16]}
          rotation={[-Math.PI, 0.2, -Math.PI]}
        />
        <mesh
          name="Cube007"
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube011"
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials.Key}
          position={[-6.23, 2.57, 2.4]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube034"
          castShadow
          receiveShadow
          geometry={nodes.Cube034.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube015"
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials.Key}
          position={[-6.29, 2.57, 2.46]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube038"
          castShadow
          receiveShadow
          geometry={nodes.Cube038.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube018"
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube043"
          castShadow
          receiveShadow
          geometry={nodes.Cube043.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube021"
          castShadow
          receiveShadow
          geometry={nodes.Cube021.geometry}
          material={materials.Key}
          position={[-6.29, 2.57, 2.45]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube046"
          castShadow
          receiveShadow
          geometry={nodes.Cube046.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube050"
          castShadow
          receiveShadow
          geometry={nodes.Cube050.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube054"
          castShadow
          receiveShadow
          geometry={nodes.Cube054.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube057"
          castShadow
          receiveShadow
          geometry={nodes.Cube057.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube061"
          castShadow
          receiveShadow
          geometry={nodes.Cube061.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube025"
          castShadow
          receiveShadow
          geometry={nodes.Cube025.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Monitor_Stand"
          castShadow
          receiveShadow
          geometry={nodes.Monitor_Stand.geometry}
          material={materials.Keyboard}
          position={[-6.99, 2.84, 0.57]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cube013"
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube016"
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube019"
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube022"
          castShadow
          receiveShadow
          geometry={nodes.Cube022.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube026"
          castShadow
          receiveShadow
          geometry={nodes.Cube026.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube030"
          castShadow
          receiveShadow
          geometry={nodes.Cube030.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube033"
          castShadow
          receiveShadow
          geometry={nodes.Cube033.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube037"
          castShadow
          receiveShadow
          geometry={nodes.Cube037.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube040"
          castShadow
          receiveShadow
          geometry={nodes.Cube040.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube045"
          castShadow
          receiveShadow
          geometry={nodes.Cube045.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube049"
          castShadow
          receiveShadow
          geometry={nodes.Cube049.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube052"
          castShadow
          receiveShadow
          geometry={nodes.Cube052.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube056"
          castShadow
          receiveShadow
          geometry={nodes.Cube056.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube060"
          castShadow
          receiveShadow
          geometry={nodes.Cube060.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube063"
          castShadow
          receiveShadow
          geometry={nodes.Cube063.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube067"
          castShadow
          receiveShadow
          geometry={nodes.Cube067.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube070"
          castShadow
          receiveShadow
          geometry={nodes.Cube070.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube075"
          castShadow
          receiveShadow
          geometry={nodes.Cube075.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube079"
          castShadow
          receiveShadow
          geometry={nodes.Cube079.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube082"
          castShadow
          receiveShadow
          geometry={nodes.Cube082.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube086"
          castShadow
          receiveShadow
          geometry={nodes.Cube086.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube089"
          castShadow
          receiveShadow
          geometry={nodes.Cube089.geometry}
          material={materials.Key}
          position={[-6.3, 2.57, 2.46]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube095"
          castShadow
          receiveShadow
          geometry={nodes.Cube095.geometry}
          material={materials.Key}
          position={[-6.3, 2.57, 2.46]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube006"
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials.Key}
          position={[-6.31, 2.57, 2.61]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube023"
          castShadow
          receiveShadow
          geometry={nodes.Cube023.geometry}
          material={materials.Key}
          position={[-5.24, 2.57, 1.54]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube035"
          castShadow
          receiveShadow
          geometry={nodes.Cube035.geometry}
          material={materials.Key}
          position={[-5.35, 2.57, 1.51]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.Key}
          position={[-7.08, 2.57, 3.25]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="WindowFrame"
          castShadow
          receiveShadow
          geometry={nodes.WindowFrame.geometry}
          material={nodes.WindowFrame.material}
          position={[-2.79, 8.01, -5.48]}
          rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        />
        <mesh
          name="Book002"
          castShadow
          receiveShadow
          geometry={nodes.Book002.geometry}
          material={materials["Material.005"]}
          position={[-7.86, 10.36, 1.4]}
          rotation={[0.19, -0.17, 0.04]}
        />
        <mesh
          name="Book005"
          castShadow
          receiveShadow
          geometry={nodes.Book005.geometry}
          material={materials["Material.009"]}
          position={[-6.8, 10.64, 0.35]}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
        />
        <mesh
          name="Cube028"
          castShadow
          receiveShadow
          geometry={nodes.Cube028.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube064"
          castShadow
          receiveShadow
          geometry={nodes.Cube064.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Lamp_Base"
          castShadow
          receiveShadow
          geometry={nodes.Lamp_Base.geometry}
          material={materials["Material.003"]}
          position={[-7.96, 7.44, 1.26]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cube032"
          castShadow
          receiveShadow
          geometry={nodes.Cube032.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube036"
          castShadow
          receiveShadow
          geometry={nodes.Cube036.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube068"
          castShadow
          receiveShadow
          geometry={nodes.Cube068.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Blue_Pen"
          castShadow
          receiveShadow
          geometry={nodes.Blue_Pen.geometry}
          material={materials["Blue Pencil"]}
          position={[-9.01, 2.76, 2.33]}
          rotation={[-1.59, -0.1, -0.7]}
        />
        <mesh
          name="Pink_Pen"
          castShadow
          receiveShadow
          geometry={nodes.Pink_Pen.geometry}
          material={materials["Red Pencil"]}
          position={[-8.91, 2.75, 2.25]}
          rotation={[-1.72, 0.13, -0.74]}
        />
        <mesh
          name="Cube009"
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials["Chair Color"]}
          position={[-3.79, 1.68, 4.89]}
          rotation={[0, -0.36, 0]}
        />
        <mesh
          name="Plant"
          castShadow
          receiveShadow
          geometry={nodes.Plant.geometry}
          material={materials["Material.015"]}
          position={[5.15, 1.86, -0.61]}
          rotation={[-Math.PI, 1.33, -Math.PI]}
        />
        <group
          name="Mailbox_Base"
          position={[-5.4, 2.36, 13.21]}
          rotation={[0, Math.PI / 4, -Math.PI / 2]}
        >
          <mesh
            name="Cylinder010"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010.geometry}
            material={materials["Green Pencil"]}
          />
          <mesh
            name="Cylinder010_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010_1.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cylinder010_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010_2.geometry}
            material={materials["Material.017"]}
          />
        </group>
        <mesh
          name="Mailbox_Hole"
          castShadow
          receiveShadow
          geometry={nodes.Mailbox_Hole.geometry}
          material={nodes.Mailbox_Hole.material}
          position={[-5.4, 2.36, 13.21]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Mailbox_Post"
          castShadow
          receiveShadow
          geometry={nodes.Mailbox_Post.geometry}
          material={materials["Material.018"]}
          position={[-4.57, -0.49, 12.37]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Shorthand"
          castShadow
          receiveShadow
          geometry={nodes.Shorthand.geometry}
          material={nodes.Shorthand.material}
          position={[7.58, 11.56, -0.51]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Base002"
          castShadow
          receiveShadow
          geometry={nodes.Base002.geometry}
          material={materials.Table}
          position={[7.52, 11.56, -0.57]}
          rotation={[0, Math.PI / 4, 1.62]}
        />
        <mesh
          name="TableBottom001"
          castShadow
          receiveShadow
          geometry={nodes.TableBottom001.geometry}
          material={materials.Table}
          position={[-0.32, 0.79, -3.48]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cube073"
          castShadow
          receiveShadow
          geometry={nodes.Cube073.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube039"
          castShadow
          receiveShadow
          geometry={nodes.Cube039.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube076"
          castShadow
          receiveShadow
          geometry={nodes.Cube076.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube044"
          castShadow
          receiveShadow
          geometry={nodes.Cube044.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube080"
          castShadow
          receiveShadow
          geometry={nodes.Cube080.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube048"
          castShadow
          receiveShadow
          geometry={nodes.Cube048.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube084"
          castShadow
          receiveShadow
          geometry={nodes.Cube084.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube051"
          castShadow
          receiveShadow
          geometry={nodes.Cube051.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube087"
          castShadow
          receiveShadow
          geometry={nodes.Cube087.geometry}
          material={materials.Key}
          position={[-6.25, 2.57, 2.42]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube055"
          castShadow
          receiveShadow
          geometry={nodes.Cube055.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube058"
          castShadow
          receiveShadow
          geometry={nodes.Cube058.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube062"
          castShadow
          receiveShadow
          geometry={nodes.Cube062.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube066"
          castShadow
          receiveShadow
          geometry={nodes.Cube066.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube069"
          castShadow
          receiveShadow
          geometry={nodes.Cube069.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube074"
          castShadow
          receiveShadow
          geometry={nodes.Cube074.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube078"
          castShadow
          receiveShadow
          geometry={nodes.Cube078.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube090"
          castShadow
          receiveShadow
          geometry={nodes.Cube090.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube081"
          castShadow
          receiveShadow
          geometry={nodes.Cube081.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube096"
          castShadow
          receiveShadow
          geometry={nodes.Cube096.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube085"
          castShadow
          receiveShadow
          geometry={nodes.Cube085.geometry}
          material={materials.Key}
          position={[-6.24, 2.57, 2.4]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube088"
          castShadow
          receiveShadow
          geometry={nodes.Cube088.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube010"
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials.Key}
          position={[-5.4, 2.58, 1.29]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube092"
          castShadow
          receiveShadow
          geometry={nodes.Cube092.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.Key}
          position={[-6.45, 2.57, 2.62]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube098"
          castShadow
          receiveShadow
          geometry={nodes.Cube098.geometry}
          material={materials.Key}
          position={[-6.26, 2.57, 2.43]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.Key}
          position={[-6.59, 2.58, 2.48]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Cube012"
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials.Key}
          position={[-5.29, 2.57, 1.45]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <group
          name="Vase"
          position={[-4.85, 2.81, -1.19]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <mesh
            name="Cylinder002"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={materials.Dirt}
          />
          <mesh
            name="Cylinder002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002_1.geometry}
            material={materials.Vase}
          />
        </group>
        <mesh
          name="Cube029"
          castShadow
          receiveShadow
          geometry={nodes.Cube029.geometry}
          material={materials.Key}
          position={[-5.6, 2.57, 1.76]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <mesh
          name="Keyboard_Base"
          castShadow
          receiveShadow
          geometry={nodes.Keyboard_Base.geometry}
          material={materials["Keyboard.001"]}
          position={[-5.52, 2.51, 2.03]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Seaweed"
          castShadow
          receiveShadow
          geometry={nodes.Seaweed.geometry}
          material={materials["Material.016"]}
          position={[4.26, 2.85, -1.69]}
          rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        />
        <mesh
          name="Cube002"
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.Key}
          position={[-6.62, 2.59, 2.37]}
          rotation={[0.07, 0.78, -0.05]}
        />
        <group
          name="Trackpad"
          position={[-4.42, 2.58, 1.06]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <mesh
            name="Cube130"
            castShadow
            receiveShadow
            geometry={nodes.Cube130.geometry}
            material={materials.Trackpad}
          />
          <mesh
            name="Cube130_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube130_1.geometry}
            material={materials.Center}
          />
        </group>
        <mesh
          name="Book003"
          castShadow
          receiveShadow
          geometry={nodes.Book003.geometry}
          material={materials["Material.007"]}
          position={[-6.99, 10.63, 0.55]}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
        />
        <mesh
          name="Book"
          castShadow
          receiveShadow
          geometry={nodes.Book.geometry}
          material={materials["Material.010"]}
          position={[-6.65, 10.64, 0.2]}
          rotation={[1.81, 0.23, 0.76]}
        />
        <mesh
          name="Book001"
          castShadow
          receiveShadow
          geometry={nodes.Book001.geometry}
          material={materials["Material.006"]}
          position={[-7.55, 10.3, 1.1]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Fish"
          castShadow
          receiveShadow
          geometry={nodes.Fish.geometry}
          material={materials["Material.023"]}
          position={[8.92, 4.29, 1.63]}
          rotation={[0, 0.65, -Math.PI / 2]}
        />
        <mesh
          name="AquaGlass"
          castShadow
          receiveShadow
          geometry={nodes.AquaGlass.geometry}
          // material={materials["Material.011"]}
          material={aquaMaterial}
          position={[6.78, 1.18, 0.7]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Book004"
          castShadow
          receiveShadow
          geometry={nodes.Book004.geometry}
          material={materials["Material.008"]}
          position={[-6.87, 10.63, 0.42]}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
        />
        <mesh
          name="Lamp_Top"
          castShadow
          receiveShadow
          geometry={nodes.Lamp_Top.geometry}
          material={materials["Material.002"]}
          position={[-7.96, 8.3, 1.26]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Book006"
          castShadow
          receiveShadow
          geometry={nodes.Book006.geometry}
          material={materials["Material.008"]}
          position={[-0.37, 2.34, -2.77]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="Green_Pen"
          castShadow
          receiveShadow
          geometry={nodes.Green_Pen.geometry}
          material={materials["Green Pencil"]}
          position={[-8.81, 2.73, 2.34]}
          rotation={[-1.57, 0.29, -0.73]}
        />
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials["Material.019"]}
          position={[-6.58, -0.49, 8.5]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Pencil_Container"
          castShadow
          receiveShadow
          geometry={nodes.Pencil_Container.geometry}
          material={materials["Material.004"]}
          position={[-8.89, 2.66, 2.45]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials["Material.001"]}
          position={[-3.79, 0.67, 4.9]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Green_Pen001"
          castShadow
          receiveShadow
          geometry={nodes.Green_Pen001.geometry}
          material={materials["Green Pencil"]}
          position={[-0.39, 2.43, -2.73]}
          rotation={[-3.07, 1.02, 1]}
        />
        <mesh
          name="Cube042"
          castShadow
          receiveShadow
          geometry={nodes.Cube042.geometry}
          material={materials["Material.001"]}
          position={[-3.71, 0.24, 4.98]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cube053"
          castShadow
          receiveShadow
          geometry={nodes.Cube053.geometry}
          material={materials["Material.001"]}
          position={[-3.75, 0.24, 4.79]}
          rotation={[-Math.PI, 0.26, -Math.PI]}
        />
        <mesh
          name="Cube041"
          castShadow
          receiveShadow
          geometry={nodes.Cube041.geometry}
          material={materials["Material.001"]}
          position={[-3.71, 0.24, 4.98]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cube065"
          castShadow
          receiveShadow
          geometry={nodes.Cube065.geometry}
          material={materials["Material.001"]}
          position={[-3.9, 0.24, 4.92]}
          rotation={[0, -1.31, 0]}
        />
        <mesh
          name="Fish_Tank_Base"
          castShadow
          receiveShadow
          geometry={nodes.Fish_Tank_Base.geometry}
          material={materials["Material.012"]}
          position={[6.78, 1.18, 0.7]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="rock001"
          castShadow
          receiveShadow
          geometry={nodes.rock001.geometry}
          material={nodes.rock001.material}
          position={[6.84, 2.55, -0.07]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Cube047"
          castShadow
          receiveShadow
          geometry={nodes.Cube047.geometry}
          material={materials["Material.001"]}
          position={[-3.68, 0.24, 4.87]}
          rotation={[-Math.PI, 1.31, -Math.PI]}
        />
        <mesh
          name="rock002"
          castShadow
          receiveShadow
          geometry={nodes.rock002.geometry}
          material={nodes.rock002.material}
          position={[9.05, 2.03, 2.14]}
          rotation={[-1.05, 0.2, 1.62]}
        />
        <mesh
          name="rock005"
          castShadow
          receiveShadow
          geometry={nodes.rock005.geometry}
          material={nodes.rock005.material}
          position={[6.42, 2.07, 1.21]}
          rotation={[-0.19, -1, 3.14]}
        />
        <mesh
          name="rock007"
          castShadow
          receiveShadow
          geometry={nodes.rock007.geometry}
          material={nodes.rock007.material}
          position={[8.41, 1.99, 1.44]}
          rotation={[0, -0.89, -2.86]}
        />
        <mesh
          name="Cube059"
          castShadow
          receiveShadow
          geometry={nodes.Cube059.geometry}
          material={materials["Material.001"]}
          position={[-3.86, 0.24, 4.81]}
          rotation={[-Math.PI, -Math.PI / 4, -Math.PI]}
        />
        <mesh
          name="Cube071"
          castShadow
          receiveShadow
          geometry={nodes.Cube071.geometry}
          material={materials["Material.001"]}
          position={[-3.82, 0.24, 5]}
          rotation={[0, -0.26, 0]}
        />
        <mesh
          name="rock"
          castShadow
          receiveShadow
          geometry={nodes.rock.geometry}
          material={nodes.rock.material}
          position={[5.18, 2.12, 0.38]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="rock003"
          castShadow
          receiveShadow
          geometry={nodes.rock003.geometry}
          material={nodes.rock003.material}
          position={[7.38, 2.03, 1.54]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="rock004"
          castShadow
          receiveShadow
          geometry={nodes.rock004.geometry}
          material={nodes.rock004.material}
          position={[8.2, 2.15, 3.34]}
          rotation={[-1.11, -0.13, 1.45]}
        />
        <mesh
          name="rock006"
          castShadow
          receiveShadow
          geometry={nodes.rock006.geometry}
          material={nodes.rock006.material}
          position={[4.8, 2.26, -1.07]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="rock008"
          castShadow
          receiveShadow
          geometry={nodes.rock008.geometry}
          material={nodes.rock008.material}
          position={[7.5, 2.01, 0.87]}
          rotation={[-1.1, -0.05, 1.62]}
        />
        <mesh
          name="Plant002"
          castShadow
          receiveShadow
          geometry={nodes.Plant002.geometry}
          material={materials["Material.013"]}
          position={[6.02, 1.9, 0.37]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Plane001"
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={nodes.Plane001.material}
          position={[-6.58, -0.49, 8.5]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Longhand"
          castShadow
          receiveShadow
          geometry={nodes.Longhand.geometry}
          material={nodes.Longhand.material}
          position={[7.46, 12.26, -0.5]}
          rotation={[-1.5, -0.03, 0.82]}
        />
        <mesh
          name="Center"
          castShadow
          receiveShadow
          geometry={nodes.Center.geometry}
          material={nodes.Center.material}
          position={[7.52, 11.56, -0.57]}
          rotation={[0, Math.PI / 4, -Math.PI / 2]}
        />
        <mesh
          name="TableTop004"
          castShadow
          receiveShadow
          geometry={nodes.TableTop004.geometry}
          material={materials.Table}
          position={[-0.32, 2.16, -3.48]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="TableLegs001"
          castShadow
          receiveShadow
          geometry={nodes.TableLegs001.geometry}
          material={materials.Table}
          position={[-1.99, 1.08, -3.29]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Plant001"
          castShadow
          receiveShadow
          geometry={nodes.Plant001.geometry}
          material={materials["Material.014"]}
          position={[8.2, 1.77, 1.91]}
          rotation={[Math.PI, -1.44, Math.PI]}
        />
        <group
          name="Coffee"
          position={[0.36, 2.53, -2.44]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <mesh
            name="Cylinder001"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001.geometry}
            material={materials.Cup}
          />
          <mesh
            name="Cylinder001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_1.geometry}
            material={materials.Coffee}
          />
        </group>
        <group
          name="Circle"
          position={[-9.77, 0.78, 11.5]}
          rotation={[0.13, 0.5, 0.31]}
        >
          <mesh
            name="Circle_1"
            castShadow
            receiveShadow
            geometry={nodes.Circle_1.geometry}
            material={materials["Material.021"]}
          />
          <mesh
            name="Circle_2"
            castShadow
            receiveShadow
            geometry={nodes.Circle_2.geometry}
            material={materials["Material.022"]}
          />
        </group>
        <mesh
          name="Plane002"
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials["Material.020"]}
          position={[-9.76, 0.14, 11.64]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          name="Screen2"
          castShadow
          receiveShadow
          geometry={nodes.Screen2.geometry}
          material={materials.screen}
          position={[-6.96, 3.71, 0.57]}
          rotation={[0, Math.PI / 4, -Math.PI]}
          scale={[-1.41, -0.66, -0.04]}
        >
          <meshStandardMaterial emissive={"white"} side={FrontSide}>
            <videoTexture
              attach="map"
              args={[video]}
              //   rotation={(-Math.PI / 2, 0, Math.PI * 1.5)}
            />
            <videoTexture attach="emissiveMap" args={[video]} />
          </meshStandardMaterial>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Room.glb");
