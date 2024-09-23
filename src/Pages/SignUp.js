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
    if (selectedRole === "passanger") {
      navigate("/client");
    } else if (selectedRole === "company") {
      navigate("/CompanySignup");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Join as a passanger or company</h1>

      <Form>
        <div className="row">
          <div className="col-md-6 text-center mb-4">
            <div
              className="p-4 border border-dark rounded"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              <Form.Group controlId="passangerRadio">
                <Form.Label>
                  <Form.Check
                    name="role"
                    type="radio"
                    value="passanger"
                    checked={selectedRole === "passanger"}
                    onChange={handleRoleChange}
                  />
                  <br />
                  <span>I'm a Passanger looking for trip</span>
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
                  <span> I'm a company have some trips</span>
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
            {selectedRole === "passanger"
              ? "Join as a passanger"
              : "Join as a Company"}
          </Button>
        </div>
      </Form>

      <p className="text-center mt-3">
        Already have an account? <Link to={"/Login1"}>Log In</Link>
      </p>
    </div>
  );
}

export default TripTrackSignup;
