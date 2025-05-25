// import libraries
import React, {
  useRef,
  useEffect,
  Suspense,
  useState,
  useContext,
} from "react";
import { StyleContext } from "./StyleContext";

import StickyBox from "react-sticky-box";

// import react-three libraries
// import * as THREE from "three";
import { DirectionalLight, DirectionalLightHelper } from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  OrbitControls,
  useHelper,
} from "@react-three/drei";

// import models
import { RoomModel } from "./models/RoomModel";
import { useFrame } from "@react-three/fiber";

// ---------------------------------------- functions ----------------------------------------

const Controls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <OrbitControls
      enablePan={true}
      enableZoom={false}
      enableRotate={true}
      // minPolarAngle={Math.PI * 2}
      maxPolarAngle={Math.PI / 2}
      args={[camera, domElement]}
    />
  );
};

export const SunLight = ({ intensity, color }) => {
  // create ref to use with helper
  const directionLightRef = useRef();
  // create helper for directionalLight
  // useHelper(directionLightRef, DirectionalLightHelper, 1, "red");

  return (
    <directionalLight
      // reference here
      ref={directionLightRef}
      castShadow
      intensity={intensity}
      position={[1, 10, 0]}
      // penumbra={1}
      // shadowMap={[512, 512]}
      scale={5}
      color={color}
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
      shadow-camera-far={50}
      shadow-camera-left={-15}
      shadow-camera-right={15}
      shadow-camera-top={15}
      shadow-camera-bottom={-15}
      // color={[1, 1, 1]}
      // color="#ffffff"
      shadow-bias={-0.001}
      // shadowCameraFov={50}
      shadowCameraNear={0.1}
    />
  );
};

const HTMLContent = ({ textPosition, mobileView }) => {
  // 'offCircle' is day time, toggled to the left, 'onCircle' is night time to the right
  const { style, setStyle } = useContext(StyleContext);
  const [fill, setFill] = useState("white");

  const changeToggleCircle = () => {
    if (style === "offCircle") {
      setStyle("onCircle");
      setFill("white");
    } else {
      setStyle("offCircle");
      setFill("black");
    }
    //this console.log will be one step behind
    // console.log(style);
  };

  return (
    // for html tags inside canvas

    <>
      <Html>
        {/* if mobileView is true, do not render these elements (darkmode toggle) */}
        {!mobileView && (
          <div className="pt-40 toggle-bar fixed flex flex-row justify-center items-center md:-top-[450px] md:-right-[650px]  -right-20 z-50">
            <div className="sun-wrapper flex flex-row justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                fill={fill}
              >
                <path d="M11 5V1h2v4Zm6.65 2.75-1.375-1.375 2.8-2.875 1.4 1.425ZM19 13v-2h4v2Zm-8 10v-4h2v4ZM6.35 7.7 3.5 4.925l1.425-1.4L7.75 6.35Zm12.7 12.8-2.775-2.875 1.35-1.35 2.85 2.75ZM1 13v-2h4v2Zm3.925 7.5-1.4-1.425 2.8-2.8.725.675.725.7ZM12 18q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Zm0-2q1.65 0 2.825-1.175Q16 13.65 16 12q0-1.65-1.175-2.825Q13.65 8 12 8q-1.65 0-2.825 1.175Q8 10.35 8 12q0 1.65 1.175 2.825Q10.35 16 12 16Zm0-4Z" />
              </svg>
            </div>
            <button
              onClick={changeToggleCircle}
              className="toggle-button cursor-pointer relative w-24 h-10 flex justify-center items-center bg-primary-pink dark:bg-white rounded-full mx-16 my-0 border-none shadow-specialShadow"
            >
              {/* circle div */}
              <div className={style}></div>
            </button>
            <div className="moon-wrapper flex flex-row justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                fill={fill}
              >
                <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025.337.025.662.075-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613 1.15-.612 1.875-1.637.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Zm0-2q2.2 0 3.95-1.212 1.75-1.213 2.55-3.163-.5.125-1 .2-.5.075-1 .075-3.075 0-5.238-2.162Q9.1 10.575 9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.162 2.55Q5 9.8 5 12q0 2.9 2.05 4.95Q9.1 19 12 19Zm-.25-6.75Z" />
              </svg>
            </div>
          </div>
        )}
      </Html>

      {/* transform must equal to true in order to change position properly */}
      <Html
        transform
        fullscreen
        position={[textPosition, 0, 0]}
        rotation={[0, 0, 0]}
      >
        <div className="page -z-50 mt-72 w-full h-screen overflow-hidden">
          <div className="page-wrapper relative">
            <section className="hero w-[100vw] h-[100vh]">
              <div className="hero-wrapper relative h-full w-[calc(100%-160px)] m-auto max-w-7xl">
                <div className="hero-main absolute bottom-[168px] left-20">
                  <h1 className="hero-main-title text-4xl font-bold font-Montserrat dark:text-slate-200">
                    Jeffrey Macy
                  </h1>
                  <p className="hero-main-description text-2xl dark:text-slate-400">
                    Coder | Designer
                  </p>
                </div>

                {/* from right and top */}
                <div className="hero-second absolute top-[calc(50%-120px)] right-56 text-xl font-Montserrat uppercase">
                  <p className="hero-second-subheading dark:text-neutral-200">
                    Jeffrey Macy's
                  </p>
                  <p className="hero-second-subheading dark:text-neutral-300">
                    Portfolio
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Html>
    </>
  );
};

