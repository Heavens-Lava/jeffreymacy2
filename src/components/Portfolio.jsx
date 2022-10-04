import React from "react";
import ecommerce from "../assets/portfolio/Capture.PNG";

//import parallax library
import { Parallax } from "react-parallax";

//import images
import background2 from "../assets/backgroundImages/nature.jpg";

const Portfolio = () => {
  //variables
  const projects = [
    {
      id: 1,
      src: ecommerce,
    },
  ];

  // Portfolio display
  return (
    <div
      name="portfolio"
      className="portfolio-background bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen"
    >
      <Parallax
        strength={-600}
        blur={{ min: -5, max: 15 }}
        bgImage={background2}
        name="home"
        className="homeSceneBackground md:h-screen w-full"
      >
        <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full mt-60">
          {/* adds padding between between the first section and second section */}
          <div className="pb-8">
            <p className="portfolioHeader text-4xl font-bold inline border-b-4 border-gray-500">
              Portfolio
            </p>
            {/* add top and bottom padding */}
            <p className="portfolioParagraph py-6">
              Check out some of my work right here
            </p>
          </div>

          {/* 3 columns 12 padding between, 2 columns on mobile, 0 padding on mobile */}
          <div className="portfolioGrid grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
            {projects.map(({ id, src }) => (
              <div key={1} className="shadow-md shadow-gray-600 rounded-lg">
                <img
                  src={src}
                  alt=""
                  className="rounded-md duration-200 hover:scale-105"
                />
                <div>
                  <a
                    href="https://ecommerce-sanity-stripe-omega-ten.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                      Website
                    </button>
                  </a>
                  <a
                    href="https://github.com/Heavens-Lava/ecommerce_sanity_stripe"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                      Code (my github)
                    </button>
                  </a>
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
