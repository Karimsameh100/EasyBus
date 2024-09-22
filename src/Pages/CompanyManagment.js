/* import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Image, Form, Table, Modal } from 'react-bootstrap';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [error, setError] = useState(null);
  const [allCities, setAllCities] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage, setTripsPerPage] = useState(2);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmButtonType, setConfirmButtonType] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [disableConfirmButton, setDisableConfirmButton] = useState(false);



  const filteredCities = useMemo(() => {
    if (!allCities || !selectedCompany) return [];
    return allCities.filter((city) => {
      return city?.companies?.some((c) => c.id === selectedCompany?.id);
    });
  }, [allCities, selectedCompany]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredCities.length / tripsPerPage);
  }, [filteredCities, tripsPerPage]);

  const startIndex = (currentPage - 1) * tripsPerPage;
  const endIndex = startIndex + tripsPerPage;
  const paginatedCities = filteredCities.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    // add this line to scroll to the top of the page
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/posts');
        if (response.data) {
          const allCompanies = response.data.reduce((acc, city) => {
            if (city.companies) {
              return [...acc, ...city.companies.filter((item) => item.type === 'company')];
            } else {
              return acc;
            }
          }, []);
          setCompanies(allCompanies);
          setAllCities(response.data);
          setData(response.data);
        } else {
          setError('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [companies, editingCompany, showConfirmModal]);

  const handleCompanySelect = (companyName) => {
    setSelectedCompany(companyName);
  };

  const handleCompanyDelete = async (companyId) => {
    try {
      const citiesToUpdate = data.filter((city) => city?.companies?.some((company) => company.id === companyId));
      const promises = citiesToUpdate.map(async (city) => {
        const updatedCity = { ...city };
        updatedCity.companies = updatedCity.companies.filter((company) => company.id !== companyId);
        const response = await axios.put(`http://localhost:4001/posts/${city.id}`, updatedCity);
        return response.data;
      });
      const updatedCities = await Promise.all(promises);
      setData(data && data.map((city) => {
        const updatedCity = updatedCities.find((uc) => uc.id === city.id);
        return updatedCity || city;
      }));
      setCompanies(data.reduce((acc, city) => [...acc, ...city.companies], []));
      setShowConfirmModal(true);
      setConfirmMessage('Company deleted successfully!');
    } catch (error) {
      console.error('Error deleting company:', error);
      setError(error.message);
    }
  };


  const handleCompanyEdit = async (companyId, updatedCompany) => {
    try {
      const postToUpdate = data.find((post) => post.companies.some((company) => company.id === companyId));
      if (postToUpdate) {
        const updatedPost = { ...postToUpdate };
        const companyIndex = updatedPost.companies.findIndex((company) => company.id === companyId);
        updatedPost.companies[companyIndex] = updatedCompany;
        await axios.put(`http://localhost:4001/posts/${postToUpdate.id}`, updatedPost);
        setData(data.map((post) => (post.id === postToUpdate.id ? updatedPost : post)));
        setCompanies(data.reduce((acc, post) => [...acc, ...post.companies], []));
        setEditingCompany(null);
        setShowConfirmModal(true);
        setConfirmMessage('Company updated successfully!');
        setShowEdit(false);
      }
    } catch (error) {
      console.error('Error editing company:', error);
      setError(error.message);
    }
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setShowEdit(true);
  };

  const handleCancelEdit = () => {
    setEditingCompany(null);
  };


  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };

  console.log('companies:', companies);
  console.log('allCities:', allCities);

  return (
    <Container>
      <Row>
        <Col md={12} className="text-center">
          <h2>Companies</h2>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <Row>
              {companies &&
                Array.from(new Set(companies.map((company) => company.id))).map((companyId) => {
                  const company = companies.find((c) => c && c.id === companyId);
                  const companyCities = allCities.filter((city) => city?.companies?.some((c) => c.id === companyId));
                  const companyTrips = (company?.trips ? company.trips.length : 0) * companyCities.length;
                  return (
                    <Col sm={6} md={4} key={companyId} className="mx-auto">
                      <Card className='h-100'>
                        <Card.Img variant="top" src={company.image} className='h-50 object-contain pt-1' />
                        <Card.Body className='text-left'>
                          <Card.Title>{company.name}</Card.Title>
                          <Card.Text>
                            Number of cities: {companyCities.length}
                            <br />
                            Number of trips: {companyTrips}
                          </Card.Text>
                          <Button className='mr-4' variant="primary" onClick={() => handleCompanySelect(company)}>View</Button>
                          <Button className='mr-4' variant="danger" onClick={() => { setShowConfirmModal(true), setConfirmButtonType('danger'), setConfirmMessage("you are going to delete this company with all related data with it and although it's trips are you sure you want delete it?"), setDisableConfirmButton(false); }}>Delete</Button>
                          <Button className='mr-2' variant="secondary" onClick={() => { handleEditClick(company), handleCompanySelect(company), setShowEdit(true), setDisableConfirmButton(false); }}>Edit</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {selectedCompany && (
            <div>
              <h2>{selectedCompany.name}</h2>
              {editingCompany ? (
                showEdit && (
                  <Form>
                    <Form.Group controlId="companyName">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control type="text" value={editingCompany.name} onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="companyImage">
                      <Form.Label>Company Image</Form.Label>
                      <Form.Control type="text" value={editingCompany.image} onChange={(e) => setEditingCompany({ ...editingCompany, image: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="companyAbout">
                      <Form.Label>Company About</Form.Label>
                      <Form.Control as="textarea" value={editingCompany.about} onChange={(e) => setEditingCompany({ ...editingCompany, about: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => { setShowConfirmModal(true), setConfirmButtonType('success'), setConfirmMessage("This update will effect on your company data in all places you used this data are you sure you want it ?") }}>Save</Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                  </Form>
                )
              ) : (
                <div>
                  {allCities ? paginatedCities.map((city) => {
                    let cityTrips = null;
                    if (city && city.companies) {
                      cityTrips = city?.companies?.find((company) => company && company?.id === selectedCompany?.id);
                    }
                    if (cityTrips) {
                      const currentTrips = cityTrips?.trips ?? [];
                      return (
                        <div key={city.id} className='table-responsive'>
                          <h3>{selectedCompany?.name}-&gt;{city.city}</h3>
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
                              {currentTrips.map((trip) => (
                                <tr key={trip.tripNumber}>
                                  <td>{trip.tripNumber}</td>
                                  <td>{trip.tripDate}</td>
                                  <td>{trip.availablePlaces}</td>
                                  <td>{trip.departureStation}</td>
                                  <td>{trip.stopStations}</td>
                                  <td>{trip.departureTime}</td>
                                  <td>{trip.arrivedTime}</td>
                                  <td>{trip.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      );
                    }
                    return null;
                  }) : <div>Loading...</div>}
                  <Button className='d-flex float-right justify-content-center btn-dark bg-gradient btn btn-md px-5 my-5' variant="secondary" onClick={() => setSelectedCompany(null)}>Back</Button>
                </div>
              )}
              <nav aria-label="Pagination">
                <ul className="pagination justify-content-center my-1">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link text-light bg-dark bg-gradient" tabIndex="-1" aria-disabled="true" onClick={() => handlePageClick(currentPage - 1)}>
                      <i className="fas fa-chevron-left"></i>
                      Previous
                    </a>
                  </li>
                  {Array(totalPages)
                    .fill(0)
                    .map((_, index) => (
                      <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                        <a className="page-link text-light bg-dark bg-gradient" onClick={() => handlePageClick(index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                    ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link text-light bg-dark bg-gradient" onClick={() => handlePageClick(currentPage + 1)}>
                      Next
                      <i className="fas fa-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </Col>
      </Row>
      <Modal show={showConfirmModal} onHide={handleConfirmModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`fas fa-${confirmButtonType === 'success' ? 'check-circle' : 'exclamation-triangle'}`} /> Changes going to happan !!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{confirmMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmModalClose}>
            Close
          </Button>
          <Button variant={confirmButtonType} onClick={() => {
            if (confirmButtonType === 'success') {
              handleCompanyEdit(editingCompany.id, editingCompany);
              setDisableConfirmButton(false);
            } else if (confirmButtonType === 'danger') {
              handleCompanyDelete(selectedCompany.id);

            }
            handleConfirmModalClose();
            setDisableConfirmButton(true);
          }} disabled={disableConfirmButton}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CompanyManagement; */