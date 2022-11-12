import React, { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

import { StyleContext } from "./StyleContext";

const NavBar = () => {
  // NavBar constants

  // create nav useState, 'nav' initial state set to false
  const [nav, setNav] = useState(false);
  // create json array 'links', use to display each link
  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "about",
    },
    {
      id: 3,
      link: "portfolio",
    },
    {
      id: 4,
      link: "experience",
    },
    {
      id: 5,
      link: "contact",
    },
  ];

  const { style, setStyle } = useContext(StyleContext);
  const [fill, setFill] = useState("black");

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

  // NavBar display
  return (
    <div className="navBarParent flex justify-between items-center w-full h-20 px-4 text-white dark:bg-black fixed z-50 dark:opacity-80">
      <div>
        <h1 className="myNameText text-2xl sm:text-5xl font-signature ml-2">
          Jeffrey Macy
        </h1>
      </div>

      {/* dark mode toggle button */}
      {/* toggle bar is hidden if viewport gets below 350px */}
      <div className="toggle-bar hidden xs:flex flex-row  z-50">
        {/* this hides the svg if viewport width gets below 640px*/}
        <div className="sun-wrapper flex-row justify-center items-center hidden sm:flex">
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
          className="toggle-button cursor-pointer relative w-24 h-10 flex justify-center items-center bg-sky-300 dark:bg-white rounded-full mx-4 my-0 border-none shadow-specialShadow"
        >
          {/* circle div */}
          <div className={style}></div>
        </button>
        <div className="moon-wrapper flex-row justify-center items-center hidden sm:flex">
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

      {/* #navBarLinks will be hidden by default until it reaches at least medium size screen(mobile is hidden) */}
      <ul className="navBarLinks hidden md:flex">
        {/* create a loop for each item in the 'links' array, then declare item.value(such as link.id) */}
        {/* this  '{links.map((link) => {}' can also work. 'link' can be named anything, then to get values, type link.id, link.link */}
        {links.map(({ id, link }) => (
          <li
            //   for each key, get the 'link' name
            key={id}
            className="firstLink px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
            {/* display link name */}
            {/* Allows link to smooth to part of page with link, imported from react-scroll */}
            <Link to={link} smooth duration={500}>
              {link}
            </Link>
          </li>
        ))}
        {/* end loop */}
      </ul>

      {/* --------------------------------------- for mobile view */}
      {/* #navBarMobileMenuIcon properties for both clicked and unclicked (top right icon in navBar) */}
      {/* is hidden once it reaches medium screen */}
      {/* has a onClick event 'setNav' that sets nav(false) to true or from true to false */}
      <div
        className="navBarMobileMenuIcon cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        // nav initial state is 'false'
        onClick={() => setNav(!nav)}
      >
        {/* if nav is true(clicked state), use FaTimes icon, else(false, default state), FaBars icon */}
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* If nav is true(clicked state) show this menu*/}
      {nav && (
        // Menu for mobile screen
        <ul className="navBarMobileMenuClicked-Background flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {/* same loop as before, use to display a list of links '<li>link</>'  */}
          {links.map(({ id, link }) => (
            <li
              //   for each key, get the 'link' name
              key={id}
              className="navBarMobileMenuClick-Links px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              {/* display link name, Onclick closes menu, then scrolls to selected menu */}
              <Link
                onClick={() => setNav(!nav)}
                to={link}
                smooth
                duration={500}
              >
                {link}
              </Link>
            </li>
            // end loop
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
