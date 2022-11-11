import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

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

  // NavBar display
  return (
    <div className="navBarParent flex justify-between items-center w-full h-20 px-4 text-white dark:bg-black fixed z-50 dark:opacity-80">
      <div>
        <h1 className="myNameText text-5xl font-signature ml-2">
          Jeffrey Macy
        </h1>
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
