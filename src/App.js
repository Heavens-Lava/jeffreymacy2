//import components
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SocialLinks from "./components/SocialLinks";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import InfiniteMarquee from "./components/InfiniteMarquee";

import "./App.scss";
import Room from "./components/Room";
import RoomPage2 from "./components/RoomPage2";

import { StyleContext } from "./components/StyleContext";
import { useState } from "react";

function App() {
  const [style, setStyle] = useState("onCircle");
  const [style2, setStyle2] = useState("onCircle");
  const [textPosition, setTextPosition] = useState([0, 0, 10]);
  const [mobileView, setMobileView] = useState(false);

  return (
    <div>
      <StyleContext.Provider
        value={{
          style,
          setStyle,
          textPosition,
          setTextPosition,
          mobileView,
          setMobileView,
        }}
      >
        <NavBar />
        <Home />
        <About />
        <InfiniteMarquee />
        <Portfolio />
        <Experience />
        <Room />
        <RoomPage2 />
        <Contact />

        <SocialLinks />
      </StyleContext.Provider>
    </div>
  );
}

export default App;
