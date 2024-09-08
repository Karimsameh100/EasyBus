
//////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login1() {
  // Initialize isLoggedIn from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
//   => {
//     return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
//   });
  
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailErr: "", passwordErr: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    // Validate email
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailErr: !emailReg.test(value)
          ? "Please enter a valid email - ex: xxxx@xxxxx.com"
          : "",
      }));
    }

    // Validate password
    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordErr:
          value.length === 0
            ? "This field is required"
            : value.length < 8
            ? "Please write a valid password (more than 8 characters)"
            : "",
      }));
    }
  };

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Retrieve stored data for companies and passengers
    const registeredCompanies = JSON.parse(localStorage.getItem('registeredCompanies')) || [];
    const registeredPassengers = JSON.parse(localStorage.getItem('users')) || [];

    // Match email and password for both companies and passengers
    const matchedCompany = registeredCompanies.find(company =>
      company.email === inputs.email && company.password === inputs.password
    );

    const matchedPassenger = registeredPassengers.find(passenger =>
      passenger.email === inputs.email && passenger.password === inputs.password
    );
    

    if (matchedCompany) {
      // Successful company login
      localStorage.setItem('loggedInCompany', JSON.stringify(matchedCompany));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));  // Save login status
      setIsLoggedIn(true);  // Set isLoggedIn state to true
      navigate('/DisplayTrips');  // Redirect to company trips page
    } else if (matchedPassenger) {
      // Successful passenger login
      localStorage.setItem('loggedInPassenger', JSON.stringify(matchedPassenger));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));  // Save login status
      localStorage.setItem("userName", matchedPassenger.name); //---------------------
      localStorage.setItem("userEmail", matchedPassenger.email);
      setIsLoggedIn(true);  // Set isLoggedIn state to true
      navigate('/UserProfile');  // Redirect to passenger profile page
    } else {
      // If no match, display error
      setLoginError("Invalid email or password");
    }
  };

  // Automatically check if user is logged in on page load
  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">Login</h2>
      {/* {isLoggedIn ? (
        <p className="text-success">You are logged in!</p>
      ) : ( */}
        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${errors.emailErr && "border-danger"}`}
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            <label>Email Address</label>
            <p className="text-danger">{errors.emailErr}</p>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${errors.passwordErr && "border-danger"}`}
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            <label>Password</label>
            <p className="text-danger">{errors.passwordErr}</p>
          </div>
          {loginError && <p className="text-danger">{loginError}</p>}
          <button
            disabled={errors.passwordErr || errors.emailErr}
            type="submit"
            className="btn btn-dark mt-3"
          >
            Submit
          </button>
        </form>
      
    </div>
  );
}

export default Login1;
