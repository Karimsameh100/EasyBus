// import React from 'react';
// import React, { useState } from 'react';

// function ClientSignup() {
//     const [userData, setUserData] = useState({
//         Name: "",
//         userEmail: "",
//         userName:"",
//         userpassword: "",
//         confirmUserPassword:""
//     })
    
//     const [errors, setErrors] = useState({
//         nameErr:"",
//         useremailErr: "",
//         userNameErr:"",
//         passwordErr: "",
//         confirmUserPasswordErr:""
//     })
    
//       const submitForm = (e) => {
//         e.preventDefault()
//     }
    
//     const changeUserData = (e) => {
//       console.log(e)
//       if(e.target.name == "Name"){
//         setUserData({
//             ...userData,
//             Name: e.target.value
//         })
//         // console.log(e.target.value)
    
//         setErrors({
//             ...errors,
//             nameErr: e.target.value.length == 0 ?  "This Field is Required" : !/^[a-z]{3,}/.test(e.target.value) && "Please write a valid name"
//         })
//     }else if(e.target.name == "userEmail"){
//           setUserData({
//               ...userData,
//               userEmail: e.target.value
//           })
//           // console.log(e.target.value)
    
//           setErrors({
//               ...errors,
//               useremailErr: e.target.value.length == 0 ?  "This Field is Required" : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value) && "Please write a valid email"
//           })
//         }else if(e.target.name == "userName"){
//             setUserData({
//                 ...userData,
//                 userName: e.target.value
//             })
//             // console.log(e.target.value)
      
//             setErrors({
//                 ...errors,
//                 userNameErr: e.target.value.length == 0 ?  "This Field is Required" : !/^[a-z]{3,}/.test(e.target.value) && "Please write a valid name"
//             })
//       }else if(e.target.Name=="userpassword"){
//           setUserData({
//               ...userData,
//               userpassword: e.target.value
//           })
    
//           setErrors({
//               ...errors,
//               passwordErr: e.target.value.length == 0 ? "This Filed of Password is Required" : !/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(e.target.value) && "Please enter a valid password" 
//           })
//         }else{
//             setUserData({
//               ...userData,
//               confirmUserPassword:e.target.value
//               })
//               setErrors({
//                 ...errors,
//                 confirmUserPasswordErr: e.target.value.length == 0 ? "This Filed of Password is required ": userData.userpassword == e.target.value && "Please enter a matching password"
    
//        }   
    
    
//         )}
    
//     }
    
      
    
//       return (
//         <>
              
//               <form onSubmit={(e) => submitForm(e)} className='container bg-dark text-white'>
              
//               {/* <h2 >Login</h2> */}
    
//               <div className="mb-3 col-6">
//                         <label className="form-label">name</label>
//                         <input type="text" 
//                         className={`form-control ${errors.nameErr && "border-danger"}`}
//                         name="Name"
//                         value={userData.Name}
//                         onChange={(e) => changeUserData(e)} />
    
//                         <p className="text-danger"> {errors.nameErr} </p>
//                     </div>
    
//                     <div className="mb-3 col-6 ">
//                         <label  className="form-label">User Email</label>
//                         {/* className="form-control border-danger"  */}
//                         <input type="email" 
//                         className={`form-control ${errors.useremailErr && "border-danger"}`}
//                         name="userEmail"
//                         value={userData.userEmail}
//                         onChange={(e) => changeUserData(e)}
//                         />
    
//                         <p className="text-danger"> {errors.useremailErr} </p>
//                     </div>
    
    
//                     <div className="mb-3 col-6">
//                         <label className="form-label">userName</label>
//                         <input type="text" 
//                         className={`form-control ${errors.userNameErr && "border-danger"}`}
//                         name="userName"
//                         value={userData.userName}
//                         onChange={(e) => changeUserData(e)} />
    
//                         <p className="text-danger"> {errors.userNameErr} </p>
    
//                     </div>
    
