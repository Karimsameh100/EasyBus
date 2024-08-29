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
import CompanySignup from "./Pages/CompanySignup.js";
import CompleteComReg from "./Pages/CompleteComReg";
import Login from "./Pages/Login";
import Footer from "./Componants/Footer";
import CompanyManagement from "./Pages/CompanyManagment";
import ReviewForm from "./Pages/CreateReview";
// import DisplayTripsByComp from "./Pages/DisplayTripsByComp.js";
import About from "./Pages/About";
import UserProfile from "./Pages/UserProfile.js";
import AddTrip from "./Pages/addtrip.js";
import SearchResults from "./Pages/SearchPage.js";
import BookingPage from "./Pages/Book.js";
import CompanyLogin from "./Pages/CompanyLogin.js" ;
import DisplayTrips from "./Pages/DisplayTrips.js"


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/listtrips" exact element={<TripList />} />
        <Route path="/CompanyLogin" exact element={<CompanyLogin />} />
        <Route path="/DisplayTrips" exact element={<DisplayTrips />} />
        <Route path="/City/:id" exact element={<CityDetailes />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/TripTrackSignup" exact element={<TripTrackSignup />} />
        <Route path="/CompanySignup" exact element={<CompanySignup />} />
        <Route path="/CompleteComReg" exact element={<CompleteComReg />} />
        <Route path="/client" element={<ClientSignup />} />
        <Route path="/CompanyManag" element={<CompanyManagement />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/userprofile" exact element={<UserProfile />} />
        {/* <Route path="/register" element={<SignUp />} /> */}
        <Route path="/CompleteComReg" element={<CompleteComReg />} />
        <Route path="/booking/:tripnumber" element={<BookingPage />} />
      
        <Route path="/create/:id" element={<ReviewForm />} />
        <Route path="/edit/:id/:reviewId" element={<ReviewForm />} />
        <Route path="/AddTrip" element={<AddTrip />} />
        <Route path="/search-results" element={<SearchResults/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
