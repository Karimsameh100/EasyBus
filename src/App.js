


import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
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
import About from "./Pages/About";
import UserProfile from "./Pages/UserProfile.js";
import AddTrip from "./Pages/addtrip.js";
import SearchResults from "./Pages/SearchPage.js";
import FavoritesPage from './Pages/FavoritesPage.js'
import BookingPage from "./Pages/Book.js";
import CompanyLogin from "./Pages/CompanyLogin.js";
import DisplayTrips from "./Pages/DisplayTrips/DisplayTrips.js";
import TripTrackLogin from "./Pages/TripTrackLogin.js";
import Login1 from "./Pages/login1.js";

function App() {
  

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
    if (storedCompany) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInCompany');
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/listtrips" exact element={<TripList />} />
        <Route path="/CompanyLogin" exact element={<CompanyLogin setLoggedIn={setLoggedIn} />} />
        <Route path="/DisplayTrips" exact element={<DisplayTrips />} />
        <Route path="/City/:id"  exact element={<CityDetailes />} />
        {/* <CityDetailes addToFavorites={addToFavorites} /> */}
        <Route path="/favorites"  exact element={<FavoritesPage />} />
        {/* <FavoritesPage favorites={favorites} removeFromFavorites={removeFromFavorites} /> */}
        <Route path="/Login" exact element={<Login />} />
        <Route path="/TripTrackSignup" exact element={<TripTrackSignup />} />
        <Route path="/CompanySignup" exact element={<CompanySignup />} />
        <Route path="/CompleteComReg" exact element={<CompleteComReg />} />
        <Route path="/client" exact element={<ClientSignup />} />
        <Route path="/CompanyManag" exact element={<CompanyManagement />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/userprofile" exact element={<UserProfile />} />
        <Route path="/booking/:tripnumber" exact element={<BookingPage />} />
        <Route path="/create/:id" exact element={<ReviewForm />} />
        <Route path="/edit/:id/:reviewId" exact element={<ReviewForm />} />
        <Route path="/AddTrip" exact element={<AddTrip />} />
        <Route path="/search-results" exact element={<SearchResults />} />
        <Route path="/TripTrackLogin" exact element={<TripTrackLogin/>}/>
        <Route path="/Login1" exact element={<Login1/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
