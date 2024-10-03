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

          if (location.state && location.state.isEditMode) {
            const { email } = location.state;
            const existingUser = data.find((user) => user.email === email);
            if (existingUser) {
              setUserInputs({
                name: existingUser.name,
                email: existingUser.email,
                phone_number: existingUser.phone_number,
                password: "",
                confirm_password: "",
                user_type: existingUser.user_type,
              });
              setCurrentUserIndex(existingUser.id); // Make sure to set the ID here
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

    const { name, phone_number, email, password, confirm_password, user_type } =
      userInputs;

    if (
      name &&
      phone_number &&
      email &&
      password &&
      user_type &&
      confirm_password &&
      !errors.nameErr &&
      !errors.phone_numberErr &&
      !errors.emailErr &&
      !errors.passwordErr &&
      !errors.confirm_passwordErr
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone_number", phone_number);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirm_password", confirm_password);
      formData.append("user_type", user_type);

      try {
        const url = isEditMode
          ? `http://127.0.0.1:8000/user/${currentUserIndex}`
          : "http://127.0.0.1:8000/register/user/";
        const method = isEditMode ? "PUT" : "POST";

        const response = await fetch(url, {
          method: method,
          body: formData,
        });

        if (response.ok) {
          console.log(
            `User ${isEditMode ? "updated" : "registered"} successfully`
          );
          // Redirect to the user profile page after successful update
          navigate(`/userprofile`, {
            state: { updatedUser: userInputs },
          });
        } else {
          // Handle response errors
          try {
            const errorData = await response.json();
            console.error(
              `Failed to ${isEditMode ? "update" : "register"} user:`,
              errorData
            );
          } catch (jsonError) {
            const errorText = await response.text();
            console.error(
              `Failed to ${
                isEditMode ? "update" : "register"
              } user (non-JSON response):`,
              errorText
            );
          }
        }
      } catch (error) {
        console.error(`Error:`, error);
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
              {!isEditMode && ( //-----------------------------------edit onlyyyyyy
                <>
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
                </>
              )}
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
