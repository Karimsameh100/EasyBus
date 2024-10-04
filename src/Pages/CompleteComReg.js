import React, { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import axios for making HTTP requests
import logo from "../logo/trip.jpeg";

function CompleteComReg() {
    const location = useLocation();
    const companyData = location.state?.companyData || {};
    const [userInputs, setUserInputs] = useState({
        commercial_register: null,
        work_license: null,
        certificates: null,
        user_type:"company"
    });

    const [errors, setErrors] = useState({
        commercial_registerErr: "",
        work_licenseErr: "",
        certificatesErr: ""
    });

    const navigate = useNavigate();

    const setData = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            // Validate file type (allow only PDF)
            const validFileTypes = ['application/pdf'];
            setUserInputs({
                ...userInputs,
                [name]: file
            });

            setErrors({
                ...errors,
                [`${name}Err`]: !validFileTypes.includes(file.type) ? "Only PDF files are allowed" : ""
            });
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (
            userInputs.certificates && userInputs.work_license && userInputs.commercial_register &&
            !errors.certificatesErr && !errors.work_licenseErr && !errors.commercial_registerErr
        ) {
            
                const formData = new FormData();
                formData.append('commercial_register', userInputs.commercial_register);
                formData.append('work_license', userInputs.work_license);
                formData.append('certificates', userInputs.certificates);
                formData.append('name', companyData.name);
                formData.append('email', companyData.email);
                formData.append('phone_number', companyData.phone_number);
                formData.append('password', companyData.password);
                formData.append('confirm_password', companyData.confirm_password);
                formData.append('user_type', userInputs.user_type);
                

               try {  
                const response = await axios.post('http://127.0.0.1:8000/register/company/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                console.log("File upload response:", response.data);

                // Navigate to another page after successful submission
               if (response.status === 201 || response.status === 200) {
                    // Navigate only if the response is successful
                    navigate('/Login1');
                } else {
                    console.error("Unexpected response status:", response.status);
                }

            } catch (error) {
                if (error.response) {
                    console.error("Error response:", error.response.data);
                } else if (error.request) {
                    console.error("Error request:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
            }
        }
    };
///commercial_register , work_license  certificates
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6">
                    <img src={logo} alt="Blue Bus" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-4 text-center">Complete Register as company</h2>
                    <form onSubmit={submitForm}>
                        <div className="form-floating mb-3">
                            <input type="file"
                                className={`form-control ${errors.commercial_registerErr && 'border-danger'}`}
                                id="floatingFile1"
                                name="commercial_register"
                                onChange={setData}
                            />
                            <label htmlFor="floatingFile1">Upload Commercial Register</label>
                            <p className="text-danger">{errors.work_licenseErr}</p>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="file"
                                className={`form-control ${errors.file2Err && 'border-danger'}`}
                                id="floatingFile2"
                                name="work_license"
                                onChange={setData}
                            />
                            <label htmlFor="floatingFile2">Upload Work License</label>
                            <p className="text-danger">{errors.work_licenseErr}</p>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="file"
                                className={`form-control ${errors.certificatesErr && 'border-danger'}`}
                                id="floatingFile3"
                                name="certificates"
                                onChange={setData}
                            />
                            <label htmlFor="floatingFile3">Upload Certificates and Evaluations</label>
                            <p className="text-danger">{errors.certificatesErr}</p>
                        </div>
                        <button disabled={!userInputs.certificates || !userInputs.work_license || !userInputs.commercial_register ||
                            errors.certificatesErr || errors.work_licenseErr || errors.commercial_registerErr}
                            type="submit"
                            className="btn btn-dark">Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompleteComReg;
