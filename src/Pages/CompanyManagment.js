// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';

// const CompanyManagement = () => {
//     const [companies, setCompanies] = useState([]);
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const [error, setError] = useState(null);
//     const [allCities, setAllCities] = useState([]);
//     const [editingCompany, setEditingCompany] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4001/posts');
//                 if (response.data) {
//                     const allCompanies = response.data.reduce((acc, city) => {
//                         if (city.companies) { // Add this check
//                             return [...acc, ...city.companies.filter(item => item.type === 'company')];
//                         } else {
//                             return acc; // Return the accumulator if city.companies is null or undefined
//                         }
//                     }, []);
//                     setCompanies(allCompanies);
//                     setAllCities(response.data);
//                 } else {
//                     setError('No data returned from API');
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError(error.message);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleCompanySelect = (company) => {
//         setSelectedCompany(company);
//     };

//       const handleCompanyDelete = async (companyId) => {
// try {
//     const citiesToUpdate = data.filter(city => city.companies.some(company => company.id === companyId));
//     const promises = citiesToUpdate.map(async (city) => {
//       const updatedCity = { ...city };
//       updatedCity.companies = updatedCity.companies.filter(company => company.id !== companyId);
//       const response = await axios.put(`http://localhost:4001/posts/${city.id}`, updatedCity);
//       return response.data;
//     });
//     const updatedCities = await Promise.all(promises);
//     setData(data.map((city) => {
//       const updatedCity = updatedCities.find((uc) => uc.id === city.id);
//       return updatedCity || city;
//     }));
//     setCompanies(data.reduce((acc, city) => [...acc, ...city.companies], []));
//   } catch (error) {
//     console.error('Error deleting company:', error);
//     setError(error.message);
//   }
// };

//     const handleCompanyEdit = async (companyId, updatedCompany) => {
//         try {
//             await axios.put(`http://localhost:4001/posts/${companyId}`, updatedCompany);
//             setCompanies(companies.map(company => company.id === companyId ? updatedCompany : company));
//             setEditingCompany(null);
//         } catch (error) {
//             console.error('Error editing company:', error);
//             setError(error.message);
//         }
//     };

//     const handleEditClick = (company) => {
//         setEditingCompany(company);
//     };

//     const handleCancelEdit = () => {
//         setEditingCompany(null);
//     };

//     return (
//         <Container>
//             <Row>
//                 <Col md={4}>
//                     <h2>Companies</h2>
//                     {error ? (
//                         <p>Error: {error}</p>
//                     ) : (
//                         <Table striped bordered hover>
//                             <thead>
//                                 <tr>
//                                     <th>Company Name</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {[...new Set(companies.map(company => company.name))].map((companyName, index) => (
//                                     <tr key={index}>
//                                         <td>{companyName}</td>
//                                         <td>
//                                             <Button variant="primary" onClick={() => handleCompanySelect(companies.find(company => company.name === companyName))}>Select</Button>
//                                             <Button variant="danger" onClick={() => handleCompanyDelete(companies.find(company => company.name === companyName).id)}>Delete</Button>
//                                             <Button variant="secondary" onClick={() => handleEditClick(companies.find(company => company.name === companyName))}>Edit</Button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     )}
//                 </Col>
//                 <Col md={8}>
//                     {selectedCompany && (
//                         <div>
//                             <h2>{selectedCompany.name}</h2>
//                             {editingCompany ? (
//                                 <Form>
//                                     <Form.Group controlId="companyName">
//                                         <Form.Label>Company Name</Form.Label>
//                                         <Form.Control type="text" value={editingCompany.name} onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })} />
//                                     </Form.Group>
//                                     <Button variant="primary" onClick={() => handleCompanyEdit(editingCompany.id, editingCompany)}>Save</Button>
//                                     <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
//                                 </Form>
//                             ) : (
//                                 <div>
//                                     {allCities.map((city) => {
//                                         const cityTrips = city && city.companies ? city.companies.find((company) => company.id === selectedCompany.id) : null;
//                                         if (cityTrips) {
//                                             return (
//                                                 <div key={city.id}>
//                                                     <h3>{city.city}</h3>
//                                                     <Table striped bordered hover>
//                                                         <thead>
//                                                             <tr>
//                                                                 <th>Trip Number</th>
//                                                                 <th>Trip Date</th>
//                                                                 <th>Available Places</th>
//                                                                 <th>Departure Station</th>
//                                                                 <th>Stop Stations</th>
//                                                                 <th>Departure Time</th>
//                                                                 <th>Arrived time</th>
//                                                                 <th>Price</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {cityTrips.trips.map((trip) => (
//                                                                 <tr key={trip.tripNumber}>
//                                                                     <td>{trip.tripNumber}</td>
//                                                                     <td>{trip.tripDate}</td>
//                                                                     <td>{trip.availablePlaces}</td>
//                                                                     <td>{trip.departureStation}</td>
//                                                                     <td>{trip.stopStations}</td>
//                                                                     <td>{trip.departureTime}</td>
//                                                                     <td>{trip.arrivedTime}</td>
//                                                                     <td>{trip.price}</td>
//                                                                 </tr>
//                                                             ))}
//                                                         </tbody>
//                                                     </Table>
//                                                 </div>
//                                             );
//                                         }
//                                         return null;
//                                     })}
//                                     <Button variant="secondary" onClick={() => setSelectedCompany(null)}>Back</Button>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default CompanyManagement;


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Image, Form, Table } from 'react-bootstrap';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [error, setError] = useState(null);
  const [allCities, setAllCities] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage, setTripsPerPage] = useState(2);

  const filteredCities = allCities.filter((city) => {
    let cityTrips = city && city.companies ? city.companies.find((company) => company.id === selectedCompany?.id) : null;
    return cityTrips !== null;
  });

  const totalPages = Math.ceil(filteredCities.length / 2);
  const startIndex = (currentPage - 1) * 2;
  const endIndex = startIndex + 2;
  const paginatedCities = filteredCities.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // add this line to scroll to the top of the page
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
  }, []);

  const handleCompanySelect = (companyName) => {
    setSelectedCompany(companyName);
  };

  const handleCompanyDelete = async (companyId) => {
    try {
      const citiesToUpdate = data.filter((city) => city.companies.some((company) => company.id === companyId));
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
    } catch (error) {
      console.error('Error deleting company:', error);
      setError(error.message);
    }
  };

  const handleCompanyEdit = async (companyId, updatedCompany) => {
    try {
      await axios.put(`http://localhost:4001/posts/${companyId}`, updatedCompany);
      setCompanies(companies && companies.map((company) => company.id === companyId ? updatedCompany : company));
      setEditingCompany(null);
    } catch (error) {
      console.error('Error editing company:', error);
      setError(error.message);
    }
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
  };

  const handleCancelEdit = () => {
    setEditingCompany(null);
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
                  const companyCities = allCities.filter((city) => city.companies.some((c) => c.id === companyId));
                  const companyTrips = (company?.trips ? company.trips.length : 0) * companyCities.length;
                  return (
                    <Col md={4} key={companyId} className="mx-auto">
                      <Card className='h-100'>
                        <Card.Img variant="top" src={company.image} className='h-50 object-contain pt-1' />
                        <Card.Body>
                          <Card.Title>{company.name}</Card.Title>
                          <Card.Text>
                            Number of cities: {companyCities.length}
                            <br />
                            Number of trips: {companyTrips}
                          </Card.Text>
                          <Button className='mr-3' variant="primary" onClick={() => handleCompanySelect(company)}>Select</Button>
                          <Button className='mr-3' variant="danger" onClick={() => handleCompanyDelete(company.id)}>Delete</Button>
                          <Button className='mr-2' variant="secondary" onClick={() => handleEditClick(company)}>Edit</Button>
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
                <Form>
                  <Form.Group controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" value={editingCompany.name} onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })} />
                  </Form.Group>
                  <Button variant="primary" onClick={() => handleCompanyEdit(editingCompany.id, editingCompany)}>Save</Button>
                  <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                </Form>
              ) : (
                <div>
                  {allCities ? paginatedCities.map((city) => {
                    let cityTrips = null;
                    if (city && city.companies) {
                      cityTrips = city.companies.find((company) => company && company.id === selectedCompany?.id);
                    }
                    if (cityTrips) {
                      const currentTrips = cityTrips?.trips ?? [];
                      return (
                        <div key={city.id}>
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
                          <nav aria-label="Pagination">
                            <ul className="pagination">
                              {Array(totalPages)
                                .fill(0)
                                .map((_, index) => (
                                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                    <a
                                      className="page-link"
                                      onClick={() => handlePageClick(index + 1)}
                                    >
                                      {index + 1}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </nav>
                        </div>
                      );
                    }
                    return null;
                  }) : <div>Loading...</div>}
                  <Button className='d-flex float-right justify-content-center btn-dark bg-gradient btn btn-md px-5 my-3' variant="secondary" onClick={() => setSelectedCompany(null)}>Back</Button>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyManagement;