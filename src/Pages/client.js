// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../logo/triptrack.jpeg";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ClientSignup() {
//   const [userInputs, setUserInputs] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     Repass: "",
//   });

//   const [errors, setErrors] = useState({
//     nameErr: "",
//     emailErr: "",
//     phoneErr: "",
//     passwordErr: "",
//     RepassErr: "",
//   });

//   const navagite = useNavigate();

//   const emailReg = /^[a-z0-9]+@(gmail|yahoo)\.(com)$/;
//   const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
//   const passReg = /^[0-9]{8,}/;

//   const validateField = (name, value) => {
//     if (name === "name") {
//       const nameParts = value.trim().split(/\s+/);
//       if (value.length === 0) {
//         return "Please enter both first name and last name separated by a single space";
//       } else if (nameParts.length !== 2) {
//         return "Please enter both first name and last name separated by a single space";
//       } else if (
//         !/^[a-zA-Z]{3,}/.test(nameParts[0]) ||
//         !/^[a-zA-Z]{3,}/.test(nameParts[1])
//       ) {
//         return "First name and last name must be at least 3 characters long";
//       }
//     } else if (name === "phone") {
//       if (value.length === 0) {
//         return "Please enter your phone number";
//       } else if (!phoneReg.test(value)) {
//         return "Enter a valid 11-digit phone number";
//       }
//     } else if (name === "email") {
//       if (value.length === 0) {
//         return "Please enter your email";
//       } else if (!emailReg.test(value)) {
//         return "Enter a valid email (xxxxx@xxxx.com)";
//       }
//     } else if (name === "password") {
//       if (value.length === 0) {
//         return "Please enter a password";
//       } else if (!passReg.test(value)) {
//         return "Enter a valid password";
//       }
//     } else if (name === "Repass") {
//       if (value.length === 0) {
//         return "Please confirm your password";
//       } else if (value !== userInputs.password) {
//         return "Passwords do not match";
//       }
//     }
//     return "";
//   };

//   const setData = (e) => {
//     const { name, value } = e.target;

//     setUserInputs({
//       ...userInputs,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [`${name}Err`]: validateField(name, value),
//     });
//   };

//   const submitForm = (e) => {
//     e.preventDefault();

//     if (
//       userInputs.name &&
//       userInputs.phone &&
//       userInputs.email &&
//       userInputs.password &&
//       userInputs.Repass &&
//       !errors.nameErr &&
//       !errors.phoneErr &&
//       !errors.emailErr &&
//       !errors.passwordErr &&
//       !errors.RepassErr
//     ) {
//       localStorage.setItem(
//         "userInputs",
//         JSON.stringify({
//           name: userInputs.name,
//           email: userInputs.email,
//           phone: userInputs.phone,
//           password: userInputs.password,
//         })
//       );
//       console.log("Form Data Submitted:", userInputs);

//       navagite("/Login");
//     }
//   };

//   return (
//     <div className="container ">
//       <div className="row my-5">
//         <div className="col md-6">
//           <img src={logo} alt="Blue Bus" className="img-fluid" />
//         </div>

//         <div className="col md-6">
//           <h2 className="mb-4 text-center">Register as client</h2>
//           <form onSubmit={submitForm}>
//             <div className="form-floating mb-3">
//               <input
//                 type="text"
//                 className={`form-control ${
//                   errors.nameErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputName"
//                 placeholder="Enter your full name"
//                 name="name"
//                 value={userInputs.name}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputName">Full Name</label>
//               <p className="text-danger">{errors.nameErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="tel"
//                 className={`form-control ${
//                   errors.phoneErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputPhone"
//                 placeholder="Enter your phone number"
//                 name="phone"
//                 value={userInputs.phone}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputPhone">Phone Number</label>
//               <p className="text-danger">{errors.phoneErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="email"
//                 className={`form-control ${
//                   errors.emailErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputEmail"
//                 placeholder="Enter your email address"
//                 name="email"
//                 value={userInputs.email}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputEmail">Email Address</label>
//               <p className="text-danger">{errors.emailErr}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.passwordErr ? "border-danger" : ""
//                 }`}
//                 id="floatingPassword"
//                 placeholder="Create a password"
//                 name="password"
//                 value={userInputs.password}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingPassword">Password</label>
//               <p className="text-danger">{errors.passwordErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.RepassErr ? "border-danger" : ""
//                 }`}
//                 id="floatingConfirmPassword"
//                 placeholder="Confirm your password"
//                 name="Repass"
//                 value={userInputs.Repass}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingConfirmPassword">Confirm Password</label>
//               <p className="text-danger">{errors.RepassErr}</p>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-dark mb-3"
//               disabled={
//                 !userInputs.name ||
//                 !userInputs.phone ||
//                 !userInputs.email ||
//                 !userInputs.password ||
//                 !userInputs.Repass ||
//                 errors.nameErr ||
//                 errors.phoneErr ||
//                 errors.emailErr ||
//                 errors.passwordErr ||
//                 errors.RepassErr
//               }
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClientSignup;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../logo/triptrack.jpeg";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ClientSignup() {
//   const [userInputs, setUserInputs] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     Repass: "",
//   });

//   const [errors, setErrors] = useState({
//     nameErr: "",
//     emailErr: "",
//     phoneErr: "",
//     passwordErr: "",
//     RepassErr: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     // استرجاع بيانات المستخدم من localStorage عند تحميل المكون
//     const storedData = JSON.parse(localStorage.getItem("userInputs"));
//     if (storedData) {
//       setUserInputs({
//         name: storedData.name || "",
//         email: storedData.email || "",
//         phone: storedData.phone || "",
//         password: storedData.password || "",
//         Repass: storedData.password || "", // تأكد أن حقل التأكيد يحتوي على نفس قيمة كلمة المرور
//       });
//     }
//   }, []);

//   const emailReg = /^[a-z0-9]+@(gmail|yahoo)\.(com)$/;
//   const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
//   const passReg = /^[0-9]{8,}/;

//   const validateField = (name, value) => {
//     if (name === "name") {
//       const nameParts = value.trim().split(/\s+/);
//       if (value.length === 0) {
//         return "Please enter both first name and last name separated by a single space";
//       } else if (nameParts.length !== 2) {
//         return "Please enter both first name and last name separated by a single space";
//       } else if (
//         !/^[a-zA-Z]{3,}/.test(nameParts[0]) ||
//         !/^[a-zA-Z]{3,}/.test(nameParts[1])
//       ) {
//         return "First name and last name must be at least 3 characters long";
//       }
//     } else if (name === "phone") {
//       if (value.length === 0) {
//         return "Please enter your phone number";
//       } else if (!phoneReg.test(value)) {
//         return "Enter a valid 11-digit phone number";
//       }
//     } else if (name === "email") {
//       if (value.length === 0) {
//         return "Please enter your email";
//       } else if (!emailReg.test(value)) {
//         return "Enter a valid email (xxxxx@xxxx.com)";
//       }
//     } else if (name === "password") {
//       if (value.length === 0) {
//         return "Please enter a password";
//       } else if (!passReg.test(value)) {
//         return "Enter a valid password";
//       }
//     } else if (name === "Repass") {
//       if (value.length === 0) {
//         return "Please confirm your password";
//       } else if (value !== userInputs.password) {
//         return "Passwords do not match";
//       }
//     }
//     return "";
//   };

//   const setData = (e) => {
//     const { name, value } = e.target;

//     setUserInputs({
//       ...userInputs,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [`${name}Err`]: validateField(name, value),
//     });
//   };

//   const submitForm = (e) => {
//     e.preventDefault();

//     if (
//       userInputs.name &&
//       userInputs.phone &&
//       userInputs.email &&
//       userInputs.password &&
//       userInputs.Repass &&
//       !errors.nameErr &&
//       !errors.phoneErr &&
//       !errors.emailErr &&
//       !errors.passwordErr &&
//       !errors.RepassErr
//     ) {
//       localStorage.setItem(
//         "userInputs",
//         JSON.stringify({
//           name: userInputs.name,
//           email: userInputs.email,
//           phone: userInputs.phone,
//           password: userInputs.password,
//         })
//       );
//       console.log("Form Data Submitted:", userInputs);

//       navigate("/Login");
//     }
//   };

