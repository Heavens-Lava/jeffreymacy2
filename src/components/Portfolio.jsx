import React, { useState, useEffect } from "react";
import ecommerce from "../assets/portfolio/Capture.PNG";
import createUser from "../assets/portfolio/create-user-preview.PNG";

//import parallax library
import { Parallax } from "react-parallax";

//import images
import background2 from "../assets/backgroundImages/nature2.jpg";

const Portfolio = () => {
  //variables
  const projects = [
    {
      id: 1,
      src: ecommerce,
      href: "https://ecommerce-sanity-stripe-omega-ten.vercel.app/",
      github: "https://github.com/Heavens-Lava/ecommerce_sanity_stripe",
      desc: "Made with Next.js, Sanity DB and Stripe checkout",
      about: "E-commerce website",
    },
    {
      id: 2,
      src: createUser,
      href: "https://springboot-create-user-front.herokuapp.com/",
      github: "https://github.com/Heavens-Lava/create-user-frontend",
      desc: "Made with React.js, Java Springboot APIs and MySQL DB",
      about: "Simple table that fetches user data",
    },
  ];

  const [opacity, setOpacity] = useState({ opacity: ".9" });

  const detectSize = () => {
    console.log(window.innerWidth);
    // currently backwords
    if (window.innerWidth < 660) {
      setOpacity({ opacity: "0" });
    } else if (window.innerWidth > 661) {
      setOpacity({ opacity: ".9" });
    }
  };

  useEffect(() => {
    if (window.innerWidth < 660) {
      setOpacity({ opacity: "0" });
    }

    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [window.innerWidth]);

  // Portfolio display
  return (
    <div
      name="portfolio"
      className="portfolio-background bg-gradient-to-b from-sky-600 to-emerald-600 dark:from-black dark:to-gray-800 w-full text-white  md:h-screen"
    >
      <Parallax
        strength={-600}
        // blur={{ min: -5, max: 15 }}
        bgImage={background2}
        name="home"
        className="homeSceneBackground  h-[150vh] w-full"
        // bgImageStyle={{ opacity: ".9" }}
        bgImageStyle={opacity}
      >
        <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full  mt-32 mb-40 rounded-2xl bg-slate-800 bg-opacity-[0.17] dark:bg-black dark:bg-opacity-30">
          {/* adds padding between between the first section and second section */}
          <div className="pb-8 mt-7">
            <p className="portfolioHeader text-4xl font-bold inline border-b-4 border-gray-500">
              Portfolio Project Page
            </p>
            {/* add top and bottom padding */}
            <p className="portfolioParagraph py-5">
              Check out some of my work right here. I have also built my mobile
              game 'Dave's Adventure' using Godot which you can check out for
              free in the Google Play Store
            </p>
          </div>

          {/* 3 columns 12 padding between, 2 columns on mobile, 0 padding on mobile */}
          <div className="portfolioGrid grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
            {projects.map(({ id, src, href, github, desc, about }) => (
              <div key={id} className="shadow-md shadow-gray-600 rounded-lg">
                <p className="w-1/2 px-0 py-1 m-4 duration-200 hover:scale-105 text-lg font-bold">
                  {about}
                </p>
                <img
                  src={src}
                  alt=""
                  className="rounded-md duration-200 hover:scale-105"
                />
                <div>
                  <a href={href} target="_blank" rel="noreferrer">
                    <button className="w-1/2 px-0 py-1 m-4 duration-200 hover:scale-105 text-cyan-300 dark:text-cyan-400">
                      Website Link
                    </button>
                  </a>
                  <a href={github} target="_blank" rel="noreferrer">
                    <button className="w-1/2 px-3 py-1 m-4 duration-200 hover:scale-105 text-cyan-300 dark:text-cyan-400">
                      Code (my github)
                    </button>
                  </a>
                  <p className="w-1/2 px-1 py-1 m-4 duration-200 hover:scale-105 text-sm">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Portfolio;
