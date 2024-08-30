
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function CompanyLogin() {
//     const [loginInputs, setLoginInputs] = useState({ id: "", name: "" });
//     const [loginError, setLoginError] = useState("");
//     const navigate = useNavigate();

//     const handleLoginChange = (e) => {
//         const { name, value } = e.target;
//         setLoginInputs({ ...loginInputs, [name]: value });
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Retrieve registered company data from localStorage
//         const storedData = JSON.parse(localStorage.getItem('registeredCompanies')) || [];

//         // Check if a company matches the entered ID and name
//         const matchedCompany = storedData.find(company =>
//             company.id === Number(loginInputs.id) && company.name.toLowerCase() === loginInputs.name.toLowerCase()
//         );

//         if (matchedCompany) {
//             console.log("Login successful:", matchedCompany);

//             // Save the logged-in company's details
//             localStorage.setItem('loggedInCompany', JSON.stringify(matchedCompany));

//             // Redirect to display trips component
//             navigate('/DisplayTrips');
//         } else {
//             setLoginError("Invalid company ID or name");
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-5 mb-3 text-center">Company Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div className="form-floating mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter your company ID"
//                         name="id"
//                         value={loginInputs.id}
//                         onChange={handleLoginChange}
//                     />
//                     <label>ID</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter your company name"
//                         name="name"
//                         value={loginInputs.name}
//                         onChange={handleLoginChange}
//                     />
//                     <label>Name</label>
//                 </div>
//                 <p className="text-danger">{loginError}</p>
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// }

// export default CompanyLogin;


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../Componants/NavBar'; // Assuming NavBar is imported

function CompanyLogin() {
    const [loginInputs, setLoginInputs] = useState({ id: "", name: "" });
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs({ ...loginInputs, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const storedData = JSON.parse(localStorage.getItem('registeredCompanies')) || [];
        const matchedCompany = storedData.find(company =>
            company.id === Number(loginInputs.id) && company.name.toLowerCase() === loginInputs.name.toLowerCase()
        );

        if (matchedCompany) {
            console.log("Login successful:", matchedCompany);
            localStorage.setItem('loggedInCompany', JSON.stringify(matchedCompany));
            setLoggedIn(true);  // Update the logged-in state
            navigate('/DisplayTrips');
        } else {
            setLoginError("Invalid company ID or name");
        }
    };

    return (
        <div className="container">
            <NavBar loggedIn={loggedIn} /> {/* Pass loggedIn state to NavBar */}
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
