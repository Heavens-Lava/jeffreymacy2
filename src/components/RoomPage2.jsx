import React, { useRef } from "react";

const RoomPage2 = () => {
  return (
    // if using RoomPage3, make height 4000px instead of 2000px
    <div className="h-[1700px] w-full  text-black bg-gradient-to-b dark:from-fuchsia-700 dark:to-fuchsia-500  from-primary-pink to-amber-200">
      {/* <div className="section-margin w-full bg-gradient-to-b dark:from-purple-700 dark:to-fuchsia-500 p-4"> */}
      <div className="section-margin w-full bg-gradient-to-b dark:from-fuchsia-700 dark:to-fuchsia-500 p-4">
        <section className="first-section text-primary-dark dark:text-white section md:w-4/12 sm:w-full py-[200px] px-[4%] m-0 h-[1600px] bg-primary-pink dark:bg-pink-600  mr-auto bg-opacity-80 rounded-3xl">
          {/* <section className="first-section section w-1/2 py-[500px] px-[4%] m-0 h-screen bg-primary-pink mr-auto bg-opacity-80 "> */}
          <div className="section-intro-wrapper section-intro-wrapper pink-line relative py-[5%] px-[5%] border-b-2 border-solid dark:border-b-rose-200 border-b-pink-600 pb-80">
            <h1 className="section-title relative dark:text-rose-300 text-rose-500">
              <span className="section-title-text text-4xl font-medium origin-left skew-y-[-25deg] z-10 uppercase block py-3">
                My Mission
              </span>

              <div className="section-title-decoration styleOne dark:bg-rose-200  bg-rose-500 absolute block w-full max-w-[270px] h-16 border-2 border-solid border-rose-500 dark:border-rose-200 skew-y-[-25deg] origin-left"></div>
              <div className="section-title-decoration styleTwo dark:bg-rose-200  bg-rose-500 top-40  absolute block w-full max-w-[270px] h-16 border-2 border-solid border-rose-500 dark:border-rose-200 skew-y-[-25deg] origin-left"></div>
              <div className="section-title-decoration styleThree -top-24 absolute block w-full max-w-[270px] h-16 border-2 border-solid border-rose-500 dark:border-rose-200 skew-y-[25deg] origin-left"></div>
              <div className="section-title-decoration styleThree top-16 absolute block w-full max-w-[270px] h-16 border-2 border-solid border-rose-500 dark:border-rose-200 skew-y-[25deg] origin-left"></div>
            </h1>
            {/* <span className="section-number">01</span> */}
          </div>

          <div className="section-detail-wrapper relative py-[20%] px-[5%]">
            <h3 className="section-heading text-2xl font-bold leading-4 mt-16 py-10 text-rose-500 dark:text-white">
              Landing Page
            </h3>
            <p className="section-text text-lg text-rose-800 dark:text-white">
              The most important and the most first thing a user sees. It should
              have user flow, look attractive but also work effectively to
              getting the user to their destination
            </p>
            <h3 className="section-heading text-2xl font-bold leading-4 mt-16 py-10 text-rose-500 dark:text-white">
              Creative Atmosphere
            </h3>
            <p className="section-text text-lg text-rose-800 dark:text-white">
              I love getting inspiration from seeing other unique web designs
              and styles and applying those libraries to my own websites.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoomPage2;
