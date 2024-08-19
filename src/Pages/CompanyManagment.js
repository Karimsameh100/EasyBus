import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4001/posts');
      const companiesData = response.data.filter(item => item.type === 'company');
      setCompanies(companiesData);
    };

    fetchData();
  }, []);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleCompanyDelete = (companyId) => {
    axios.delete(`http://localhost:4001/posts/${companyId}`);
    setCompanies(companies.filter(company => company.id !== companyId));
  };

  const handleCompanyEdit = (companyId, updatedCompany) => {
    axios.put(`http://localhost:4001/posts/${companyId}`, updatedCompany);
    setCompanies(companies.map(company => company.id === companyId ? updatedCompany : company));
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h2>Companies</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleCompanySelect(company)}>Select</Button>
                    <Button variant="danger" onClick={() => handleCompanyDelete(company.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={8}>
          {selectedCompany && (
            <div>
              <h2>{selectedCompany.name}</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Trip Number</th>
                    <th>Trip Date</th>
                    <th>Available Places</th>
                    <th>Departure Station</th>
                    <th>Stop Stations</th>
                    <th>Departure Time</th>
                    <th>Arrived time</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompany.Trips.map((trip) => (
                    <tr key={trip.TripNumber}>
                      <td>{trip.TripNumber}</td>
                      <td>{trip.TripDate}</td>
                      <td>{trip.AvailablePlaces}</td>
                      <td>{trip.DepartureStation}</td>
                      <td>{trip.StopStations}</td>
                      <td>{trip.DepartureTime}</td>
                      <td>{trip.ArrivedTime}</td>
                      <td>{trip.Price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="secondary" onClick={() => setSelectedCompany(null)}>Back</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyManagement;