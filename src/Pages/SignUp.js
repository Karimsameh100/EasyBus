import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function TripTrackSignup() {
  const [selectedRole, setSelectedRole] = useState();
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleJoinClick = () => {
    if (selectedRole === "client") {
      navigate("/client");
    } else if (selectedRole === "company") {
      navigate("/CompanySignup");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Join as a client or company</h1>

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
                    value="client"
                    checked={selectedRole === "client"}
                    onChange={handleRoleChange}
                  />
                  <br />
                  <span>I'm a client, appling for job</span>
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
                  <span>I'm a company, looking for work</span>
                </Form.Label>
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <Button
            variant="primary"
            onClick={handleJoinClick}
            disabled={!selectedRole}
          >
            {selectedRole === "client"
              ? "Join as a Client"
              : "Join as a Company"}
          </Button>
        </div>
      </Form>

      <p className="text-center mt-3">
        Already have an account? <Link to={"/login"}>Log In</Link>
      </p>
    </div>
  );
}

export default TripTrackSignup;
