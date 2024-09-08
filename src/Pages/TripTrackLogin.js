import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function TripTrackLogin() {
  const [selectedRole, setSelectedRole] = useState();
  const navigate = useNavigate();

  
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleLoginClick = async () => {
    if (selectedRole === "passanger") {
      // Client login logic here
      
          navigate("/login");
        
          
      
     
    } else if (selectedRole === "company") {
      // Company login logic here
      
          navigate("/CompanyLogin");
        
       
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Log in as a passanger or company</h1>

      <Form>
        <div className="row">
          <div className="col-md-6 text-center mb-4">
            <div
              className="p-4 border border-dark rounded"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              <Form.Group controlId="clientRadio">
                <Form.Label>
                  <Form.Check
                    name="role"
                    type="radio"
                    value="passanger"
                    checked={selectedRole === "passanger"}
                    onChange={handleRoleChange}
                  />
                  <br />
                  <span>I'm a passanger</span>
                </Form.Label>
              </Form.Group>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <div
              className="p-4 border border-dark rounded"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              <Form.Group controlId="companyRadio">
                <Form.Label>
                  <Form.Check
                    name="role"
                    type="radio"
                    value="company"
                    checked={selectedRole === "company"}
                    onChange={handleRoleChange}
                  />
                  <br />
                  <span>I'm a company</span>
                </Form.Label>
              </Form.Group>
            </div>
          </div>
        </div>

       

        <div className="text-center mt-3">
          <Button
            variant="primary"
            onClick={handleLoginClick}
            disabled={!selectedRole}
          >
            {selectedRole === "passanger" ? "Log in as passanger" : "Log in as Company"}
          </Button>
        </div>
      </Form>

      <p className="text-center mt-3">
        Don't have an account? <Link to={"/signup"}>Sign up</Link>
      </p>
    </div>
  );
}

export default TripTrackLogin;