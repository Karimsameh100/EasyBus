import { useLocation } from 'react-router-dom';
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, FormGroup } from 'react-bootstrap';
import "../Componants/bookstyle.css"
import logo from "../logo/neew llogo.png"
import axios from 'axios';

const BookingPage = () => {
    const location = useLocation();
    const [trip, setTrip] = useState(location.state?.trip);
    const company = location.state?.company;

    useEffect(() => {
        setTrip(location.state?.trip);
    }, [location.state]);

    const [showModal, setShowModal] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [onlinePaymentMethod, setOnlinePaymentMethod] = useState(false);
    const [agreeToPayDeposit, setAgreeToPayDeposit] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [bookingData, setBookingData] = useState({});
    const [userName, setUserName] = useState('');
    const [bookedTrips, setBookedTrips] = useState([]);
    const [time, setTime] = useState('');
    const [numberOfPlaces, setNumberOfPlaces] = useState(1);
    const [userId, setUserId] = useState(1);
    const [paypalAmount, setPaypalAmount] = useState(100);
    const [bookingID, setBookingId] = useState();
    const [paymentData, setPaymentData] = useState({})
    const [pickupLocation, setPickupLocation] = useState(trip?.departuerStation);
    const [dropLocation, setDropLocation] = useState(trip?.destinationStation);




    useEffect(() => {
        const tripPrice = parseFloat(trip?.price.replace(/[^\d\.]/g, '')); // extract numeric value from string
        const subTotal = numberOfPlaces * tripPrice;
        const discountAmount = subTotal * 0.10; // 10% discount
        const tax = (subTotal - discountAmount) * 0.14;
        setSubTotal(subTotal);
        setDiscountAmount(discountAmount);
        setTax(tax);
        setTotalCost(subTotal - discountAmount + tax);
    }, [numberOfPlaces, trip?.price]);

    const handleIncrement = () => {
        if (numberOfPlaces < trip?.avilabalPlaces) {
            setNumberOfPlaces(numberOfPlaces + 1);
        } else {
            setShowModal(true);
        }
    };

    const handleDecrement = () => {
        if (numberOfPlaces > 1) {
            setNumberOfPlaces(numberOfPlaces - 1);
        }
    };


    const handleModalClose = () => {
        setShowModal(false);
    };


    useEffect(() => {
        console.log('dropLocation:', dropLocation);
        console.log('pickupLocation:', pickupLocation);
    }, [dropLocation, pickupLocation]);


    const handleBookNow = (e) => {
        e.preventDefault();
        const tripInfo = {
            tripNumber: trip.tripNumber,
            tripDate: trip.tripDate,
            departureStation: trip.departuerStation,
            stopStations: trip.destinationStation,
            departureTime: trip.departuerTime,
            arrivedTime: trip.destinationTime,
            tripPrice: trip.price,
            company: company.name,
            userName: userName,
            totalCost: totalCost,
            numPlaces: numberOfPlaces,
        };

        let newBookedTrips;
        if (Array.isArray(bookedTrips)) {
            newBookedTrips = [...bookedTrips, tripInfo];
        } else {
            newBookedTrips = [tripInfo];
        }

        setBookedTrips(newBookedTrips);
        setShowTicketModal(true)

        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        axios.get('http://127.0.0.1:8000/currant-user/', { headers })
            .then((response) => {
                const userId = response.data.user_id;
                const userNam = response.data.username;
                setUserId(userId)
                setUserName(userNam)
                const bookingData = {
                    time: new Date(),
                    numberOfPlaces: numberOfPlaces,
                    totalFare: totalCost,
                    pickupLocation: pickupLocation,
                    dropLocation: dropLocation,
                    user: userId,
                    trip_id: trip.id,
                };
                setBookingData(bookingData)
                console.log(bookingData);

                axios.post('http://127.0.0.1:8000/booking/data/', bookingData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        const bookingId = response.data.id;
                        setBookingId(bookingId);

                        const updatedTripData = {
                            tripNumber: trip.tripNumber,
                            date: trip.date,
                            avilabalPlaces: trip.avilabalPlaces - numberOfPlaces,
                            departuerStation: trip.departuerStation,
                            destinationStation: trip.destinationStation,
                            departuerTime: trip.departuerTime,
                            destinationTime: trip.destinationTime,
                            price: trip.price,
                            status: trip.status,
                            bus: trip.bus,
                            company: trip.company,
                        };

                        // const updatedTripData = {
                        //     availablePlaces: trip.availablePlaces - numberOfPlaces,
                        //   };

                        axios.put(`http://127.0.0.1:8000/selected/trip/${trip.id}`, updatedTripData, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        })
                            .then((response) => {
                                console.log('Trip data updated successfully');
                            })
                            .catch((error) => {
                                console.error('Error updating trip data:', error);
                            });

                    })
                    .catch((error) => {
                        console.error(error);
                    });

            });
    };



    const handlePickupLocationChange = (e) => {
        setPickupLocation(e.target.value);
    };

    const handleDropLocationChange = (e) => {
        setDropLocation(e.target.value);
    };


    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="left-col py-2">
                    {/* Left column content */}
                    <Card className="shadow-sm">
                        <Card.Header className="text-center">
                            <img src={logo} className="img-fluid mb-3" />
                            <h2 className="text-center mb-4">Your Trip with {company?.name}</h2>
                        </Card.Header>

                        <Card.Body className="px-4 py-3">
                            <h5 className="mb-3">Trip Details</h5>
                            <ul className="list-unstyled">
                                <li className="d-flex justify-content-between">
                                    <strong className='fs-5'>Your Trip Number:</strong>
                                    <span className='fs-5'>{trip?.tripNumber}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Trip Date:</span>
                                    <span className='fs-5'>{trip?.date}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Departure Station:</span>
                                    <span className='fs-5'>{trip?.departuerStation}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Stop Stations:</span>
                                    <span className='fs-5'>{trip?.destinationStation}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Departure Time:</span>
                                    <span className='fs-5'>{trip?.departuerTime}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Arrival Time:</span>
                                    <span className='fs-5'>{trip?.destinationTime}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Trip Price:</span>
                                    <span className='fs-5'>{trip?.price}</span>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="right-col py-2">
                    {/* Right column content */}
                    <Card>
                        <Card.Body>
                            <h5> Booking Form </h5>
                            <Form>
                                <Form.Group controlId="numberOfPlaces">
                                    <Form.Label>Number of Places:</Form.Label>
                                    <div className="input-group">
                                        <Button variant="secondary" className='w-25' onClick={handleDecrement} disabled={numberOfPlaces === 1}>
                                            -
                                        </Button>
                                        <Form.Control type="number" value={numberOfPlaces} className='text-center text-dark fs-3 fw-semibold' readOnly onChange={(e) => setNumberOfPlaces(e.target.value)} />
                                        <Button variant="secondary" className='w-25 btn btn-lg' onClick={handleIncrement} disabled={numberOfPlaces === trip?.avilabalPlaces}>
                                            +
                                        </Button>
                                    </div>
                                </Form.Group>
                                <ul className="list-unstyled p-2">
                                    <li className="d-flex justify-content-between">
                                        <strong className='fs-6'>Sup Total:</strong>
                                        <span className='fs-5'>{subTotal.toFixed(2)}</span>
                                    </li>
                                    <li className="d-flex justify-content-between">
                                        <strong className='fs-6'>Discount (10%):</strong>
                                        <span className='fs-5'>-{discountAmount.toFixed(2)}</span>
                                    </li>
                                    <li className="d-flex justify-content-between">
                                        <strong className='fs-6'>Tax (14%):</strong>
                                        <span className='fs-5'>{tax.toFixed(2)}</span>
                                    </li>
                                    <hr />
                                    <li className="d-flex justify-content-between">
                                        <strong className='fs-6'>Total:</strong>
                                        <span className='fs-5'>{totalCost.toFixed(2)}</span>
                                    </li>
                                </ul>
                                <hr />

                                <Form.Group controlId="pickupLocation">
                                    <Form.Label>Pickup Location:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={pickupLocation}
                                        onChange={handlePickupLocationChange}
                                        required
                                    />
                                    {pickupLocation === '' && (
                                        <Form.Text className="text-danger" >Pickup location is required</Form.Text>

                                    )}
                                </Form.Group>

                                <Form.Group controlId="dropLocation">
                                    <Form.Label>Drop Location:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={dropLocation}
                                        onChange={handleDropLocationChange}
                                        required
                                    />
                                    {dropLocation === '' && (
                                        <Form.Text className="text-danger">Drop location is required</Form.Text>
                                    )}
                                </Form.Group>

                                {pickupLocation && dropLocation && (
                                    <button onClick={handleBookNow} className='btn btn-primary btn-md mt-5 d-flex justify-content-center fs-5 ' style={{ width: "95%", margin: "auto" }}>
                                        Book now
                                    </button>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>

                    <Modal size='lg' show={showTicketModal} onHide={() => setShowTicketModal(false)} className='w-100 m-auto'>
                        <Modal.Header className='text-center' closeButton>
                            <Modal.Title >Tick your Ticket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className=' d-flex'>
                            <div className='bg-dark w-25 d-flex flex-column rounded-3'>
                                <img src={logo} className=' w-100  my-auto h-100 rounded-3' />
                            </div>
                            <div className='custom-dashed-border'></div>
                            <div className="ticket-container bg-dark-subtle w-100 rounded-3 p-2">
                                <div className="ticket-header d-flex justify-content-between">
                                    <div>
                                        <h4>Mr/Ms.{userName}</h4>
                                        <strong>Trip Number:</strong> {trip?.tripNumber}
                                    </div>
                                    <div>
                                        <h4 className='text-end'>{company?.name}</h4>
                                        <strong>Trip Date:</strong> {trip?.date}

                                    </div>
                                </div>
                                <hr />
                                <div className="ticket-body">
                                    <ul className="list-unstyled">
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Departure Station:</strong>
                                            <span className='fs-5'>{bookingData.pickupLocation}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Stop Stations:</strong>
                                            <span className='fs-5'>{bookingData.dropLocation}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Departure Time:</strong>
                                            <span className='fs-5'>{trip?.departuerTime}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Arrival Time:</strong>
                                            <span className='fs-5'>{trip?.destinationTime}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Number of places:</strong>
                                            <span className='fs-5'>{numberOfPlaces}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Trip Cost:</strong>
                                            <span className='fs-5'>{totalCost}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowTicketModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

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