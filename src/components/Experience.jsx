import React, { useRef } from "react";
import html from "../assets/icons/html.png";
import css from "../assets/icons/css.png";
import javascript from "../assets/icons/javascript.png";
import reactImage from "../assets/icons/react.png";
// import nextjs from "../assets/nextjs.png";
// import graphql from "../assets/graphql.png";
import github from "../assets/icons/github.png";
import tailwind from "../assets/icons/tailwind.png";

import { useIntersection } from "react-use";
import gsap from "gsap";

const Experience = () => {
  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
      style: "shadow-orange-500",
    },
    {
      id: 2,
      src: css,
      title: "CSS",
      style: "shadow-blue-500",
    },
    {
      id: 3,
      src: javascript,
      title: "JavaScript",
      style: "shadow-yellow-500",
    },
    {
      id: 4,
      src: reactImage,
      title: "React",
      style: "shadow-blue-600",
    },
    {
      id: 5,
      src: tailwind,
      title: "Tailwind",
      style: "shadow-sky-400",
    },
    {
      id: 6,
      src: github,
      title: "GitHub",
      style: "shadow-gray-400",
    },
  ];

  // ---------------------------------------- text transition effects ----------------------------------------
  // create text transition effects(fade in and out)
  const sectionRef = useRef(null);

  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.9,
  });

  const fadeOut = (element) => {
    gsap.to(element, 1, {
      opacity: 1,
      y: -12,
      ease: "power4.out",
      // for secondary elements, it will take 1.0 seconds for it to appear after initial fade in
      stagger: { amount: 1.0 },
    });
  };
  const fadeIn = (element) => {
    gsap.to(element, 1, { opacity: 0, y: -20, ease: "power4.out" });
  };

  // if intersection is greater than 0.6 (if screen viewport is 60% in view)...
  intersection && intersection.intersectionRatio > 0.6
    ? // only elements with the fadeIn className is going to fade out
      fadeOut(".fadeIn")
    : // else fade in
      fadeIn(".fadeIn");
  //---------------------------------------- end transition effects ----------------------------------------
  return (
    <div
      name="experience"
      className="experienceBackground bg-gradient-to-b from-emerald-600 to-slate-300 dark:from-gray-800 dark:to-black w-full h-screen"
    >
      <div
        ref={sectionRef}
        className="experienceSection max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white"
      >
        <div>
          <p class="fadeIn experienceHeader text-4xl font-bold border-b-4 border-gray-500 first-letter: inline">
            Experience
          </p>
          <p className="fadeIn experienceParagraph py-6">
            These are the technologies I've worked with
          </p>
        </div>

        <div className="experienceGrid w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px12 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`fadeIn shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className="w-20 mx-auto"></img>
              <p className="fadeIn mt-4">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
