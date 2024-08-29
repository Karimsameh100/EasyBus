// // CompanyLogin.js
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function CompanyLogin() {
//     const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
//     const [loginError, setLoginError] = useState("");
//     const navigate = useNavigate();

//     const handleLoginChange = (e) => {
//         const { name, value } = e.target;
//         setLoginInputs({ ...loginInputs, [name]: value });
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Retrieve company data from localStorage
//         const storedData = JSON.parse(localStorage.getItem('userInputs'));

//         // Check if stored data matches login inputs
//         if (storedData && storedData.email === loginInputs.email && storedData.password === loginInputs.password) {
//             console.log("Login successful");

//             // Save logged-in company details (You can add ID or other info here if needed)
//             localStorage.setItem('loggedInCompany', JSON.stringify(storedData));

//             // Redirect to display trips component
//             navigate('/DisplayTrips');
//         } else {
//             setLoginError("Invalid email or password");
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-5 mb-3 text-center">Company Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div className="form-floating mb-3">
//                     <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter your company email"
//                         name="email"
//                         value={loginInputs.email}
//                         onChange={handleLoginChange}
//                     />
//                     <label>Email</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Enter your password"
//                         name="password"
//                         value={loginInputs.password}
//                         onChange={handleLoginChange}
//                     />
//                     <label>Password</label>
//                 </div>
//                 <p className="text-danger">{loginError}</p>
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// }

// export default CompanyLogin;


// CompanyLogin.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CompanyLogin() {
    const [loginInputs, setLoginInputs] = useState({ id: "", name: "" });
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs({ ...loginInputs, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve registered company data from localStorage
        const storedData = JSON.parse(localStorage.getItem('registeredCompanies')) || [];

        // Check if a company matches the entered ID and name
        const matchedCompany = storedData.find(company =>
            company.id === Number(loginInputs.id) && company.name.toLowerCase() === loginInputs.name.toLowerCase()
        );

        if (matchedCompany) {
            console.log("Login successful:", matchedCompany);

            // Save the logged-in company's details
            localStorage.setItem('loggedInCompany', JSON.stringify(matchedCompany));

            // Redirect to display trips component
            navigate('/DisplayTrips');
        } else {
            setLoginError("Invalid company ID or name");
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
                        placeholder="Enter your company ID"
                        name="id"
                        value={loginInputs.id}
                        onChange={handleLoginChange}
                    />
                    <label>ID</label>
                </div>
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
                <p className="text-danger">{loginError}</p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default CompanyLogin;
