import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import "../Componants/bookstyle.css"
import logo from "../logo/neew llogo.png"

const BookingPage = () => {
    const location = useLocation();
    const trip = location.state?.trip;
    const company = location.state.company;

    const [numPlaces, setNumPlaces] = useState(1); // default value to 1
    const [showModal, setShowModal] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [onlinePaymentMethod, setOnlinePaymentMethod] = useState('');
    const [agreeToPayDeposit, setAgreeToPayDeposit] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [bookingData, setBookingData] = useState({});
    const [userName, setUserName] = useState('');
    const [bookedTrips, setBookedTrips] = useState([]);




    useEffect(() => {
        const tripPrice = parseFloat(trip.price.replace(/[^\d\.]/g, '')); // extract numeric value from string
        const subTotal = numPlaces * tripPrice;
        const discountAmount = subTotal * 0.10; // 10% discount
        const tax = (subTotal - discountAmount) * 0.14;
        setSubTotal(subTotal);
        setDiscountAmount(discountAmount);
        setTax(tax);
        setTotalCost(subTotal - discountAmount + tax);
    }, [numPlaces, trip.price]);

    const handleIncrement = () => {
        if (numPlaces < trip.availablePlaces) {
            setNumPlaces(numPlaces + 1);
        } else {
            setShowModal(true);
        }
    };

    const handleDecrement = () => {
        if (numPlaces > 1) {
            setNumPlaces(numPlaces - 1);
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



    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedBookedTrips = localStorage.getItem('bookedTrips');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        if (storedBookedTrips) {
            setBookedTrips(JSON.parse(storedBookedTrips));
        }
    }, []);

    const handleBookNow = () => {
        if (paymentMethod && (paymentMethod === 'payOnline' && onlinePaymentMethod) || (paymentMethod === 'payCash' && agreeToPayDeposit)) {
            const tripInfo = {
                tripNumber: trip.tripNumber,
                tripDate: trip.tripDate,
                departureStation: trip.departureStation,
                stopStations: trip.stopStations,
                departureTime: trip.departureTime,
                arrivedTime: trip.arrivedTime,
                tripPrice: trip.price,
                company: company.name,
                userName: userName,
                totalCost: totalCost,
                numPlaces: numPlaces,
            };

            const newBookedTrips = [...bookedTrips, tripInfo];
            setBookedTrips(newBookedTrips);

            localStorage.setItem('bookedTrips', JSON.stringify(newBookedTrips));
            setPaymentMethod('');
            setBookingData(tripInfo);
            setOnlinePaymentMethod('');
            setAgreeToPayDeposit(false);
            setShowTicketModal(true)
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="left-col py-2">
                    {/* Left column content */}
                    <Card className="shadow-sm">
                        <Card.Header className="text-center">
                            <img src={company.image} className="img-fluid mb-3" />
                            <h2 className="text-center mb-4">Your Trip with {company.name}</h2>
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
                                    <span className='fs-5'>{trip.tripDate}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Departure Station:</span>
                                    <span className='fs-5'>{trip.departureStation}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Stop Stations:</span>
                                    <span className='fs-5'>{trip.stopStations}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Departure Time:</span>
                                    <span className='fs-5'>{trip.departureTime}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span className="font-weight-bold fs-5">Arrival Time:</span>
                                    <span className='fs-5'>{trip.arrivedTime}</span>
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
                                <Form.Group controlId="numPlaces">
                                    <Form.Label>Number of Places:</Form.Label>
                                    <div className="input-group">
                                        <Button variant="secondary" onClick={handleDecrement} disabled={numPlaces === 1}>
                                            -
                                        </Button>
                                        <Form.Control type="text" value={numPlaces} readOnly />
                                        <Button variant="secondary" onClick={handleIncrement} disabled={numPlaces === trip.availablePlaces}>
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

                                <Form.Group controlId="paymentMethod" className="text-center">
                                    <Form.Label className='fs-5'>Payment Method:</Form.Label>
                                    <div className="d-flex justify-content-between">
                                        <div className='d-flex flex-column justify-content-center w-50'>
                                            <div className="px-auto py-2 ">
                                                <Form.Check type="radio" className='border-primary' name="paymentMethod" id="payOnline" onChange={(e) => setPaymentMethod('payOnline')} />
                                            </div>
                                            <div className='px-auto py-3'>
                                                <b className='fs-5'>Pay Online</b>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column justify-content-center w-50 border-2'>
                                            <div className='px-auto py-2'>
                                                <Form.Check type="radio" name="paymentMethod" id="payCash" onChange={(e) => setPaymentMethod('payCash')} />
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
                                                <Form.Check type="checkbox" label="Visa" id="visa"
                                                    onChange={handleOnlinePaymentMethodChange} />
                                            </li>
                                            <li>
                                                <Form.Check type="checkbox" label="Mastercard" id="mastercard"
                                                    onChange={handleOnlinePaymentMethodChange} />
                                            </li>
                                            <li>
                                                <Form.Check type="checkbox" label="PayPal" id="paypal"
                                                    onChange={handleOnlinePaymentMethodChange} />
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

                                {paymentMethod && (
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleBookNow}
                                        className="mt-3 d-flex mx-auto justify-content-center w-75"
                                        disabled={!paymentMethod ||
                                            (paymentMethod === 'payOnline' && !onlinePaymentMethod) ||
                                            (paymentMethod === 'payCash' && !agreeToPayDeposit)}
                                    >
                                        Book Now
                                    </Button>
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
                                <img src={logo} className='w-100  my-auto h-100 rounded-3' />
                            </div>
                            <div className='custom-dashed-border'></div>
                            <div className="ticket-container bg-dark-subtle w-100 rounded-3 p-2">
                                <div className="ticket-header d-flex justify-content-between">
                                    <div>
                                        <h4>Mr/Ms.{userName}</h4>
                                        <strong>Trip Number:</strong> {bookingData.tripNumber}
                                    </div>
                                    <div>
                                    <h4 className='text-end'>{company.name}</h4>
                                    <strong>Trip Date:</strong> {bookingData.tripDate}

                                    </div>
                                </div>
                                <hr/>
                                <div className="ticket-body">
                                <ul className="list-unstyled">
                                <li className="d-flex justify-content-between">
                                    <strong className="font-weight-bold fs-5">Departure Station:</strong>
                                    <span className='fs-5'>{bookingData.departureStation}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <strong className="font-weight-bold fs-5">Stop Stations:</strong>
                                    <span className='fs-5'>{bookingData.stopStations}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <strong className="font-weight-bold fs-5">Departure Time:</strong>
                                    <span className='fs-5'>{bookingData.departureTime}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <strong className="font-weight-bold fs-5">Arrival Time:</strong>
                                    <span className='fs-5'>{bookingData.arrivedTime}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <strong className="font-weight-bold fs-5">Number of places:</strong>
                                    <span className='fs-5'>{bookingData.numPlaces}</span>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <strong className="font-weight-bold fs-5">Trip Cost:</strong>
                                    <span className='fs-5'>{bookingData.totalCost}</span>
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