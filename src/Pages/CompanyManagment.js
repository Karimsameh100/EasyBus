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

//     const handleCompanyDelete = async (companyId) => {
//         try {
//             await axios.delete(`http://localhost:4001/posts/${companyId}`);
//             setCompanies(companies.filter(company => company.id !== companyId));
//         } catch (error) {
//             console.error('Error deleting company:', error);
//             setError(error.message);
//         }
//     };

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



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [error, setError] = useState(null);
    const [allCities, setAllCities] = useState([]);
    const [editingCompany, setEditingCompany] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4001/posts');
                if (response.data) {
                    const allCompanies = response.data.reduce((acc, city) => {
                        if (city.companies) { // Add this check
                            return [...acc, ...city.companies.filter(item => item.type === 'company')];
                        } else {
                            return acc; // Return the accumulator if city.companies is null or undefined
                        }
                    }, []);
                    setCompanies(allCompanies);
                    setAllCities(response.data);
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

    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
    };

    const handleCompanyDelete = async (companyId) => {
        try {
            await axios.delete(`http://localhost:4001/posts/${companyId}`);
            setCompanies(companies.filter(company => company.id !== companyId));
        } catch (error) {
            console.error('Error deleting company:', error);
            setError(error.message);
        }
    };

    const handleCompanyEdit = async (companyId, updatedCompany) => {
        try {
            await axios.put(`http://localhost:4001/posts/${companyId}`, updatedCompany);
            setCompanies(companies.map(company => company.id === companyId ? updatedCompany : company));
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

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <h2>Companies</h2>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...new Set(companies.map(company => company.name))].map((companyName, index) => (
                                    <tr key={index}>
                                        <td>{companyName}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => handleCompanySelect(companies.find(company => company.name === companyName))}>Select</Button>
                                            <Button variant="danger" onClick={() => handleCompanyDelete(companies.find(company => company.name === companyName).id)}>Delete</Button>
                                            <Button variant="secondary" onClick={() => handleEditClick(companies.find(company => company.name === companyName))}>Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
                <Col md={8}>
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
                                    {allCities.map((city) => {
                                        const cityTrips = city && city.companies ? city.companies.find((company) => company.id === selectedCompany.id) : null;
                                        if (cityTrips) {
                                            return (
                                                <div key={city.id}>
                                                    <h3>{city.city}</h3>
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
                                                            {cityTrips.trips.map((trip) => (
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
                                    })}
                                    <Button variant="secondary" onClick={() => setSelectedCompany(null)}>Back</Button>
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