//                     <div className="mb-3 col-6">
//                         <label className="form-label">password</label>
//                         <input type="password" 
//                         className={`form-control ${errors.passwordErr && "border-danger"}`}
//                         name="userpassword"
//                         value={userData.position}
//                         onChange={(e) => changeUserData(e)} />
    
//                         <p className="text-danger"> {errors.passwordErr} </p>
//                     </div>
    
//                     <div className="mb-3 col-6">
//                         <label className="form-label">confirm password</label>
//                         <input type="password" 
//                         className={`form-control ${errors.confirmUserPasswordErr && "border-danger"}`}
//                         name="userpassword"
//                         value={userData.confirmUserPassword}
//                         onChange={(e) => changeUserData(e)} />
    
//                         <p className="text-danger"> {errors.confirmUserPasswordErr} </p>
//                     </div>
    
                    
//                     <button disabled={errors.passwordErr || errors.useremailErr} type="submit" className="btn btn-primary">Register</button>
           
//             </form>
//               </>
//       );
// }

// export default ClientSignup;



// /////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function ClientSignup() {
//   const [userData, setUserData] = useState({
//     Name: "",
//     userEmail: "",
//     userName: "",
//     userpassword: "",
//     confirmUserPassword: ""
//   });

//   const [errors, setErrors] = useState({
//     nameErr: "",
//     useremailErr: "",
//     userNameErr: "",
//     passwordErr: "",
//     confirmUserPasswordErr: ""
//   });

//   const submitForm = (e) => {
//     e.preventDefault();
//     // Handle form submission logic
//     // Example: if no errors, navigate to a different page or show a success message
//   };

//   const changeUserData = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value
//     });

//     setErrors({
//       ...errors,
//       [`${name}Err`]: validateField(name, value)
//     });
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case "Name":
//         return value.length === 0 ? "This Field is Required" : !/^[a-zA-Z\s]{3,}$/.test(value) ? "Please write a valid name" : "";
//       case "userEmail":
//         return value.length === 0 ? "This Field is Required" : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? "Please write a valid email" : "";
//       case "userName":
//         return value.length === 0 ? "This Field is Required" : !/^[a-zA-Z0-9]{3,}$/.test(value) ? "Please write a valid username" : "";
//       case "userpassword":
//         return value.length === 0 ? "This Field is Required" : !/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? "Please enter a valid password" : "";
//       case "confirmUserPassword":
//         return value.length === 0 ? "This Field is Required" : value !== userData.userpassword ? "Passwords do not match" : "";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="container  text-black">
//       <Form onSubmit={submitForm}>
//         <Form.Group controlId="Name" className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="Name"
//             value={userData.Name}
//             onChange={changeUserData}
//             isInvalid={!!errors.nameErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.nameErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userEmail" className="mb-3">
//           <Form.Label>User Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="userEmail"
//             value={userData.userEmail}
//             onChange={changeUserData}
//             isInvalid={!!errors.useremailErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.useremailErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userName" className="mb-3">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             name="userName"
//             value={userData.userName}
//             onChange={changeUserData}
//             isInvalid={!!errors.userNameErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.userNameErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userpassword" className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="userpassword"
//             value={userData.userpassword}
//             onChange={changeUserData}
//             isInvalid={!!errors.passwordErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.passwordErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="confirmUserPassword" className="mb-3">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="confirmUserPassword"
//             value={userData.confirmUserPassword}
//             onChange={changeUserData}
//             isInvalid={!!errors.confirmUserPasswordErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.confirmUserPasswordErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Button
//           type="submit"
//           variant="primary"
//           disabled={Object.values(errors).some(error => error)}
//         >
//           Register
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default ClientSignup;





///////////////////////////////

// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function ClientSignup() {
//   const [userData, setUserData] = useState({
//     Name: "",
//     userEmail: "",
//     userName: "",
//     userpassword: "",
//     confirmUserPassword: ""
//   });

