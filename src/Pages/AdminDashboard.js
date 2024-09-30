import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Nav, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaUsers, FaBuilding, FaBus } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/Mixinuser_list/");
      setTotalUsers(response.data.length);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/register/company/");
      setTotalCompanies(response.data.length);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching Companies:", error);
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/all/trips/");
      setTotalTrips(response.data.length);
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching Trips:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleEditTrip = (trip) => {
    setSelectedTrip(trip);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteCompany = (company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleDeleteTrip = (trip) => {
    setSelectedTrip(trip);
    setShowDeleteModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        name: selectedUser.name,
        email: selectedUser.email,
        user_type: selectedUser.user_type,
        phone_number: selectedUser.phone_number,
        password: selectedUser.password,
        confirm_password: selectedUser.confirm_password,

        role: selectedUser.role,
      };
      const response = await axios.put(`http://127.0.0.1:8000/mixinuser_pk/${selectedUser.id}`, updatedUser);
      console.log("User updated successfully:", response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
    setShowEditModal(false);
  };

  const handleUpdateCompany = async () => {
    try {
      const formData = new FormData();
      formData.append("name", selectedCompany.name);
      formData.append("email", selectedCompany.email);
      formData.append("password", selectedCompany.password);
      formData.append("confirm_password", selectedCompany.confirm_password);
      formData.append("user_type",selectedCompany.user_type);
      formData.append("phone_number",selectedCompany.phone_number);
      formData.append("commercial_register", selectedCompany.commercial_register);
      formData.append("work_license", selectedCompany.work_license);
      formData.append("certificates", selectedCompany.certificates);

      const response = await axios.put(`http://127.0.0.1:8000/company/${selectedCompany.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Company updated successfully:", response.data);
      fetchCompanies();
    } catch (error) {
      console.error("Error updating company:", error);
    }
    setShowEditModal(false);
  };

  const handleUpdateTrip = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/selected/trip/${selectedTrip.id}`, selectedTrip);
      console.log("Trip updated successfully:", response.data);
      fetchTrips();
    } catch (error) {
      console.error("Error updating trip:", error);
    }
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/mixinuser_pk/${selectedUser.id}`);
        console.log("User deleted successfully:", response.data);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else if (selectedCompany) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/company/${selectedCompany.id}/`);
        console.log("Company deleted successfully:", response.data);
        fetchCompanies();
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    } else if (selectedTrip) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/selected/trip/${selectedTrip.id}`);
        console.log("Trip deleted successfully:", response.data);
        fetchTrips();
      } catch (error) {
        console.error("Error deleting trip:", error);
      }
    }
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (currentSection === "manageUsers") {
      fetchUsers();
    }
    if (currentSection === "manageCompanies" ) {
      fetchCompanies();
    }
    if (currentSection === "manageTrips") {
      fetchTrips();
    }else if ( trips.length <= 0 && users.length <= 0 && companies.length <= 0) {
      fetchUsers();
      fetchTrips();
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
                    <Card.Text className="fs-4 fw-medium">{totalUsers}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Total Companies</Card.Title>
                    <Card.Text className="fs-4 fw-medium">{totalCompanies}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title className="fs-4 fw-medium">Total Trips</Card.Title>
                    <Card.Text className="fs-4 fw-medium">{totalTrips}</Card.Text>
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
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.length > 0 ? (
                          users
                            .slice(
                              currentPage * 6,
                              (currentPage + 1) * 6
                            )
                            .map((user, index) => (
                              <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                  <FaEdit
                                    style={{
                                      cursor: "pointer",
                                      color: "orange",
                                      marginRight: "10px",
                                    }}
                                    onClick={() => handleEditUser(user)}
                                  />
                                  <FaTrashAlt
                                    style={{ cursor: "pointer", color: "red" }}
                                    onClick={() => handleDeleteUser(user)}
                                  />
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={5}>No users found.</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(users?.length / 6) - 1}
                      >
                        Next
                      </button>
                    </div>
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
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies?.length > 0 ? (
                          companies
                            .slice(
                              currentPage * 6,
                              (currentPage + 1) * 6
                            )
                            .map((company, index) => (
                              <tr key={index}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.email}</td>
                                <td>
                                  <FaEdit
                                    style={{
                                      cursor: "pointer",
                                      color: "orange",
                                      marginRight: "10px",
                                    }}
                                    onClick={() => handleEditCompany(company)}
                                  />
                                  <FaTrashAlt
                                    style={{ cursor: "pointer", color: "red" }}
                                    onClick={() => handleDeleteCompany(company)}
                                  />
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={4}>No companies found.</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(companies?.length / 6) - 1}
                      >
                        Next
                      </button>
                    </div>
                  </Card.Body>
                </Card >
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
                          <th>ID</th>
                          <th>Trip Number</th>
                          <th>Departure</th>
                          <th>Destination</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trips?.length > 0 ? (
                          trips
                            .slice(
                              currentPage * 6,
                              (currentPage + 1) * 6
                            )
                            .map((trip, index) => (
                              <tr key={index}>
                                <td>{trip.id}</td>
                                <td>{trip.tripNumber}</td>
                                <td>{trip.departuerStation}</td>
                                <td>{trip.destinationStation}</td>
                                <td>{trip.date}</td>
                                <td>{trip.price}</td>
                                <td>
                                  <FaEdit
                                    style={{
                                      cursor: "pointer",
                                      color: "orange",
                                      marginRight: "10px",
                                    }}
                                    onClick={() => handleEditTrip(trip)}
                                  />
                                  <FaTrashAlt
                                    style={{ cursor: "pointer", color: "red" }}
                                    onClick={() => handleDeleteTrip(trip)}
                                  />
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={7}>No trips found.</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(trips?.length / 6) - 1}
                      >
                        Next
                      </button>
                    </div>
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
                    <Card.Text className="fs-4 fw-medium">{totalUsers}</Card.Text> { }
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
                    <Card.Text className="fs-4 fw-medium">{totalCompanies}</Card.Text> { }
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
                    <Card.Text className="fs-4 fw-medium">{totalTrips}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentSection == "manageUsers" && (
            <Form>
              {selectedUser && (
                <>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedUser.name}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedUser.phone_number}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          phone_number: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={selectedUser.password}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={selectedUser.confirm_password}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          confirm_password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
            </Form>
          )}
          {currentSection == "manageCompanies" && (

            <Form>
              {selectedCompany && (
                <>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedCompany.name}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={selectedCompany.email}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={selectedCompany.password}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={selectedCompany.confirm_password}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          confirm_password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formCommercialRegister">
                    <Form.Label>Commercial Register</Form.Label>
                    <Form.Control
                      type="file"
                      id="commercial-register-file"
                      label="Choose a file"
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          commercial_register: e.target.files[0],
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formWorkLicense">
                    <Form.Label>Work License</Form.Label>
                    <Form.Control
                      type="file"
                      id="work-license-file"
                      label="Choose a file"
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          work_license: e.target.files[0],
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formCertificates">
                    <Form.Label>Certificates</Form.Label>
                    <Form.Control
                      type="file"
                      id="certificates-file"
                      label="Choose a file"
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          certificates: e.target.files[0],
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
            </Form>

          )}
          {currentSection == "manageTrips" && (
            <Form>
              {selectedTrip && (
                <>
                  <Form.Group controlId="formTripNumber">
                    <Form.Label>Trip Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedTrip.tripNumber}
                      onChange={(e) =>
                        setSelectedTrip({
                          ...selectedTrip,
                          tripNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formDeparture">
                    <Form.Label>Departure</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedTrip.departuerStation}
                      onChange={(e) =>
                        setSelectedTrip({
                          ...selectedTrip,
                          departuerStation: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formDestination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedTrip.destinationStation}
                      onChange={(e) =>
                        setSelectedTrip({
                          ...selectedTrip,
                          destinationStation: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedTrip.date}
                      onChange={(e) =>
                        setSelectedTrip({
                          ...selectedTrip,
                          date: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedTrip.price}
                      onChange={(e) =>
                        setSelectedTrip({
                          ...selectedTrip,
                          price: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          {currentSection == "manageUsers" && selectedUser && (
            <Button variant="primary" onClick={handleUpdateUser}>
              Save Changes
            </Button>
          )}
          {currentSection == "manageCompanies" && selectedCompany && (
            <Button variant="primary" onClick={handleUpdateCompany}>
              Save Changes
            </Button>
          )}
          {currentSection == "manageTrips" && selectedTrip && (
            <Button variant="primary" onClick={handleUpdateTrip}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;