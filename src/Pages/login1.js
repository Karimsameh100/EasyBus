import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../logo/trip.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

function Login1() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailErr: "", passwordErr: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email: inputs.email,
        password: inputs.password,
      });

      const data = response.data;
      console.log("view user details", data);
      if (response.status === 200) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem(
          "profilePic",
          data.profilePic || "https://via.placeholder.com/150" //---------------------------------
        );

        window.dispatchEvent(new Event("loginStatusChanged")); //-----------------

        if (data.user_type === "company") {
          navigate("/DisplayTrips");
        } else if (data.user_type === "user") {
          navigate("/UserProfile");
        }
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      setLoginError(
        error.response
          ? error.response.data.message
          : "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col md-6">
          <img src={logo} alt="Logo" className="img-fluid" />
        </div>
        <div className="col md-6">
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
                className={`form-control ${
                  errors.passwordErr && "border-danger"
                }`}
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
      </div>
    </div>
  );
}

export default Login1;