//   const [errors, setErrors] = useState({
//     nameErr: "",
//     useremailErr: "",
//     userNameErr: "",
//     passwordErr: "",
//     confirmUserPasswordErr: ""
//   });

//   const submitForm = (e) => {
//     e.preventDefault();
//     // Handle form submission logic
//     // Example: if no errors, navigate to a different page or show a success message
//   };

//   const changeUserData = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value
//     });

//     setErrors({
//       ...errors,
//       [`${name}Err`]: validateField(name, value)
//     });
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case "Name":
//         return value.length === 0 ? "This field is required" : !/^[a-zA-Z\s]{3,}$/.test(value) ? "Please enter a valid name" : "";
//       case "userEmail":
//         return value.length === 0 ? "This field is required" : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? "Please enter a valid email address" : "";
//       case "userName":
//         return value.length === 0 ? "This field is required" : !/^[a-zA-Z0-9]{3,}$/.test(value) ? "Please enter a valid username" : "";
//       case "userpassword":
//         return value.length === 0 ? "This field is required" : !/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? "Password must be at least 8 characters long and include a special character" : "";
//       case "confirmUserPassword":
//         return value.length === 0 ? "This field is required" : value !== userData.userpassword ? "Passwords do not match" : "";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="container text-black">
//       <Form onSubmit={submitForm}>
//         <Form.Group controlId="Name" className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="Name"
//             value={userData.Name}
//             onChange={changeUserData}
//             isInvalid={!!errors.nameErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.nameErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userEmail" className="mb-3">
//           <Form.Label>User Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="userEmail"
//             value={userData.userEmail}
//             onChange={changeUserData}
//             isInvalid={!!errors.useremailErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.useremailErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userName" className="mb-3">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             name="userName"
//             value={userData.userName}
//             onChange={changeUserData}
//             isInvalid={!!errors.userNameErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.userNameErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userpassword" className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="userpassword"
//             value={userData.userpassword}
//             onChange={changeUserData}
//             isInvalid={!!errors.passwordErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.passwordErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="confirmUserPassword" className="mb-3">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="confirmUserPassword"
//             value={userData.confirmUserPassword}
//             onChange={changeUserData}
//             isInvalid={!!errors.confirmUserPasswordErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.confirmUserPasswordErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Button
//           type="submit"
//           variant="primary"
//           disabled={Object.values(errors).some(error => error)}
//         >
//           Register
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default ClientSignup;











////////////////////////////////////


// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function ClientSignup() {
//   const [userData, setUserData] = useState({
//     Name: "",
//     userEmail: "",
//     userName: "",
//     userpassword: "",
//     confirmUserPassword: ""
//   });

//   const [errors, setErrors] = useState({
//     nameErr: "",
//     useremailErr: "",
//     userNameErr: "",
//     passwordErr: "",
//     confirmUserPasswordErr: ""
//   });

//   // Validate all fields when submitting
//   const validateForm = () => {
//     const newErrors = {
//       nameErr: validateField("Name", userData.Name),
//       useremailErr: validateField("userEmail", userData.userEmail),
//       userNameErr: validateField("userName", userData.userName),
//       passwordErr: validateField("userpassword", userData.userpassword),
//       confirmUserPasswordErr: validateField("confirmUserPassword", userData.confirmUserPassword)
//     };

//     setErrors(newErrors);
//     return Object.values(newErrors).every(err => err === "");
//   };

//   const submitForm = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Handle form submission logic
//       console.log("Form data submitted:", userData);
//     }
//   };

//   const changeUserData = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value
//     });

//     // Validate field on change
//     setErrors({
//       ...errors,
//       [`${name}Err`]: validateField(name, value)
//     });
//   };

//   const validateField = (name, value) => {
//     switch (name) {
//       case "Name":
//         return value.length === 0 ? "This field is required" : !/^[a-zA-Z\s]{3,}$/.test(value) ? "Please enter a valid name" : "";
//       case "userEmail":
//         return value.length === 0 ? "This field is required" : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? "Please enter a valid email address" : "";
//       case "userName":
//         return value.length === 0 ? "This field is required" : !/^[a-zA-Z0-9]{3,}$/.test(value) ? "Please enter a valid username" : "";
//       case "userpassword":
//         return value.length === 0 ? "This field is required" : !/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? "Password must be at least 8 characters long and include a special character" : "";
//       case "confirmUserPassword":
//         return value.length === 0 ? "This field is required" : value !== userData.userpassword ? "Passwords do not match" : "";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="container bg-dark text-white">
//       <Form onSubmit={submitForm}>
//         <Form.Group controlId="Name" className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="Name"
//             value={userData.Name}
//             onChange={changeUserData}
//             isInvalid={!!errors.nameErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.nameErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userEmail" className="mb-3">
//           <Form.Label>User Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="userEmail"
//             value={userData.userEmail}
//             onChange={changeUserData}
//             isInvalid={!!errors.useremailErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.useremailErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userName" className="mb-3">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             name="userName"
//             value={userData.userName}
//             onChange={changeUserData}
//             isInvalid={!!errors.userNameErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.userNameErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="userpassword" className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="userpassword"
//             value={userData.userpassword}
//             onChange={changeUserData}
//             isInvalid={!!errors.passwordErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.passwordErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group controlId="confirmUserPassword" className="mb-3">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             name="confirmUserPassword"
//             value={userData.confirmUserPassword}
//             onChange={changeUserData}
//             isInvalid={!!errors.confirmUserPasswordErr}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.confirmUserPasswordErr}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Button
//           type="submit"
//           variant="primary"
//           disabled={Object.values(errors).some(error => error)}
//         >
//           Register
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default ClientSignup;


///////////////////////////////////////////////     good code but have localstorage//////////////

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

// function ClientSignup() {
//     const [userInputs, setUserInputs] = useState({
//         name: "",
//         email: "",
//         userName: "",
//         password: "",
//         Repass: "",
//         userType: "" 
//     });

//     const [errors, setErrors] = useState({
//         nameErr: "",
//         emailErr: "",
//         usernameErr: "",
//         passwordErr: "",
//         RepassErr: "",
//         userTypeErr: "" 
//     });

//     const [showAlert, setShowAlert] = useState(false);
//     const navagite = useNavigate(); 

//     const emailReg = /^[a-z0-9]+@(gmail|yahoo)\.(com|eg)$/;
//     const userNameReg = /^[a-zA-Z_]+$/;
//     const passReg = /^[0-9]{8,}/;

//     const validateField = (name, value) => {
//         switch (name) {
//             case 'name':
             
//             const nameParts = value.trim().split(/\s+/);
            
//             return value.length === 0 ? "Please enter your name" :
//                 nameParts.length !== 2 ? "Please enter both first name and last name separated by a single space" :
//                 !/^[a-zA-Z]+$/.test(nameParts[0]) || !/^[a-zA-Z]+$/.test(nameParts[1]) ? "Names should contain only alphabetic characters" :
//                 "";
//             case 'userName':
//                 return value.length === 0 ? "Please enter your username" :
//                     !userNameReg.test(value) ? "Please enter a valid username" : "";
//             case 'email':
//                 return value.length === 0 ? "Please enter your email" :
//                     !emailReg.test(value) ? "Please enter a valid email" : "";
//             case 'password':
//                 return value.length === 0 ? "Please enter a password" :
//                     !passReg.test(value) ? "Enter a valid password" : "";
//             case 'Repass':
//                 return value.length === 0 ? "Please confirm your password" :
//                     value !== userInputs.password ? "Passwords do not match" : "";
//             case 'userType':
//                 return value.length === 0 ? "Please select a user type" : "";
//             default:
//                 return "";
//         }
//     };

//     const setData = (e) => {
//         const { name, value } = e.target;

//         setUserInputs({
//             ...userInputs,
//             [name]: value
//         });

//         setErrors({
//             ...errors,
//             [`${name}Err`]: validateField(name, value)
//         });
//     };

//     const submitForm = (e) => {
//         e.preventDefault();

      
//         const newErrors = {
//             nameErr: validateField('name', userInputs.name),
//             emailErr: validateField('email', userInputs.email),
//             usernameErr: validateField('userName', userInputs.userName),
//             passwordErr: validateField('password', userInputs.password),
//             RepassErr: validateField('Repass', userInputs.Repass),
//             userTypeErr: validateField('userType', userInputs.userType)
//         };

//         setErrors(newErrors);

//         if (Object.values(newErrors).every(err => err === "")) {
//             localStorage.setItem('userInputs', JSON.stringify(userInputs));

            
//             if (userInputs.userType === 'client') {
//                 navagite('/client');
//             } else if (userInputs.userType === 'freelancer') {
//                 navagite('/client');
//             }
//         } else {
//             setShowAlert(true); 
//         }
//     };

//     return (
//         <div className="container my-5">
            

//             {showAlert && (
//                 <div className="alert alert-danger" role="alert">
//                     Please fill in all required fields correctly before submitting the form.
//                 </div>
//             )}

//             <div className="row">
//                 <form onSubmit={submitForm}>
//                     <div className="form-floating mb-3">
//                         <input
//                             type="text"
//                             className={`form-control ${errors.nameErr ? 'border-danger' : ''}`}
//                             id="floatingInputName"
//                             placeholder="Enter your full name"
//                             name="name"
//                             value={userInputs.name}
//                             onChange={setData}
//                         />
//                         <label htmlFor="floatingInputName">Full Name</label>
//                         <p className="text-danger">{errors.nameErr}</p>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input
//                             type="email"
//                             className={`form-control ${errors.emailErr ? 'border-danger' : ''}`}
//                             id="floatingInputEmail"
//                             placeholder="Enter your email address"
//                             name="email"
//                             value={userInputs.email}
//                             onChange={setData}
//                         />
//                         <label htmlFor="floatingInputEmail">Email Address</label>
//                         <p className="text-danger">{errors.emailErr}</p>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input
//                             type="text"
//                             className={`form-control ${errors.usernameErr ? 'border-danger' : ''}`}
//                             id="floatingInputUsername"
//                             placeholder="Choose a username"
//                             name="userName"
//                             value={userInputs.userName}
//                             onChange={setData}
//                         />
//                         <label htmlFor="floatingInputUsername">Username</label>
//                         <p className="text-danger">{errors.usernameErr}</p>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input
//                             type="password"
//                             className={`form-control ${errors.passwordErr ? 'border-danger' : ''}`}
//                             id="floatingPassword"
//                             placeholder="Create a password"
//                             name="password"
//                             value={userInputs.password}
//                             onChange={setData}
//                         />
//                         <label htmlFor="floatingPassword">Password</label>
//                         <p className="text-danger">{errors.passwordErr}</p>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input
//                             type="password"
//                             className={`form-control ${errors.RepassErr ? 'border-danger' : ''}`}
//                             id="floatingConfirmPassword"
//                             placeholder="Confirm your password"
//                             name="Repass"
//                             value={userInputs.Repass}
//                             onChange={setData}
//                         />
//                         <label htmlFor="floatingConfirmPassword">Confirm Password</label>
//                         <p className="text-danger">{errors.RepassErr}</p>
//                     </div>
//                     <button
//                         type="submit"
//                         className="btn btn-dark"
//                         disabled={
//                             !userInputs.name || !userInputs.userName || !userInputs.email || !userInputs.password || !userInputs.Repass || 
//                             errors.nameErr || errors.usernameErr || errors.emailErr || errors.passwordErr || errors.RepassErr || errors.userTypeErr
//                         }
//                     >
//                         Register Now
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
// export default ClientSignup;




/////////////////////////////////////   another code without localstorage ///////////////////////


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../logo/bus.png"
import 'bootstrap/dist/css/bootstrap.min.css';

function ClientSignup() {
    const [userInputs, setUserInputs] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        Repass: ""
    });

    const [errors, setErrors] = useState({
        nameErr: "",
        emailErr: "",
        phoneErr: "",
        passwordErr: "",
        RepassErr: ""
    });

   
    const navagite = useNavigate();

    const emailReg = /^[a-z0-9]+@(gmail|yahoo)\.(com)$/;
    const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
    const passReg = /^[0-9]{8,}/;

    const validateField = (name, value) => {
        if (name === 'name') {
            const nameParts = value.trim().split(/\s+/);
            if (value.length === 0) {
                return "Please enter both first name and last name separated by a single space";
            } else if (nameParts.length !== 2) {
                return "Please enter both first name and last name separated by a single space";
            } else if (!/^[a-zA-Z]{3,}/.test(nameParts[0]) || !/^[a-zA-Z]{3,}/.test(nameParts[1])) {
                return "First name and last name must be at least 3 characters long";
            }
        
        }else if (name === 'phone') {
            if (value.length === 0) {
                return "Please enter your phone number";
            } else if (!phoneReg.test(value)) {
                return "Enter a valid 10-digit phone number";
            }
        }else if (name === 'email') {
            if (value.length === 0) {
                return "Please enter your email";
            } else if (!emailReg.test(value)) {
                return "Enter a valid email (xxxxx@xxxx.com)";
            }
        } else if (name === 'password') {
            if (value.length === 0) {
                return "Please enter a password";
            } else if (!passReg.test(value)) {
                return "Enter a valid password";
            }
        } else if (name === 'Repass') {
            if (value.length === 0) {
                return "Please confirm your password";
            } else if (value !== userInputs.password) {
                return "Passwords do not match";
            }
        }
        return ""; 
    };

    const setData = (e) => {
        const { name, value } = e.target;

        setUserInputs({
            ...userInputs,
            [name]: value
        });

        setErrors({
            ...errors,
            [`${name}Err`]: validateField(name, value)
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (userInputs.name  && userInputs.phone && userInputs.email && userInputs.password && userInputs.Repass &&
            !errors.nameErr  && !errors.phoneErr && !errors.emailErr && !errors.passwordErr && !errors.RepassErr ) {

           
            console.log("Form Data Submitted:", userInputs);

            

            navagite('/'); 
        }
    };

    return (
        <div className="container ">
          <div className="row my-5">
            <div className="col md-6">
            <img src={logo} alt="Blue Bus" className="img-fluid" />
            </div>
            
            <div className="col md-6">
            <h2 className="mb-4 text-center">Register as client</h2>
                <form onSubmit={submitForm}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.nameErr ? 'border-danger' : ''}`}
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
                            className={`form-control ${errors.phoneErr ? 'border-danger' : ''}`}
                            id="floatingInputPhone"
                            placeholder="Enter your phone number"
                            name="phone"
                            value={userInputs.phone}
                            onChange={setData}
                        />
                        <label htmlFor="floatingInputPhone">Phone Number</label>
                        <p className="text-danger">{errors.phoneErr}</p>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className={`form-control ${errors.emailErr ? 'border-danger' : ''}`}
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
                            className={`form-control ${errors.passwordErr ? 'border-danger' : ''}`}
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
                            className={`form-control ${errors.RepassErr ? 'border-danger' : ''}`}
                            id="floatingConfirmPassword"
                            placeholder="Confirm your password"
                            name="Repass"
                            value={userInputs.Repass}
                            onChange={setData}
                        />
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        <p className="text-danger">{errors.RepassErr}</p>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-dark mb-3"
                        disabled={
                            !userInputs.name || !userInputs.phone || !userInputs.email || !userInputs.password || !userInputs.Repass || 
                            errors.nameErr || errors.phoneErr || errors.emailErr || errors.passwordErr || errors.RepassErr
                        }
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default ClientSignup;
