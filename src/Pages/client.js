
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

        } else if (name === 'phone') {
            if (value.length === 0) {
                return "Please enter your phone number";
            } else if (!phoneReg.test(value)) {
                return "Enter a valid 10-digit phone number";
            }
        } else if (name === 'email') {
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

        if (userInputs.name && userInputs.phone && userInputs.email && userInputs.password && userInputs.Repass &&
            !errors.nameErr && !errors.phoneErr && !errors.emailErr && !errors.passwordErr && !errors.RepassErr) {


            console.log("Form Data Submitted:", userInputs);



            navagite('/Login');
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
