import { useLocation } from 'react-router-dom';
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import "../Componants/bookstyle.css"
import logo from "../logo/neew llogo.png"
import axios from 'axios';

const BookingPage = () => {
    const location = useLocation();
    const trip = location.state?.trip;
    const company = location.state.company || {};

    const [showModal, setShowModal] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [onlinePaymentMethod, setOnlinePaymentMethod] = useState('paypal');
    const [agreeToPayDeposit, setAgreeToPayDeposit] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [bookingData, setBookingData] = useState({});
    const [userName, setUserName] = useState('');
    const [bookedTrips, setBookedTrips] = useState([]);
    const [time, setTime] = useState('');
    const [numberOfPlaces, setNumberOfPlaces] = useState(1);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [userId, setUserId] = useState(1);
    const [paypalAmount, setPaypalAmount] = useState(100);
    const [bookingID,setBookingId] = useState();


    useEffect(() => {
        const tripPrice = parseFloat(trip.price.replace(/[^\d\.]/g, '')); // extract numeric value from string
        const subTotal = numberOfPlaces * tripPrice;
        const discountAmount = subTotal * 0.10; // 10% discount
        const tax = (subTotal - discountAmount) * 0.14;
        setSubTotal(subTotal);
        setDiscountAmount(discountAmount);
        setTax(tax);
        setTotalCost(subTotal - discountAmount + tax);
    }, [numberOfPlaces, trip.price]);

    const handleIncrement = () => {
        if (numberOfPlaces < trip.availablePlaces) {
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

    const handleOnlinePaymentMethodChange = (e) => {
        setOnlinePaymentMethod(e.target.id);
    };

    const handleAgreeToPayDepositChange = (e) => {
        setAgreeToPayDeposit(e.target.checked);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handlePaypalAmountChange = () => {
        if (paymentMethod === 'payOnline') {
            setPaypalAmount(totalCost.toFixed(2));
        } else if (paymentMethod === 'payCash') {
            setPaypalAmount((totalCost * 0.20).toFixed(2)); // 20% deposit
        }
    };

    useEffect(() => {
        handlePaypalAmountChange();
    }, [paymentMethod]);

    const handleBookNow = () => {
        if (paymentMethod && (paymentMethod === 'payOnline' && onlinePaymentMethod) || (paymentMethod === 'payCash' && agreeToPayDeposit)) {
            const tripInfo = {
                tripNumber: trip.tripNumber,
                tripDate: trip.tripDate,
                departureStation: trip.departuerStation,
                stopStations: trip.destinationStation,
                departureTime: trip.departuerTime,
                arrivedTime: trip.destinationTime,
                tripPrice: trip.price,
                company: "go bus",
                userName: userName,
                totalCost: totalCost,
                numPlaces: numberOfPlaces,
            };
    
            const newBookedTrips = [...bookedTrips, tripInfo];
            setBookedTrips(tripInfo);
    
            // localStorage.setItem('bookedTrips', JSON.stringify(newBookedTrips));
            setPaymentMethod('');
            // setBookingData(tripInfo);
            setOnlinePaymentMethod('');
            setAgreeToPayDeposit(false);
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
                    setUserId(userId)
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
    
                    return new Promise((resolve, reject) => {
                        axios.post('http://127.0.0.1:8000/booking/data/', bookingData, {
                          headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                          }
                        })
                          .then((response) => {
                            const bookingId = response.data.id;
                            setBookingId(bookingId);
                            resolve(bookingId); // Resolve the promise with the booking ID
                          })
                          .catch((error) => {
                            console.error(error);
                            reject(error); // Reject the promise with the error
                          });
                      });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    const handelPayment=(bookingId)=>{
       
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const paymentData = {
            date: new Date(),
            amount: paypalAmount,
            payment_method: paymentMethod,
            booking_id : bookingId,
            trip_id: trip.id,
            user: userId , // Add the user object with ID
            trip: trip.id ,
            booking : bookingId,
            
        };

        axios.post('http://127.0.0.1:8000/payments/', paymentData, {headers})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="left-col py-2">
                    {/* Left column content */}
                    <Card className="shadow-sm">
                        <Card.Header className="text-center">
                            <img src={logo} className="img-fluid mb-3" />
                            <h2 className="text-center mb-4">Your Trip with {"go bus"}</h2>
                        </Card.Header>

                        <Card.Body className="px-4 py-3">
                            <h5 className="mb-3">Trip Details</h5>
                            <ul className="list-unstyled">
                                <li className="d-flex justify-content-between">
                                    <strong className='fs-5'>Your Trip Number:</strong>
                                    <span className='fs-5'>{trip.tripNumber}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Trip Date:</span>
                                    <span className='fs-5'>{trip.date}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Departure Station:</span>
                                    <span className='fs-5'>{trip.departuerStation}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Stop Stations:</span>
                                    <span className='fs-5'>{trip.destinationStation}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Departure Time:</span>
                                    <span className='fs-5'>{trip.departuerTime}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Arrival Time:</span>
                                    <span className='fs-5'>{trip.destinationTime}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Trip Price:</span>
                                    <span className='fs-5'>{trip.price}</span>
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
                                        <Form.Control type="number" value={numberOfPlaces} onChange={(e) => setNumberOfPlaces(e.target.value)} />
                                        <Button variant="secondary" className='w-25 btn btn-lg' onClick={handleIncrement} disabled={numberOfPlaces === trip.availablePlaces}>
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
                                    <Form.Control type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="dropLocation">
                                    <Form.Label>Drop Location:</Form.Label>
                                    <Form.Control type="text" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="paymentMethod" className="text-center">
                                    <Form.Label className='fs-5'>Payment Method:</Form.Label>
                                    <div className="d-flex justify-content-between">
                                        <div className='d-flex flex-column justify-content-center w-50'>
                                            <div className="px-auto py-2 ">
                                                <Form.Check type="radio" className='border-primary' name="paymentMethod" id="payOnline" value="payOnline" onChange={(e) => {
                                                    handlePaymentMethodChange(e);
                                                    handlePaypalAmountChange(e);
                                                }} />
                                            </div>
                                            <div className='px-auto py-3'>
                                                <b className='fs-5'>Pay Online</b>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column justify-content-center w-50 border-2'>
                                            <div className='px-auto py-2'>
                                                <Form.Check type="radio" name="paymentMethod" id="payCash" value="payCash" onChange={(e) => {
                                                    handlePaymentMethodChange(e);
                                                    handlePaypalAmountChange(e);
                                                }} />
                                            </div>
                                            <div className='px-auto py-3'>
                                                <b className='fs-5'>Pay Cash</b>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                                {paymentMethod === 'payOnline' && (
                                    <div className=" p-3">
                                        <h5 className="">Online Payment Methods:</h5>
                                        <ul className="list-unstyled">
                                           
                                            <li>
                                                <Form.Check type="checkbox" label="PayPal" id="paypal"
                                                    onChange={(e) => {
                                                        handleOnlinePaymentMethodChange(e);
                                                        setOnlinePaymentMethod(e.target.id);
                                                    }} />
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {paymentMethod === 'payCash' && (
                                    <div className=" p-3">
                                        <h5 className=" fs-5">Pay Cash:</h5>
                                        <p className="">You need to pay a deposit of 20% of the total cost.</p>
                                        <Form.Group controlId="deposit">
                                            <Form.Check type="checkbox" label="I agree to pay the deposit" id="deposit" onChange={handleAgreeToPayDepositChange} />
                                        </Form.Group>
                                        <p className="fs-5 text-danger">Deposit amount: {totalCost * 0.20}</p>
                                    </div>
                                )}

                                {(paymentMethod && (paymentMethod === 'payOnline' && onlinePaymentMethod === 'paypal') || (paymentMethod === 'payCash' && agreeToPayDeposit)) && (
                                    <PayPalScriptProvider
                                        src="https://www.paypal.com/sdk/js"
                                        options={{
                                            'client-id': 'ASqEJBR1uVuEmIcx5WxO26SQMcW9DKTNy090VaVbCczbnEvsV2Lz5xSV2oc1dIErzoIy8ldjBUZqY4M5',
                                            currency: "USD",
                                            intent: 'capture',

                                        }}
                                        deferLoading={false}
                                    >
                                        <PayPalButtons
                                            amount={Math.round(paypalAmount * 100) / 100}
                                            currency="USD"
                                            style={{ layout: 'horizontal' }}
                                            createOrder={(data, actions) => {
                                                const paymentIntent = actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: Math.round(paypalAmount * 100) / 100,
                                                            },
                                                        },
                                                    ],
                                                });
                                                console.log('Payment intent:', paymentIntent);
                                                return paymentIntent;
                                            }}
                                            onApprove={(data, actions) => {
                                                const authorization = actions.order.capture({
                                                    paymentIntentId: data.paymentIntentId,
                                                });
                                                console.log('Authorization:', authorization);
                                                return authorization.then((details) => {
                                                    handleBookNow().then((bookingId) => {
                                                        handelPayment(bookingId);
                                                      });
                                                });
                                            }}
                                        />
                                    </PayPalScriptProvider>
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
                                        <strong>Trip Number:</strong> {trip.tripNumber}
                                    </div>
                                    <div>
                                        <h4 className='text-end'>{"go bus"}</h4>
                                        <strong>Trip Date:</strong> {trip.date}

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
                                            <span className='fs-5'>{trip.departuerTime}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Arrival Time:</strong>
                                            <span className='fs-5'>{trip.destinationTime}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Number of places:</strong>
                                            <span className='fs-5'>{bookedTrips.numPlaces}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Amount you pay:</strong>
                                            <span className='fs-5'>{paypalAmount}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong className="font-weight-bold fs-5">Trip Cost:</strong>
                                            <span className='fs-5'>{bookedTrips.totalCost}</span>
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