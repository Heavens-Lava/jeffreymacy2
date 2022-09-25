import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className="contactBackground w-full h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white"
    >
      <div className="contactSection flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="contactHeader text-4xl font-bold inline border-b-4 border-gray-500">
            Contact
          </p>
          <p className="contactParagraph py-6">
            Submit the form below to get in touch with me
          </p>
        </div>

        <div className="contactFormSection flex justify-center items-center">
          {/* form action is taken from getform.io, requires name attribute in each input */}
          <form
            action="https://getform.io/f/72eb763b-5fa5-42d5-bbda-d93ac9f9b69c"
            method="POST"
            className="contactForm flex flex-col w-full md:w-1/2 animate-fadeInUp animate-delay-1s animate-duration-1000"
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

            <button className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
