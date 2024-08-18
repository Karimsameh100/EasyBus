import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../logo/bus.png"

function CompleteComReg() {

    const [userInputs, setUserInputs] = useState({
        
        file1: null,
        file2: null,
        file3: null
    });

    const [errors, setErrors] = useState({
        
        file1Err: "",
        file2Err: "",
        file3Err: ""
    });

    const navigate = useNavigate();

    

    const setData = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            // Check file type
            const validFileTypes = ['application/pdf'];
            const file = files[0];

            setUserInputs({
                ...userInputs,
                [name]: file
            });

            setErrors({
                ...errors,
                [`${name}Err`]: !file ? "Please upload a file" :
                    !validFileTypes.includes(file.type) ? "Only PDF files are allowed" : ""
            });
        } else {
            setUserInputs({
                ...userInputs,
                [name]: value
            });

            setErrors({
                ...errors,
                [`${name}Err`]: validateField(name, value)
            });
        }
    };

    const validateField = (name, value) => {
           
       if (name === 'file1' || name === 'file2' || name === 'file3') {
            return !userInputs[name] ? "Please upload a file" : "";
        } else {
            return "";
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (
            userInputs.file1 && userInputs.file2 && userInputs.file3 &&
            !errors.file1Err && !errors.file2Err && !errors.file3Err) {

            localStorage.setItem('file1', userInputs.file1);
            localStorage.setItem('file2', userInputs.file2);
            localStorage.setItem('file3', userInputs.file3);

            console.log("Form Data Submitted:", userInputs);

            navigate('/Login'); 
        }
    };

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
                                className={`form-control ${errors.file1Err && 'border-danger'}`}
                                id="floatingFile1"
                                name="file1"
                                onChange={setData}
                            />
                            <label htmlFor="floatingFile1">Upload commercial register</label>
                            <p className="text-danger">{errors.file1Err}</p>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="file"
                                className={`form-control ${errors.file2Err && 'border-danger'}`}
                                id="floatingFile2"
                                name="file2"
                                onChange={setData}
                            />
                            <label htmlFor="floatingFile2">Upload Work license</label>
                            <p className="text-danger">{errors.file2Err}</p>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="file"
                                className={`form-control ${errors.file3Err && 'border-danger'}`}
                                id="floatingFile3"
                                name="file3"
                                onChange={setData}
                            />
                            <label htmlFor="floatingFile3">Upload Certificates and evaluations</label>
                            <p className="text-danger">{errors.file3Err}</p>
                        </div>
                        <button disabled={!userInputs.file1 || !userInputs.file2 || !userInputs.file3 || 
                            errors.file1Err || errors.file2Err || errors.file3Err} 
                            type="submit"
                            className="btn btn-dark">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompleteComReg;
