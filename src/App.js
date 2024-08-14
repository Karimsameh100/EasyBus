<<<<<<< HEAD
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
=======
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TripList } from './Pages/TripList';
import { CityDetailes } from './Pages/CityDetailes';

function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/listtrips' element={<TripList />}  />
      <Route path='/City/:id' element={<CityDetailes />}  />


    </Routes>
    </BrowserRouter>
   
>>>>>>> listTrips
  );
}

export default App;
