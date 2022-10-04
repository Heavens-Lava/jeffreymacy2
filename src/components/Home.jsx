import React, { useEffect, useState } from "react";
// import HeroImage from "../assets/icons/heroImage.png";
import pic from "../assets/icons/portfolio_pic1080.png";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-scroll";

//import parallax library
import { Parallax } from "react-parallax";

//import images
import background1 from "../assets/backgroundImages/rocks.jpg";
import AnimatedLetters from "./AnimatedLetters/index";

//The Main component of website
const Home = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const nameArray = [
    "J",
    "e",
    "f",
    "f",
    "r",
    "e",
    "y",
    " ",
    "M",
    "a",
    "c",
    "y",
  ];

  //after 3 seconds change state
  useEffect(() => {
    setTimeout(() => {
      return setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  return (
    //this div has background properties only if parallax background is not avaliable
    <div
      name="home"
      className="homeSceneBackground h-screen w-full bg-gradient-to-b from-black via-black to-gray-800"
    >
      <Parallax
        strength={600}
        bgImage={background1}
        name="home"
        className="homeSceneBackground md:h-screen w-full"
      >
        <div className="homeSceneContent max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-0 pl-4 mt-60 md:flex-row z-50 bg-black bg-opacity-70 rounded-2xl">
          <div className="textColumn flex flex-col justify-center h-full ">
            <h2 className="titleText text-4xl sm:text-8xl font-bold text-white">
              <span className={letterClass}>H</span>
              <span className={`${letterClass} _12`}>i,</span>{" "}
              <span className={`${letterClass} _13`}>I</span>
              <span className={`${letterClass} _14`}>'m</span>
              <br />
              <AnimatedLetters
                letterClass={letterClass}
                strArray={nameArray}
                idx={15}
                className="animate-fadeIn animate-duration-1000 animate-delay-1s animate-fill-backwards"
              />{" "}
            </h2>
            <p className="paragraphText text-gray-400 pt-6 py-2 max-w-md animate-fadeIn animate-slow animate-delay-2s">
              I love to work on web applications
            </p>
            <p className="paragraphText text-gray-400 py-4 max-w-md animate-fadeIn animate-slow animate-delay-3s">
              Get to know about me and what skills I offer
            </p>

            <div>
              {/* button is changed to link */}
              <Link
                to="portfolio"
                smooth
                duration={500}
                className="portfolioButton group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:animate-pulse hover:animate-infinite"
              >
                Portfolio
                {/* added margin left to buttonAnimation instead of the buttonIcon */}
                <span className="buttonAnimation group-hover:rotate-90 duration-300 ml-5">
                  <HiArrowRight size={15} className="buttonIcon" />
                </span>
              </Link>
            </div>
          </div>

          <div>
            <img
              src={pic}
              alt="my profile"
              className="profilePicture rounded-2xl mx-auto w-2/3 md:w-fit animate-tada animate-slow"
            />
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Home;