// ---------------------------------------- room ----------------------------------------
const Room = () => {
  // sticky component variables
  // initial value is false, which means it is sticky by default, when set to true, component will no longer be sticky
  const [stickyPosition, setStickyPosition] = useState(false);

  const [color, setColor] = useState("white");
  const [intensity, setIntensity] = useState(0.6);
  const { style, setStyle } = useContext(StyleContext);

  const { textPosition, setTextPosition } = useContext(StyleContext);

  // ---------------------------------------- changes properties depending on viewport size

  const { mobileView, setMobileView } = useContext(StyleContext);

  const detectSize = () => {
    // console.log(window.innerWidth);
    // currently backwords
    if (window.innerWidth < 660) {
      setMobileView(true);
    } else if (window.innerWidth > 661) {
      setMobileView(false);
    }
  };

  useEffect(() => {
    // set default settings
    if (window.innerWidth < 660) {
      setMobileView(true);
    }

    // event listens whenever user resizes, runs detectSize function
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [window.innerWidth]);

  //---------------------------------------- sets the dark mode here
  useEffect(() => {
    if (style === "offCircle") {
      setIntensity(0.6);
      setColor("white");
      document.documentElement.classList.remove("dark");
    } else {
      setIntensity(0.2);
      setColor("blue");
      document.documentElement.classList.add("dark");
    }

    // console.log(textPosition);

    // function will be called when user scrolls, retrieves scrollY to the console
    const handleScroll = () => {
      // console.log(window.scrollY);
      {
        setStickyPosition(window.scrollY > 5000);
      }
      // console.log(stickyPosition);
      // console.log(window.scrollY > 5000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [{ stickyPosition }]);

  return (
    // if mobileView is not true, render
    <div className=" w-full h-screen relative bg-gradient-to-b from-slate-300 to-primary-pink dark:from-black dark:to-fuchsia-700 transition-all dark:transition-all">
      {!mobileView ? (
        <StickyBox offsetBottom={0} offsetTop={0} bottom={false}>
          <div className="w-full h-screen absolute">
            <Canvas
              // colorManagement
              // shadowMap
              shadows
              camera={{ position: [0, 50, 120], fov: 16 }}
            >
              {/* displays html elements in canvas */}
              <HTMLContent
                textPosition={textPosition}
                mobileView={mobileView}
              />

              {/* lights, sunlight has helper */}
              <rectAreaLight
                width={5}
                height={1.5}
                intensity={5}
                position={[6.77988, 5.5, 10.5]} //[6.78, 1.18, ]
                // color={"white"}
                lookAt={[0, 0, 0]}
                penumbra={1}
                // this rotation is retrieved by 'fish tank base' rotation
                // rotation={[0, Math.PI / 4, 0]}
                rotation={[-Math.PI / 2, 0, Math.PI / 4]}
              />
              <SunLight intensity={intensity} color={color} />
              <ambientLight
                position={[0, 10, 0]}
                intensity={intensity}
                // color={"black"}
              />
              {/* <pointLight position={[5, 5, 5]} intensity={1} /> */}

              {/* orbit controls */}
              <Controls />

              {/* helpers to view the 3d enviroment */}
              {/* <primitive object={new THREE.AxesHelper(10)} />
      <primitive object={new THREE.GridHelper(50)} /> */}

              {/* add models here */}
              <Suspense fallback={null}>{/* <RoomModel /> */}</Suspense>

              {/* shadows */}
              {/* <ContactShadows blur={2.5} scale={20} far={7} resolution={256} /> */}
            </Canvas>
          </div>
        </StickyBox>
      ) : (
        <div className="w-full h-screen absolute">
          <Canvas
            // colorManagement
            // shadowMap
            shadows
            camera={{ position: [0, 50, 120], fov: 16 }}
          >
            {/* displays html elements in canvas */}
            <HTMLContent textPosition={textPosition} mobileView={mobileView} />

            {/* lights, sunlight has helper */}
            <rectAreaLight
              width={5}
              height={1.5}
              intensity={5}
              position={[6.77988, 5.5, 10.5]} //[6.78, 1.18, ]
              // color={"white"}
              lookAt={[0, 0, 0]}
              penumbra={1}
              // this rotation is retrieved by 'fish tank base' rotation
              // rotation={[0, Math.PI / 4, 0]}
              rotation={[-Math.PI / 2, 0, Math.PI / 4]}
            />
            <SunLight intensity={intensity} color={color} />
            <ambientLight
              position={[0, 10, 0]}
              intensity={intensity}
              // color={"black"}
            />
            {/* <pointLight position={[5, 5, 5]} intensity={1} /> */}

            {/* removed if in mobile view */}
            {/* orbit controls */}
            {/* <Controls /> */}

            {/* helpers to view the 3d enviroment */}
            {/* <primitive object={new THREE.AxesHelper(10)} />
      <primitive object={new THREE.GridHelper(50)} /> */}

            {/* add models here */}
            <Suspense fallback={null}>
              <RoomModel />
            </Suspense>

            {/* shadows */}
            {/* <ContactShadows blur={2.5} scale={20} far={7} resolution={256} /> */}
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default Room;
