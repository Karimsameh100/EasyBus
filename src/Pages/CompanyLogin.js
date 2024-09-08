

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NavBar from "../Componants/NavBar";

function CompanyLogin({ setLoggedIn }) {
    const [loginInputs, setLoginInputs] = useState({ name: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs({ ...loginInputs, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve stored companies from localStorage
        const storedData = JSON.parse(localStorage.getItem('registeredCompanies')) || [];

        // Match the company based on name and password
        const matchedCompany = storedData.find(company =>
            company.name.toLowerCase() === loginInputs.name.toLowerCase() &&
            company.password === loginInputs.password
        );

        if (matchedCompany) {
            console.log("Login successful:", matchedCompany);
            localStorage.setItem('loggedInCompany', JSON.stringify(matchedCompany));
            setLoggedIn(true);  // Update the logged-in state
            navigate('/DisplayTrips');  // Redirect to the trips display page
        } else {
            setLoginError("Invalid company name or password");
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-3 text-center">Company Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your company name"
                        name="name"
                        value={loginInputs.name}
                        onChange={handleLoginChange}
                    />
                    <label>Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your company password"
                        name="password"
                        value={loginInputs.password}
                        onChange={handleLoginChange}
                    />
                    <label>Password</label>
                </div>
                <p className="text-danger">{loginError}</p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default CompanyLogin;
