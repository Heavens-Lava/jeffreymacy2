import React, { useRef } from "react";
import html from "../assets/icons/html.png";
import css from "../assets/icons/css.png";
import javascript from "../assets/icons/javascript.png";
import reactImage from "../assets/icons/react.png";
// import nextjs from "../assets/nextjs.png";
// import graphql from "../assets/graphql.png";
import github from "../assets/icons/github.png";
import tailwind from "../assets/icons/tailwind.png";
import godot from "../assets/icons/godot.png";
import php from "../assets/icons/php.png";
import MySql from "../assets/icons/mysql.png";
import java from "../assets/icons/java.png";
import springboot from "../assets/icons/springboot.png";

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
    {
      id: 7,
      src: godot,
      title: "Godot",
      style: "shadow-sky-600",
    },
    {
      id: 8,
      src: php,
      title: "PHP",
      style: "shadow-gray-500 pt-10",
    },
    {
      id: 9,
      src: MySql,
      title: "MySql",
      style: "shadow-lime-400",
    },
    {
      id: 10,
      src: java,
      title: "Java",
      style: "shadow-orange-400",
    },
    {
      id: 11,
      src: springboot,
      title: "Spring Boot",
      style: "shadow-green-400",
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
    // power describes how powerful the ease in property happens, use power1,power2,power3,power4
    gsap.to(element, 1, { opacity: 0.1, y: -18, ease: "power1.easeIn" });
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
      // name must stay experience for link to work
      name="experience"
      className="experienceBackground shadow-  bg-gradient-to-b mt-80px from-emerald-600 to-slate-300 dark:from-gray-800 dark:to-black w-full h-[200vh] pt-40 pb-72"
    >
      <div
        ref={sectionRef}
        className="experienceSection max-w-screen-lg mx-auto p-4 mt-64 flex flex-col justify-center w-full h-full text-white"
      >
        <div>
          <p class=" experienceHeader text-4xl font-bold border-b-4 border-gray-500 first-letter: inline">
            Experience
          </p>
          <p className=" experienceParagraph py-6">
            Proficient Technical skills
          </p>
        </div>

        <div className="experienceGrid w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px12 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={` shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className="w-24 mx-auto"></img>
              <p className=" mt-4">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
