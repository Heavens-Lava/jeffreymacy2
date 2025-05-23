import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
// import { BsFillPersonLinesFill } from "react-icons/bs"; //unused icon

const SocialLinks = () => {
  // variables
  const links = [
    {
      // LinkedIn Socials
      id: 1,
      child: (
        <>
          LinkedIn <FaLinkedin size={30} />
        </>
      ),
      // href: "https://www.linkedin.com/in/jeffrey-macy-b1b699251",
      href: "https://www.linkedin.com/in/jeffrey-macy-176746146/",
      style: "rounded-tr-md",
    },
    {
      // GitHub Socials
      id: 2,
      child: (
        <>
          GitHub <FaGithub size={30} />
        </>
      ),
      href: "https://github.com/Heavens-Lava",
    },
    {
      // 420
      id: 3,
      child: (
        <>
          Mail <HiOutlineMail size={30} />
        </>
      ),
      href: "mailto:macy.jeffreyj@gmail.com",
      style: "rounded-br-md",
    },
  ];

  //display

  return (
    // from top of screen 35%, fixed(will not move)
    <div className="positionLinks hidden md:flex flex-col top-[35%] left-0 fixed">
      <ul>
        {links.map(({ id, child, href, style }) => (
          // ml-[100px] hides the text and keeps the icon
          <li
            key={id}
            className={
              "socialLink flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500" +
              " " +
              style
            }
          >
            <a
              href={href}
              className="flex justify-between items-center w-full text-white"
            >
              {child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
