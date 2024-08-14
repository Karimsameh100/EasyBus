import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import cities from '../CityTrips.json';
import "./search.css"

const SearchComponent = () => {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    const handleSearch = () => {
        // TO DO: implement search logic here
        console.log('Search button clicked!');
    };

    return (
        <>
          

            <Container className="search-container d-flex justify-content-center align-items-center">

                <Form className="search-form d-flex flex-wrap justify-content-center">
                    <Form.Group className=" form-groub mr-3" controlId="fromCity">
                        <Form.Label>From:</Form.Label>
                        <Form.Control className="border-right " as="select" value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
                            <option value="">Select city</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="form-groub " controlId="toCity">
                        <Form.Label>To:</Form.Label>
                        <Form.Control className="" as="select" value={toCity} onChange={(e) => setToCity(e.target.value)}>
                            <option value="">Select city</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="form-groub" controlId="departureDate">
                        <Form.Label>Departure Date:</Form.Label>
                        <Form.Control className="" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" className='d-inline-block' onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
            </Container>
          
        </>
    );
};

export default SearchComponent;