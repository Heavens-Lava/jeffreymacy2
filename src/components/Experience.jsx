import React from "react";
import html from "../assets/icons/html.png";
import css from "../assets/icons/css.png";
import javascript from "../assets/icons/javascript.png";
import reactImage from "../assets/icons/react.png";
// import nextjs from "../assets/nextjs.png";
// import graphql from "../assets/graphql.png";
import github from "../assets/icons/github.png";
import tailwind from "../assets/icons/tailwind.png";

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

  return (
    <div
      name="experience"
      className="experienceBackground bg-gradient-to-b from-gray-800 to-black w-full h-screen"
    >
      <div className="experienceSection max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <p class="experienceHeader text-4xl font-bold border-b-4 border-gray-500 first-letter: inline">
            Experience
          </p>
          <p className="experienceParagraph py-6">
            These are the technologies I've worked with
          </p>
        </div>

        <div className="experienceGrid w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px12 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className="w-20 mx-auto"></img>
              <p className="mt-4">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
