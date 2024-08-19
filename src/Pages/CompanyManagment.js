import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4001/companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCompanySelect = (companyId) => {
    axios.get(`http://localhost:4001/companies/${companyId}`)
      .then(response => {
        setSelectedCompany(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCompanyDelete = (companyId) => {
    axios.delete(`http://localhost:4001/companies/${companyId}`)
      .then(response => {
        setCompanies(companies.filter(company => company.id !== companyId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCompanyEdit = (companyId, updatedCompany) => {
    axios.put(`http://localhost:4001/companies/${companyId}`, updatedCompany)
      .then(response => {
        setCompanies(companies.map(company => company.id === companyId ? updatedCompany : company));
      })
      .catch(error => {
        console.error(error);
      });
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
                    <Button variant="primary" onClick={() => handleCompanySelect(company.id)}>Select</Button>
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
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompany.trips.map((trip) => (
                    <tr key={trip.TripNumber}>
                      <td>{trip.TripNumber}</td>
                      <td>{trip.TripDate}</td>
                      <td>{trip.AvailablePlaces}</td>
                      <td>{trip.DepartureStation}</td>
                      <td>{trip.StopStations}</td>
                      <td>{trip.Price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyManagement;