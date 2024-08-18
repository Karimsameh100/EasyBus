import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../logo/bus.png"

function CompanySignup() {

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

    const navigate = useNavigate();

    const emailReg = /^([a-z0-9]+)@(gmail|yahoo)\.(com|eg)$/;
    const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
    const passReg = /^[0-9]{8,}/;
    const nameReg = /^[a-zA-Z]{3,}$/;

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

    const validateField = (name, value) => {
        if (name === 'name') {
            const nameParts = value.trim().split(/\s+/);
            if (value.length === 0) {
                return "Please enter your name";
            }
        
            if (nameParts.length < 2) {
                return "Please enter at least a first name and a last name separated by a single space";
            }
            
            for (let part of nameParts) {
                if (!nameReg.test(part)) {
                    return "Names should contain only alphabetic characters";
                }
            }
            
            return "";
        } else if (name === 'phone') {
            if (value.length === 0) {
                return "Please enter your phone number";
            } else if (!phoneReg.test(value)) {
                return "Enter a valid 11-digit phone number";
            }
        } else if (name === 'email') {
            return value.length === 0 ? "Please enter your email" :
                !emailReg.test(value) ? "Please enter a valid email" : "";
        } else if (name === 'password') {
            return value.length === 0 ? "Please enter a password" :
                !passReg.test(value) ? "Enter a valid password" : "";
        } else if (name === 'Repass') {
            return value.length === 0 ? "Please confirm your password" :
                value !== userInputs.password ? "Passwords do not match" : "";
        } else {
            return "";
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (userInputs.name && userInputs.phone && userInputs.email && userInputs.password && userInputs.Repass &&
            !errors.nameErr && !errors.phoneErr && !errors.emailErr && !errors.passwordErr && !errors.RepassErr) {


             localStorage.setItem('userInputs', JSON.stringify({
                 name: userInputs.name,
                 email: userInputs.email,
                 phone: userInputs.phone,
                 password: userInputs.password
             }));

            console.log("Form Data Submitted:", userInputs);

            navigate('/CompleteComReg'); 
        }
    };

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6">
                    <img src={logo} alt="Blue Bus" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-4 text-center">Register as company</h2>
                    <form onSubmit={submitForm}>
                        <div className="form-floating mb-3">
                            <input type="text" 
                                className={`form-control ${errors.nameErr && 'border-danger'}`}
                                id="floatingInputName"
                                placeholder="Enter your company name"
                                name="name"
                                value={userInputs.name}
                                onChange={setData}
                            />
                            <label htmlFor="floatingInputName">Company Name</label>
                            <p className="text-danger">{errors.nameErr}</p>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email"
                                className={`form-control ${errors.emailErr && 'border-danger'}`}
                                id="floatingInputEmail"
                                placeholder="Enter your company email address"
                                name="email"
                                value={userInputs.email}
                                onChange={setData}
                            />
                            <label htmlFor="floatingInputEmail">Company Email address</label>
                            <p className="text-danger">{errors.emailErr}</p>
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
                            <input type="password"
                                className={`form-control ${errors.passwordErr && 'border-danger'}`}
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
                            <input type="password"
                                className={`form-control ${errors.RepassErr && 'border-danger'}`}
                                id="floatingConfirmPassword"
                                placeholder="Confirm your password"
                                name="Repass"
                                value={userInputs.Repass}
                                onChange={setData}
                            />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                            <p className="text-danger">{errors.RepassErr}</p>
                        </div>
                        <button disabled={!userInputs.name || !userInputs.phone || !userInputs.email || !userInputs.password || !userInputs.Repass || 
                            errors.nameErr || errors.phoneErr || errors.emailErr || errors.passwordErr || errors.RepassErr} 
                            type="submit"
                            className="btn btn-dark">Next</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompanySignup;
