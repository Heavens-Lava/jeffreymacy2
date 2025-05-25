import React, { useRef } from "react";
import { useIntersection } from "react-use";
import gsap from "gsap";

const Contact = () => {
  // ---------------------------------------- text transition effects ----------------------------------------
  // create text transition effects(fade in and out)
  const sectionRef = useRef(null);

  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const fadeOut = (element) => {
    gsap.to(element, 1, {
      opacity: 1,
      y: -12,
      ease: "power4.out",
      // for secondary elements, it will take 1.0 seconds for it to appear after initial fade in
      stagger: { amount: 1.0 },
    });
  };

  const fadeIn = (element) => {
    gsap.to(element, 1, { opacity: 0, y: -20, ease: "power4.out" });
  };

  // if intersection is greater than 0.6 (if screen viewport is 60% in view)...
  intersection && intersection.intersectionRatio > 0.2
    ? // only elements with the fadeIn className is going to fade out
      fadeOut(".fadeOut")
    : // else fade in
      fadeIn(".fadeOut");
  //---------------------------------------- end transition effects ----------------------------------------

  return (
    <div
      name="contact"
      // className="contactBackground h-screen w-full bg-gradient-to-b from-red-400 to-lime-200 dark:from-black dark:to-gray-800 p-4 text-white"
      className="contactBackground h-max pb-16 pt-8 w-full bg-gradient-to-b from-amber-200 to-red-400 dark:from-fuchsia-500 dark:via-rose-700 dark:to-gray-800 p-4 text-white"
    >
      <div
        ref={sectionRef}
        className="contactSection flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full"
      >
        <div className="pb-8">
          <p className="fadeIn contactHeader text-4xl font-bold inline border-b-4 border-gray-500">
            Contact
          </p>
          <p className="fadeIn contactParagraph1 py-6">
            Talk with me! If you like my website, send me a Message :D
          </p>
          <p className="fadeIn contactParagraph2 py-1">
            If your a hiring manager you can also get in touch with me at:
            'macy.jeffreyj@gmail.com'. I am also looking for any freelance
            opportunities so you can text me at (602)-619-4553.
          </p>
          <p className="fadeIn contactParagraph3 py-2">
            I do not often answer unknown phone calls so a text message will let
            me know who you are. Thanks for visiting my website!
          </p>
        </div>

        <div className="contactFormSection flex justify-center items-center">
          {/* form action is taken from getform.io, requires name attribute in each input */}
          <form
            // action="https://getform.io/f/72eb763b-5fa5-42d5-bbda-d93ac9f9b69c"
            action="https://getform.io/f/aejlynvb"
            method="POST"
            className="contactForm flex flex-col w-full md:w-1/2"
            // className="contactForm flex flex-col w-full md:w-1/2 animate-fadeInUp animate-delay-1s animate-duration-1000"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="contactFormName p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="contactFormEmail my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="10"
              className="contactFormDetails p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            ></textarea>

            <button className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 dark:from-violet-500 dark:to-fuchsia-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
