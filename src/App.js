import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import { Home } from "./Pages/Home";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TripList } from './Pages/TripList';
import { CityDetailes } from './Pages/CityDetailes';
import NavBar from "./Componants/NavBar";

function App() {
  return (
    <BrowserRouter >
    <NavBar />
    <Routes>
      <Route path='/listtrips' exact element={<TripList />}  />
      <Route path='/City/:id'  exact element={<CityDetailes />}  />
      <Route path="/" exact element={<Home />} />


    </Routes>
    </BrowserRouter>
  );
}

export default App;