//   return (
//     <div className="container ">
//       <div className="row my-5">
//         <div className="col md-6">
//           <img src={logo} alt="Logo" className="img-fluid" />
//         </div>

//         <div className="col md-6">
//           <h2 className="mb-4 text-center">Edit Profile</h2>
//           <form onSubmit={submitForm}>
//             <div className="form-floating mb-3">
//               <input
//                 type="text"
//                 className={`form-control ${
//                   errors.nameErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputName"
//                 placeholder="Enter your full name"
//                 name="name"
//                 value={userInputs.name}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputName">Full Name</label>
//               <p className="text-danger">{errors.nameErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="tel"
//                 className={`form-control ${
//                   errors.phoneErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputPhone"
//                 placeholder="Enter your phone number"
//                 name="phone"
//                 value={userInputs.phone}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputPhone">Phone Number</label>
//               <p className="text-danger">{errors.phoneErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="email"
//                 className={`form-control ${
//                   errors.emailErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputEmail"
//                 placeholder="Enter your email address"
//                 name="email"
//                 value={userInputs.email}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputEmail">Email Address</label>
//               <p className="text-danger">{errors.emailErr}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.passwordErr ? "border-danger" : ""
//                 }`}
//                 id="floatingPassword"
//                 placeholder="Create a password"
//                 name="password"
//                 value={userInputs.password}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingPassword">Password</label>
//               <p className="text-danger">{errors.passwordErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.RepassErr ? "border-danger" : ""
//                 }`}
//                 id="floatingConfirmPassword"
//                 placeholder="Confirm your password"
//                 name="Repass"
//                 value={userInputs.Repass}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingConfirmPassword">Confirm Password</label>
//               <p className="text-danger">{errors.RepassErr}</p>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-dark mb-3"
//               disabled={
//                 !userInputs.name ||
//                 !userInputs.phone ||
//                 !userInputs.email ||
//                 !userInputs.password ||
//                 !userInputs.Repass ||
//                 errors.nameErr ||
//                 errors.phoneErr ||
//                 errors.emailErr ||
//                 errors.passwordErr ||
//                 errors.RepassErr
//               }
//             >
//               Save Changes
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClientSignup;
// ----------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../logo/triptrack.jpeg";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ClientSignup() {
//   const [userInputs, setUserInputs] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     Repass: "",
//   });

