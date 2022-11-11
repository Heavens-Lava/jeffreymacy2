import React from "react";
import { useState, useContext, useEffect } from "react";
import Marquee from "react-fast-marquee";

import { StyleContext } from "./StyleContext";

const InfiniteMarquee = () => {
  const [gradient, setGradient] = useState([30, 78, 216]);

  const { style, setStyle } = useContext(StyleContext);

  useEffect(() => {
    if (style === "offCircle") {
      setGradient([30, 78, 216]);
    } else {
      setGradient([0, 0, 0]);
    }
  }, [style]);

  return (
    <div className="marquee-background w-full h-1/3 bg-gradient-to-b from-blue-700 to-sky-600 dark:from-black dark:to-gray-800 p-0 text-white">
      {/* max-w-screen-lg */}
      <div className="marquee-section w-full">
        <div className="marquee-container">
          <Marquee
            pauseOnHover={true}
            speed={150}
            direction="left"
            gradient={true}
            // black color gradient

            gradientColor={gradient}
          >
            <div className="marquee-text">Jeffrey Macy</div>
            <div className="marquee-text">
              Passionate and Inventive about coding
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
