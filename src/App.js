import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import NavBar from "./Componenets/NavBar";
import HeroSection from "./Componenets/HeroSection";
import Footer from "./Componenets/Footer";
import Body from "./Componenets/Body";

function App() {
  return (
    <>
      {/* <div className="App"></div> */}
      <NavBar />
      <HeroSection />
      <Body />
      <Footer />
    </>
  );
}

export default App;
