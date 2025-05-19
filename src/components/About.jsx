import React, { useRef } from "react";
// react-use is a library for more hook functions
import { useIntersection } from "react-use";
import gsap from "gsap";

const About = () => {
  // ---------------------------------------- text transition effects ----------------------------------------
  // create text transition effects(fade in and out)
  const sectionRef = useRef(null);

  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });

  const fadeOut = (element) => {
    gsap.to(element, 1, {
      opacity: 1,
      y: -60,
      ease: "power4.out",
      // for secondary elements, it will take 1.0 seconds for it to appear after initial fade in
      stagger: { amount: 1.0 },
    });
  };
  const fadeIn = (element) => {
    gsap.to(element, 1, { opacity: 0, y: -20, ease: "power1.easeIn" });
  };

  // if intersection is greater than 0.6 (if screen viewport is 60% in view)...
  intersection && intersection.intersectionRatio > 0.9
    ? // only elements with the fadeIn className is going to fade out
      fadeOut(".fadeIn")
    : // else fade in
      fadeIn(".fadeIn");
  //---------------------------------------- end transition effects ----------------------------------------

  return (
    <div
      name="about"
      className="aboutBackground mt-20 pt-40 w-full h-[125vh] bg-gradient-to-b from-sky-100 to-blue-700 dark:from-gray-800 dark:to-black text-white"
    >
      <div className="aboutTextSection max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        {/* adds spacing between About text and paragraph text */}
        <div ref={sectionRef} className="pb-8">
          <p className="fadeIn AboutHeader text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="fadeIn aboutParagraph1 text-xl mt-20">
          I'm a very constructive and resourceful developer looking for a role
          in IT with the opportunity to work with the latest technologies on
          challenging and diverse projects.
        </p>

        <br />

        <p className="fadeIn aboutParagraph2 text-xl">
          I'm always exploring and discovering new technologies that I use to
          enhance and create quality work for myself and the people I work for
        </p>
      </div>
    </div>
  );
};

export default About;
