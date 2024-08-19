import React from "react";
import HeroSection from "../Componants/HeroSection";
//import NavBar from "../Componants/NavBar";
import Body from "../Componants/Body";
import Footer from "../Componants/Footer";
import Info from "../Componants/Info";
import Payment from "../Componants/Payment";

export function Home() {
  return (
    <>
      <HeroSection />
      <Info />
      <Body />
      <Payment />
    </>
  );
}
