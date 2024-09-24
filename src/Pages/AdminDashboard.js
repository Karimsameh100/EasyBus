import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // استيراد الأيقونات

const AdminDashboard = () => {
  return (
    <Container fluid className="p-4">
      <h1 className="mb-4" style={{ textAlign: "center" }}>
        Admin Dashboard
      </h1>

      {/* Statistics Section */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>1,200</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Companies</Card.Title>
              <Card.Text>80</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Trips</Card.Title>
              <Card.Text>5,230</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Bookings</Card.Title>
              <Card.Text>2,870</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Users Management Section */}
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
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>johndoe@gmail.com</td>
                    <td>User</td>
                    <td>Active</td>
                    <td>
                      <FaEdit
                        style={{
                          cursor: "pointer",
                          color: "orange",
                          marginRight: "10px",
                        }}
                      />
                      <FaTrashAlt style={{ cursor: "pointer", color: "red" }} />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>janesmith@gmail.com</td>
                    <td>Company</td>
                    <td>Inactive</td>
                    <td>
                      <FaEdit
                        style={{
                          cursor: "pointer",
                          color: "orange",
                          marginRight: "10px",
                        }}
                      />
                      <FaTrashAlt style={{ cursor: "pointer", color: "red" }} />
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Manage Trips Section */}
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
                      <FaTrashAlt style={{ cursor: "pointer", color: "red" }} />
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
                      <FaTrashAlt style={{ cursor: "pointer", color: "red" }} />
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