//   const [errors, setErrors] = useState({
//     nameErr: "",
//     emailErr: "",
//     phoneErr: "",
//     passwordErr: "",
//     RepassErr: "",
//   });

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentUserIndex, setCurrentUserIndex] = useState(null); // Track the current user's index in the array
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isEditMode && currentUserIndex !== null) {
//       const storedData = JSON.parse(localStorage.getItem("users")) || [];
//       const userData = storedData[currentUserIndex];
//       if (userData) {
//         setUserInputs({
//           name: userData.name || "",
//           email: userData.email || "",
//           phone: userData.phone || "",
//           password: userData.password || "",
//           Repass: userData.password || "",
//         });
//       }
//     }
//   }, [isEditMode, currentUserIndex]);

//   const emailReg = /^[a-z0-9]+@(gmail|yahoo)\.(com)$/;
//   const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
//   const passReg = /^[0-9]{8,}/;

//   const validateField = (name, value) => {
//     if (name === "name") {
//       const nameParts = value.trim().split(/\s+/);
//       if (value.length === 0) {
//         return "Please enter both first name and last name separated by a single space";
//       } else if (nameParts.length !== 2) {
//         return "Please enter both first name and last name separated by a single space";
//       } else if (
//         !/^[a-zA-Z]{3,}/.test(nameParts[0]) ||
//         !/^[a-zA-Z]{3,}/.test(nameParts[1])
//       ) {
//         return "First name and last name must be at least 3 characters long";
//       }
//     } else if (name === "phone") {
//       if (value.length === 0) {
//         return "Please enter your phone number";
//       } else if (!phoneReg.test(value)) {
//         return "Enter a valid 11-digit phone number";
//       }
//     } else if (name === "email") {
//       if (value.length === 0) {
//         return "Please enter your email";
//       } else if (!emailReg.test(value)) {
//         return "Enter a valid email (xxxxx@xxxx.com)";
//       }
//     } else if (name === "password") {
//       if (value.length === 0) {
//         return "Please enter a password";
//       } else if (!passReg.test(value)) {
//         return "Enter a valid password";
//       }
//     } else if (name === "Repass") {
//       if (value.length === 0) {
//         return "Please confirm your password";
//       } else if (value !== userInputs.password) {
//         return "Passwords do not match";
//       }
//     }
//     return "";
//   };

//   const setData = (e) => {
//     const { name, value } = e.target;

//     setUserInputs({
//       ...userInputs,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [`${name}Err`]: validateField(name, value),
//     });
//   };

//   const submitForm = (e) => {
//     e.preventDefault();
//     const { name, phone, email, password, Repass } = userInputs;

//     if (
//       name &&
//       phone &&
//       email &&
//       password &&
//       Repass &&
//       !errors.nameErr &&
//       !errors.phoneErr &&
//       !errors.emailErr &&
//       !errors.passwordErr &&
//       !errors.RepassErr
//     ) {
//       const storedData = JSON.parse(localStorage.getItem("users")) || [];
//       const newUser = { name, email, phone, password };

//       if (isEditMode && currentUserIndex !== null) {
//         storedData[currentUserIndex] = newUser;
//       } else {
//         storedData.push(newUser);
//       }

//       localStorage.setItem("users", JSON.stringify(storedData));
//       console.log("Form Data Submitted:", userInputs);

//       navigate("/Login");
//     }
//   };

//   const handleLogout = () => {
//     setUserInputs({
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//       Repass: "",
//     });
//     setErrors({
//       nameErr: "",
//       emailErr: "",
//       phoneErr: "",
//       passwordErr: "",
//       RepassErr: "",
//     });
//     setIsEditMode(false);
//     setCurrentUserIndex(null);
//     navigate("/Register");
//   };

//   return (
//     <div className="container">
//       <div className="row my-5">
//         <div className="col md-6">
//           <img src={logo} alt="Logo" className="img-fluid" />
//         </div>

//         <div className="col md-6">
//           <h2 className="mb-4 text-center">
//             {isEditMode ? "Edit Profile" : "Register as client"}
//           </h2>
//           <form onSubmit={submitForm}>
//             <div className="form-floating mb-3">
//               <input
//                 type="text"
//                 className={`form-control ${
//                   errors.nameErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputName"
//                 placeholder="Enter your full name"
//                 name="name"
//                 value={userInputs.name}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputName">Full Name</label>
//               <p className="text-danger">{errors.nameErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="tel"
//                 className={`form-control ${
//                   errors.phoneErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputPhone"
//                 placeholder="Enter your phone number"
//                 name="phone"
//                 value={userInputs.phone}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputPhone">Phone Number</label>
//               <p className="text-danger">{errors.phoneErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="email"
//                 className={`form-control ${
//                   errors.emailErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputEmail"
//                 placeholder="Enter your email address"
//                 name="email"
//                 value={userInputs.email}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputEmail">Email Address</label>
//               <p className="text-danger">{errors.emailErr}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.passwordErr ? "border-danger" : ""
//                 }`}
//                 id="floatingPassword"
//                 placeholder="Create a password"
//                 name="password"
//                 value={userInputs.password}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingPassword">Password</label>
//               <p className="text-danger">{errors.passwordErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.RepassErr ? "border-danger" : ""
//                 }`}
//                 id="floatingConfirmPassword"
//                 placeholder="Confirm your password"
//                 name="Repass"
//                 value={userInputs.Repass}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingConfirmPassword">Confirm Password</label>
//               <p className="text-danger">{errors.RepassErr}</p>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-dark mb-3"
//               disabled={
//                 !userInputs.name ||
//                 !userInputs.phone ||
//                 !userInputs.email ||
//                 !userInputs.password ||
//                 !userInputs.Repass ||
//                 errors.nameErr ||
//                 errors.phoneErr ||
//                 errors.emailErr ||
//                 errors.passwordErr ||
//                 errors.RepassErr
//               }
//             >
//               {isEditMode ? "Save Changes" : "Register"}
//             </button>
//           </form>
//           {isEditMode && (
//             <button className="btn btn-secondary" onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClientSignup;
// ------------------------------kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk mina//////////////////
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import logo from "../logo/trip.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

function ClientSignup() {
  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    user_type: "user",
  });

  const [errors, setErrors] = useState({
    nameErr: "",
    emailErr: "",
    phone_numberErr: "",
    passwordErr: "",
    confirm_passwordErr: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  

  const emailReg = /^[a-z0-9]+@(gmail|yahoo)\.(com)$/;
  const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
  const passReg = /^[0-9]{8,}/;

  const validateField = (name, value) => {
    if (name === "name") {
      const nameParts = value.trim().split(/\s+/);
      if (value.length === 0) {
        return "Please enter both first name and last name separated by a single space";
      } else if (nameParts.length !== 2) {
        return "Please enter both first name and last name separated by a single space";
      } else if (
        !/^[a-zA-Z]{3,}/.test(nameParts[0]) ||
        !/^[a-zA-Z]{3,}/.test(nameParts[1])
      ) {
        return "First name and last name must be at least 3 characters long";
      }
    } else if (name === "phone_number") {
      if (value.length === 0) {
        return "Please enter your phone number";
      } else if (!phoneReg.test(value)) {
        return "Enter a valid 11-digit phone number";
      }
    } else if (name === "email") {
      if (value.length === 0) {
        return "Please enter your email";
      } else if (!emailReg.test(value)) {
        return "Enter a valid email (xxxxx@xxxx.com)";
      }
    } else if (name === "password") {
      if (value.length === 0) {
        return "Please enter a password";
      } else if (!passReg.test(value)) {
        return "Enter a valid password";
      }
    } else if (name === "confirm_password") {
      if (value.length === 0) {
        return "Please confirm your password";
      } else if (value !== userInputs.password) {
        return "Passwords do not match";
      }
    }
    return "";
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/register/user/");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          if (location.state && location.state.isEditMode) {
            const { email } = location.state;
            const existingUser = data.find((user) => user.email === email);
            if (existingUser) {
              setUserInputs({
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone_number,
                password: "",
                confirm_password: "",
              });
              setIsEditMode(true);
            }
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.state]);

  const setData = (e) => {
    const { name, value } = e.target;

    setUserInputs({
      ...userInputs,
      [name]: value,
    });

    setErrors({
      ...errors,
      [`${name}Err`]: validateField(name, value),
    });
  };


  const submitForm = async (e) => {
    e.preventDefault();
    
    const { name, phone_number, email, password, confirm_password ,user_type} = userInputs;

    if (
      name &&
      phone_number &&
      email &&
      password &&
      user_type&&
      confirm_password &&
      !errors.nameErr &&
      !errors.phone_numberErr &&
      !errors.emailErr &&
      !errors.passwordErr &&
      !errors.confirm_passwordErr
    ) {
      const newUser = { name, email, phone_number, password,confirm_password,user_type };

      try {
        const response = await fetch("http://127.0.0.1:8000/register/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.status === 201 || response.ok) {
          console.log("User registered successfully");
          navigate("/Login1");
        } else {
          // Attempt to parse the response as JSON
          try {
            const errorData = await response.json();
            console.error("Failed to register user:", errorData);
          } catch (jsonError) {
            // Fallback to log the raw response (probably HTML)
            const errorText = await response.text();
            console.error("Failed to register user (non-JSON response):", errorText);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleLogout = () => {
    confirmAlert({
      title: "Confirm to Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("users");
            navigate("/");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "custom-overlay",
      className: "custom-ui",
    });
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col md-6">
          <img src={logo} alt="Logo" className="img-fluid" />
        </div>

        <div className="col md-6">
          <h2 className="mb-4 text-center">
            {isEditMode ? "Edit Info" : "Register as passanger"}
          </h2>
          <form onSubmit={submitForm}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${
                  errors.nameErr ? "border-danger" : ""
                }`}
                id="floatingInputName"
                placeholder="Enter your full name"
                name="name"
                value={userInputs.name}
                onChange={setData}
              />
              <label htmlFor="floatingInputName">Full Name</label>
              <p className="text-danger">{errors.nameErr}</p>
            </div>
            <div className="form-floating mb-3">
              <input
                type="tel"
                className={`form-control ${
                  errors.phone_numberErr ? "border-danger" : ""
                }`}
                id="floatingInputPhone"
                placeholder="Enter your phone number"
                name="phone_number"
                value={userInputs.phone_number}
                onChange={setData}
              />
              <label htmlFor="floatingInputPhone">Phone Number</label>
              <p className="text-danger">{errors.phone_numberErr}</p>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${
                  errors.emailErr ? "border-danger" : ""
                }`}
                id="floatingInputEmail"
                placeholder="Enter your email address"
                name="email"
                value={userInputs.email}
                onChange={setData}
              />
              <label htmlFor="floatingInputEmail">Email Address</label>
              <p className="text-danger">{errors.emailErr}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${
                  errors.passwordErr ? "border-danger" : ""
                }`}
                id="floatingPassword"
                placeholder="Create a password"
                name="password"
                value={userInputs.password}
                onChange={setData}
              />
              <label htmlFor="floatingPassword">Password</label>
              <p className="text-danger">{errors.passwordErr}</p>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${
                  errors.confirm_passwordErr ? "border-danger" : ""
                }`}
                id="floatingConfirmPassword"
                placeholder="Confirm your password"
                name="confirm_password"
                value={userInputs.confirm_password}
                onChange={setData}
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              <p className="text-danger">{errors.confirm_passwordErr}</p>
            </div>
            <button
              type="submit"
              className="btn btn-dark mb-3"
              disabled={
                !userInputs.name ||
                !userInputs.phone_number ||
                !userInputs.email ||
                !userInputs.password ||
                !userInputs.confirm_password ||
                errors.nameErr ||
                errors.phone_numberErr ||
                errors.emailErr ||
                errors.passwordErr ||
                errors.confirm_passwordErr
              }
            >
              {isEditMode ? "Save Changes" : "Register"}
            </button>
          </form>
          {isEditMode && (
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}    

export default ClientSignup;
////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import logo from "../logo/trip.jpeg";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ClientSignup() {
//   const [userInputs, setUserInputs] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     password: "",
//     confirm_password: "",
//     user_type: "user",
//   });

//   const [errors, setErrors] = useState({
//     nameErr: "",
//     emailErr: "",
//     phone_numberErr: "",
//     passwordErr: "",
//     confirm_passwordErr: "",
//   });

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentUserIndex, setCurrentUserIndex] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const emailReg = /^[a-z0-9]+@(gmail|yahoo)\.(com)$/;
//   const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
//   const passReg = /^[0-9]{8,}/;

//   const validateField = (name, value) => {
//     if (name === "name") {
//       const nameParts = value.trim().split(/\s+/);
//       if (value.length === 0 || nameParts.length !== 2) {
//         return "Please enter both first name and last name separated by a single space";
//       } else if (
//         !/^[a-zA-Z]{3,}/.test(nameParts[0]) ||
//         !/^[a-zA-Z]{3,}/.test(nameParts[1])
//       ) {
//         return "First name and last name must be at least 3 characters long";
//       }
//     } else if (name === "phone_number") {
//       if (value.length === 0) {
//         return "Please enter your phone number";
//       } else if (!phoneReg.test(value)) {
//         return "Enter a valid 11-digit phone number";
//       }
//     } else if (name === "email") {
//       if (value.length === 0) {
//         return "Please enter your email";
//       } else if (!emailReg.test(value)) {
//         return "Enter a valid email (xxxxx@xxxx.com)";
//       }
//     } else if (name === "password") {
//       if (value.length === 0) {
//         return "Please enter a password";
//       } else if (!passReg.test(value)) {
//         return "Enter a valid password";
//       }
//     } else if (name === "confirm_password") {
//       if (value.length === 0) {
//         return "Please confirm your password";
//       } else if (value !== userInputs.password) {
//         return "Passwords do not match";
//       }
//     }
//     return "";
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("http://127.0.0.1:8000/register/user/");
//       if (response.ok) {
//         const data = await response.json();
//         if (location.state && location.state.isEditMode) {
//           const { email } = location.state;
//           const existingUser = data.find((user) => user.email === email);
//           if (existingUser) {
//             setUserInputs({
//               name: existingUser.name,
//               email: existingUser.email,
//               phone_number: existingUser.phone_number,
//               password: "",
//               confirm_password: "",
//             });
//             setIsEditMode(true);
//           }
//         }
//       }
//     };
//     fetchData();
//   }, [location.state]);

//   const setData = (e) => {
//     const { name, value } = e.target;

//     setUserInputs({
//       ...userInputs,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [`${name}Err`]: validateField(name, value),
//     });
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();

//     const { name, phone_number, email, password, confirm_password, user_type } =
//       userInputs;

//     if (
//       name &&
//       phone_number &&
//       email &&
//       password &&
//       user_type &&
//       confirm_password &&
//       !errors.nameErr &&
//       !errors.phone_numberErr &&
//       !errors.emailErr &&
//       !errors.passwordErr &&
//       !errors.confirm_passwordErr
//     ) {
//       const newUser = {
//         name,
//         email,
//         phone_number,
//         password,
//         confirm_password,
//         user_type,
//       };

//       const response = await fetch("http://127.0.0.1:8000/register/user/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       });

//       if (response.ok) {
//         console.log("User registered successfully");
//         navigate("/Login1");
//       }
//       //  else {
//       //   console.error("Failed to register user");
//       // }
//     }
//   };

//   const handleLogout = () => {
//     confirmAlert({
//       title: "Confirm to Logout",
//       message: "Are you sure you want to logout?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             localStorage.removeItem("users");
//             navigate("/");
//           },
//         },
//         {
//           label: "No",
//           onClick: () => {},
//         },
//       ],
//     });
//   };

//   return (
//     <div className="container">
//       <div className="row my-5">
//         <div className="col md-6">
//           <img src={logo} alt="Logo" className="img-fluid" />
//         </div>

//         <div className="col md-6">
//           <h2 className="mb-4 text-center">
//             {isEditMode ? "Edit Info" : "Register as passanger"}
//           </h2>
//           <form onSubmit={submitForm}>
//             <div className="form-floating mb-3">
//               <input
//                 type="text"
//                 className={`form-control ${
//                   errors.nameErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputName"
//                 placeholder="Enter your full name"
//                 name="name"
//                 value={userInputs.name}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputName">Full Name</label>
//               <p className="text-danger">{errors.nameErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="tel"
//                 className={`form-control ${
//                   errors.phone_numberErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputPhone"
//                 placeholder="Enter your phone number"
//                 name="phone_number"
//                 value={userInputs.phone_number}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputPhone">Phone Number</label>
//               <p className="text-danger">{errors.phone_numberErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="email"
//                 className={`form-control ${
//                   errors.emailErr ? "border-danger" : ""
//                 }`}
//                 id="floatingInputEmail"
//                 placeholder="Enter your email address"
//                 name="email"
//                 value={userInputs.email}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingInputEmail">Email Address</label>
//               <p className="text-danger">{errors.emailErr}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.passwordErr ? "border-danger" : ""
//                 }`}
//                 id="floatingPassword"
//                 placeholder="Create a password"
//                 name="password"
//                 value={userInputs.password}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingPassword">Password</label>
//               <p className="text-danger">{errors.passwordErr}</p>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.confirm_passwordErr ? "border-danger" : ""
//                 }`}
//                 id="floatingConfirmPassword"
//                 placeholder="Confirm your password"
//                 name="confirm_password"
//                 value={userInputs.confirm_password}
//                 onChange={setData}
//               />
//               <label htmlFor="floatingConfirmPassword">Confirm Password</label>
//               <p className="text-danger">{errors.confirm_passwordErr}</p>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-dark mb-3"
//               disabled={
//                 !userInputs.name ||
//                 !userInputs.phone_number ||
//                 !userInputs.email ||
//                 !userInputs.password ||
//                 !userInputs.confirm_password ||
//                 errors.nameErr ||
//                 errors.phone_numberErr ||
//                 errors.emailErr ||
//                 errors.passwordErr ||
//                 errors.confirm_passwordErr
//               }
//             >
//               {isEditMode ? "Save Changes" : "Register"}
//             </button>
//           </form>
//           {isEditMode && (
//             <button className="btn btn-secondary" onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClientSignup;
