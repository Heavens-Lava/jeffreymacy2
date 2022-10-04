import React from "react";


const About = () => {
  return (
    <div
      name="about"
      className="aboutBackground w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="aboutTextSection max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        {/* adds spacing between About text and paragraph text */}
        <div className="pb-8">
          <p className="AboutHeader text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="aboutParagraph1 text-xl mt-20">
          I'm a very constructive and resourceful developer looking for a role
          in IT with the opportunity to work with the latest technologies on
          challenging and diverse projects.
        </p>

        <br />

        <p className="aboutParagraph2 text-xl">
          I'm always exploring and discovering new technologies that I use to
          enhance and create quality work for myself and the people I work for
        </p>
      </div>
    </div>
  );
};

export default About;
