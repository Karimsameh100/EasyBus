import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';

const BookingPage = () => {
    const location = useLocation();
    const trip = location.state.trip;
    const company = location.state.company;

    const [numPlaces, setNumPlaces] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > parseInt(trip.availablePlaces, 10)) {
            setShowModal(true);
        } else {
            setNumPlaces(value);
            const total = value * (trip.price || 0); // ensure trip.price is a number
            const tax = total * 0.14;
            setTotalCost(total + tax);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="left-col">
                    {/* Left column content */}
                    <Card className="shadow-sm">
                        <Card.Header className="text-center">
                            <img src={company.image} className="img-fluid mb-3" />
                            <h2 className="text-center mb-4">Your Trip with {company.name}</h2>
                        </Card.Header>

                        <Card.Body className="px-4 py-3">
                            <h5 className="mb-3">Trip Details</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <span className="font-weight-bold">Trip Date:</span> {trip.tripDate}
                                </li>
                                <li>
                                    <span className="font-weight-bold">Departure Station:</span> {trip.departureStation}
                                </li>
                                <li>
                                    <span className="font-weight-bold">Stop Stations:</span> {trip.stopStations}
                                </li>
                                <li>
                                    <span className="font-weight-bold">Departure Time:</span> {trip.departureTime}
                                </li>
                                <li>
                                    <span className="font-weight-bold">Arrival Time:</span> {trip.arrivedTime}
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="right-col">
                    {/* Right column content */}
                    <Card>
                        <Card.Body>
                            <h5> Booking Form </h5>
                            <Form>
                                <Form.Group controlId="numPlaces">
                                    <Form.Label>Number of Places:</Form.Label>
                                    <Form.Control type="number" value={numPlaces} onChange={handleInputChange} />
                                </Form.Group>
                                <p className="text-muted">Total Cost: {totalCost.toFixed(2)}</p>
                                <Button variant="primary" type="submit">
                                    Book Now
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Out of Places</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Sorry, you have exceeded the available places. Please try again.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingPage;