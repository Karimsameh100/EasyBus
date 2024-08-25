import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import search from "./search.css"
import { Container, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const Search = () => {
    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4001/posts')
            .then(response => {
                const allTrips = response.data.reduce((acc, city) => {
                    city.companies.forEach(company => {
                        company.trips.forEach(trip => {
                            acc.push({ ...trip, companyName: company.name });
                        });
                    });
                    return acc;
                }, []);
                setTrips(allTrips);
            })
            .catch(error => console.error(error));
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const filteredTrips = trips.filter((trip) => {
            return (
                trip.departureStation === departureStation &&
                trip.stopStations === arrivalStation
            );
        });
        navigate('/search-results', { state: { filteredTrips } });
        console.log(filteredTrips)
    };


    return (
            <Container className="search-container d-flex justify-content-center align-items-center">
                <form className="search-form d-flex flex-wrap justify-content-center w-100" onSubmit={handleSubmit}>
                    <Form.Group className="form-groub mr-3" controlId="departureStation">
                        <Form.Label>Departure Station:</Form.Label>
                        <Form.Control
                            type="text"
                            value={departureStation}
                            onChange={(event) => setDepartureStation(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="form-groub mr-3" controlId="arrivalStation">
                        <Form.Label>Arrival Station:</Form.Label>
                        <Form.Control
                            type="text"
                            value={arrivalStation}
                            onChange={(event) => setArrivalStation(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="form-groub mr-3" controlId="tripDate">
                        <Form.Label>Trip Date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={tripDate}
                            onChange={(event) => setTripDate(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" className='d-inline-block buttn1 flex-wrap' type="submit">
                        Search
                    </Button>
                </form>
            </Container>
    );
};

export default Search;