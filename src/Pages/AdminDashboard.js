import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Nav } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaUsers, FaBuilding, FaBus } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/Mixinuser_list/");
      setTotalUsers(response.data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/company/<int:pk>/"
      );
      // ("http://127.0.0.1:8000/companies/");
      setTotalCompanies(response.data.length);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    if (currentSection === "totalUsers") {
      fetchUsers();
    } else if (currentSection === "totalCompanies") {
      fetchCompanies();
    }
  }, [currentSection]);

  return (
    <Container fluid className="p-4">
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <Nav
            defaultActiveKey="/dashboard"
            className="flex-column bg-light p-3"
          >
            <Nav.Link
              onClick={() => setCurrentSection("manageUsers")}
              className="mb-2"
            >
              <FaUsers style={{ marginRight: "8px" }} />
              Manage Users
            </Nav.Link>
            <Nav.Link
              onClick={() => setCurrentSection("manageCompanies")}
              className="mb-2"
            >
              <FaBuilding style={{ marginRight: "8px" }} />
              Manage Companies
            </Nav.Link>
            <Nav.Link
              onClick={() => setCurrentSection("manageTrips")}
              className="mb-2"
            >
              <FaBus style={{ marginRight: "8px" }} />
              Manage Trips
            </Nav.Link>
            <Nav.Link
              onClick={() => setCurrentSection("totalUsers")}
              className="mb-2"
            >
              <FaUsers style={{ marginRight: "8px" }} />
              Total Users
            </Nav.Link>
            <Nav.Link
              onClick={() => setCurrentSection("totalCompanies")}
              className="mb-2"
            >
              <FaBuilding style={{ marginRight: "8px" }} />
              Total Companies
            </Nav.Link>
            <Nav.Link
              onClick={() => setCurrentSection("totalTrips")}
              className="mb-2"
            >
              <FaBus style={{ marginRight: "8px" }} />
              Total Trips
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <h1 className="mb-4" style={{ textAlign: "center" }}>
            Admin Dashboard
          </h1>

          {/* Render section based on currentSection */}
          {currentSection === "dashboard" && (
            <Row className="mb-4">
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text>{totalUsers}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Total Companies</Card.Title>
                    <Card.Text>{totalCompanies}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Total Trips</Card.Title>
                    <Card.Text>5,230</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {currentSection === "manageUsers" && (
            <Row className="mb-4">
              <Col>
                <Card>
                  <Card.Header as="h5">Manage Users</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>John Doe</td>
                          <td>johndoe@gmail.com</td>
                          <td>User</td>
                          <td>
                            <FaEdit
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: "10px",
                              }}
                            />
                            <FaTrashAlt
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jane Smith</td>
                          <td>janesmith@gmail.com</td>
                          <td>Company</td>
                          <td>
                            <FaEdit
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: "10px",
                              }}
                            />
                            <FaTrashAlt
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {currentSection === "manageCompanies" && (
            <Row>
              <Col>
                <Card>
                  <Card.Header as="h5">Manage Companies</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Company A</td>
                          <td>companya@gmail.com</td>
                          <td>
                            <FaEdit
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: "10px",
                              }}
                            />
                            <FaTrashAlt
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Company B</td>
                          <td>companyb@gmail.com</td>
                          <td>
                            <FaEdit
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: "10px",
                              }}
                            />
                            <FaTrashAlt
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {currentSection === "manageTrips" && (
            <Row>
              <Col>
                <Card>
                  <Card.Header as="h5">Manage Trips</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Trip Number</th>
                          <th>Departure</th>
                          <th>Destination</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>453</td>
                          <td>Cairo</td>
                          <td>Alexandria</td>
                          <td>2024-09-23</td>
                          <td>$150</td>
                          <td>
                            <FaEdit
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: "10px",
                              }}
                            />
                            <FaTrashAlt
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>789</td>
                          <td>Luxor</td>
                          <td>Aswan</td>
                          <td>2024-09-25</td>
                          <td>$100</td>
                          <td>
                            <FaEdit
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: "10px",
                              }}
                            />
                            <FaTrashAlt
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {currentSection === "totalUsers" && (
            <Row className="mb-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text>{totalUsers}</Card.Text> {}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {currentSection === "totalCompanies" && (
            <Row className="mb-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Companies</Card.Title>
                    <Card.Text>{totalCompanies}</Card.Text> {}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {currentSection === "totalTrips" && (
            <Row className="mb-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Trips</Card.Title>
                    <Card.Text>5,230</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
