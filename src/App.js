import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Home } from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TripList } from "./Pages/TripList";
import { CityDetailes } from "./Pages/CityDetailes";
import NavBar from "./Componants/NavBar";
import TripTrackSignup from "./Pages/SignUp";
import ClientSignup from "./Pages/client";
import CompanySignup from "./Pages/Company";
import CompleteComReg from "./Pages/CompleteComReg";
import Login from "./Pages/Login";
import Footer from "./Componants/Footer";
// import SignUp from "./Pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/listtrips" exact element={<TripList />} />
        <Route path="/City/:id" exact element={<CityDetailes />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/TripTrackSignup" exact element={<TripTrackSignup />} />
        <Route path="/CompanySignup" exact element={<CompanySignup/>} />
        <Route path="/CompleteComReg" exact element={<CompleteComReg/>} /> 
        <Route path="/client" element={<ClientSignup />} />
        {/* <Route path="/register" element={<SignUp />} /> */}
        <Route path="/CompleteComReg" element={<CompleteComReg />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
