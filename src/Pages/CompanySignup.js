import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  // Import Axios
import logo from "../logo/trip.jpeg";

function CompanySignup() {
    const [userInputs, setUserInputs] = useState({
        name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
    });

    const [errors, setErrors] = useState({
        nameErr: "",
        emailErr: "",
        phone_numberErr: "",
        passwordErr: "",
        confirm_passwordErr: ""
    });

    const navigate = useNavigate();

    const emailReg = /^([a-z0-9]+)@(gmail|yahoo)\.(com|eg)$/;
    const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
    const passReg = /^[0-9]{8,}/;

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
        switch (name) {
            case 'name':
                return value.length === 0 ? "Please enter your company name" : "";
            case 'phone_number':
                return value.length === 0
                    ? "Please enter your phone number"
                    : !phoneReg.test(value)
                        ? "Enter a valid 11-digit phone number"
                        : "";
            case 'email':
                return value.length === 0
                    ? "Please enter your email"
                    : !emailReg.test(value)
                        ? "Please enter a valid email"
                        : "";
            case 'password':
                return value.length === 0
                    ? "Please enter a password"
                    : !passReg.test(value)
                        ? "Enter a valid password"
                        : "";
            case 'confirm_password':
                return value.length === 0
                    ? "Please confirm your password"
                    : value !== userInputs.password
                        ? "Passwords do not match"
                        : "";
            default:
                return "";
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (
            userInputs.name &&
            userInputs.phone_number &&
            userInputs.email &&
            userInputs.password &&
            userInputs.confirm_password &&
            !errors.nameErr &&
            !errors.phone_numberErr &&
            !errors.emailErr &&
            !errors.passwordErr &&
            !errors.confirm_passwordErr
        ) {
            
                navigate('/CompleteComReg',{ state: { companyData: userInputs } });
             
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
                            <input
                                type="text"
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
                            <input
                                type="email"
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
                                className={`form-control ${errors.phoneErr && 'border-danger'}`}
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
                                type="password"
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
                            <input
                                type="password"
                                className={`form-control ${errors.confirm_passwordErr && 'border-danger'}`}
                                id="floatingConfirmPassword"
                                placeholder="Confirm your password"
                                name="confirm_password"
                                value={userInputs.confirm_password}
                                onChange={setData}
                            />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                            <p className="text-danger">{errors.RepassErr}</p>
                        </div>
                        <button
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
                            type="submit"
                            className="btn btn-dark"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompanySignup;
