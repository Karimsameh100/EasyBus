// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Login1() {
//   // Initialize isLoggedIn from localStorage
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [inputs, setInputs] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ emailErr: "", passwordErr: "" });
//   const [loginError, setLoginError] = useState("");
//   const navigate = useNavigate();

//   const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Function to handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...inputs, [name]: value });

//     // Validate email
//     if (name === "email") {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         emailErr: !emailReg.test(value)
//           ? "Please enter a valid email - ex: xxxx@xxxxx.com"
//           : "",
//       }));
//     }

//     if (name === "password") {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         passwordErr:
//           value.length === 0
//             ? "This field is required"
//             : value.length < 8
//             ? "Please write a valid password (more than 8 characters)"
//             : "",
//       }));
//     }
//   };

//   // Function to handle login
//   const handleLogin = (e) => {
//     e.preventDefault();

//     const registeredCompanies =
//       JSON.parse(localStorage.getItem("registeredCompanies")) || [];
//     const registeredPassengers =
//       JSON.parse(localStorage.getItem("users")) || [];

//     const matchedCompany = registeredCompanies.find(
//       (company) =>
//         company.email === inputs.email && company.password === inputs.password
//     );

//     const matchedPassenger = registeredPassengers.find(
//       (passenger) =>
//         passenger.email === inputs.email &&
//         passenger.password === inputs.password
//     );

//     if (matchedCompany) {
//       localStorage.setItem("loggedInCompany", JSON.stringify(matchedCompany));
//       localStorage.setItem("isLoggedIn", JSON.stringify(true));
//       setIsLoggedIn(true);

//       window.dispatchEvent(new Event("loginStatusChanged"));

//       navigate("/DisplayTrips");
//     } else if (matchedPassenger) {
//       localStorage.setItem(
//         "loggedInPassenger",
//         JSON.stringify(matchedPassenger)
//       );
//       localStorage.setItem("isLoggedIn", JSON.stringify(true));
//       localStorage.setItem("userName", matchedPassenger.name);
//       localStorage.setItem("userEmail", matchedPassenger.email);
//       setIsLoggedIn(true);

//       window.dispatchEvent(new Event("loginStatusChanged"));

//       navigate("/UserProfile");
//     } else {
//       setLoginError("Invalid email or password");
//     }
//   };

//   useEffect(() => {
//     const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
//     if (storedIsLoggedIn) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="text-center my-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-floating mb-3">
//           <input
//             type="email"
//             className={`form-control ${errors.emailErr && "border-danger"}`}
//             name="email"
//             value={inputs.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email"
//           />
//           <label>Email Address</label>
//           <p className="text-danger">{errors.emailErr}</p>
//         </div>
//         <div className="form-floating mb-3">
//           <input
//             type="password"
//             className={`form-control ${errors.passwordErr && "border-danger"}`}
//             name="password"
//             value={inputs.password}
//             onChange={handleInputChange}
//             placeholder="Enter your password"
//           />
//           <label>Password</label>
//           <p className="text-danger">{errors.passwordErr}</p>
//         </div>
//         {loginError && <p className="text-danger">{loginError}</p>}
//         <button
//           disabled={errors.passwordErr || errors.emailErr}
//           type="submit"
//           className="btn btn-dark mt-3"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login1;
/////////////////////////////////////////////////////////////////////check/////
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Login1() {
//   // Initialize isLoggedIn from localStorage
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [inputs, setInputs] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ emailErr: "", passwordErr: "" });
//   const [loginError, setLoginError] = useState("");
//   const navigate = useNavigate();

//   const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Function to handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...inputs, [name]: value });

//     // Validate email
//     if (name === "email") {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         emailErr: !emailReg.test(value)
//           ? "Please enter a valid email - ex: xxxx@xxxxx.com"
//           : "",
//       }));
//     }

//     // Validate password
//     if (name === "password") {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         passwordErr:
//           value.length === 0
//             ? "This field is required"
//             : value.length < 8
//             ? "Please write a valid password (more than 8 characters)"
//             : "",
//       }));
//     }
//   };

//   // Function to handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://127.0.0.1:8000/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: inputs.email,
//           password: inputs.password,
//         }),
//       });

//       const data = await response.json();
//       console.log(data)
//       if (response.ok) {
//         // Assuming the response contains user data and a token
//         if (data.user_type === "company") {
//           localStorage.setItem("loggedInCompany", JSON.stringify(data));
//           localStorage.setItem("isLoggedIn", JSON.stringify(true));
//           if (data.token) {
//             localStorage.setItem("token", data.token); // Save the token if provided
//           }
//           setIsLoggedIn(true);
//           window.dispatchEvent(new Event("loginStatusChanged"));
//           navigate("/DisplayTrips");
//         } else if (data.user_type === "user") {
//           console.log(data)
//           localStorage.setItem("loggedInPassenger", JSON.stringify(data));
//           localStorage.setItem("isLoggedIn", JSON.stringify(true));
//           localStorage.setItem("userName", data.name);
//           localStorage.setItem("userEmail", data.email);
//           if (data.token) {
//             localStorage.setItem("token", data.token); // Save the token if provided
//           }
//           setIsLoggedIn(true);
//           window.dispatchEvent(new Event("loginStatusChanged"));
//           navigate("/UserProfile");
//         }
//       } else {
//         // Handle invalid credentials
//         setLoginError("Invalid email or password");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setLoginError("An error occurred. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
//     if (storedIsLoggedIn) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="text-center my-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-floating mb-3">
//           <input
//             type="email"
//             className={`form-control ${errors.emailErr && "border-danger"}`}
//             name="email"
//             value={inputs.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email"
//           />
//           <label>Email Address</label>
//           <p className="text-danger">{errors.emailErr}</p>
//         </div>
//         <div className="form-floating mb-3">
//           <input
//             type="password"
//             className={`form-control ${errors.passwordErr && "border-danger"}`}
//             name="password"
//             value={inputs.password}
//             onChange={handleInputChange}
//             placeholder="Enter your password"
//           />
//           <label>Password</label>
//           <p className="text-danger">{errors.passwordErr}</p>
//         </div>
//         {loginError && <p className="text-danger">{loginError}</p>}
//         <button
//           disabled={errors.passwordErr || errors.emailErr}
//           type="submit"
//           className="btn btn-dark mt-3"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login1;
/////////////////////////////////////////////////////////login //////////////



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login1() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailErr: "", passwordErr: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes
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

  // Handle login using axios
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email: inputs.email,
        password: inputs.password,
      });

      const data = response.data;
console.log(data)
      if (response.status === 200) {
        if (data.user_type === "company") {
          navigate("/DisplayTrips");
        } else if (data.user_type === "user") {
          navigate("/UserProfile");
        }
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Login</h2>
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
