import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import './DisplayTrips.css'; // Import the CSS file for styling
import AddTripForm from '../addtrip';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const DisplayTrips = () => {
  const [trips, setTrips] = useState([]);
  const [companyName, setName] = useState("")
  const [userBookings, setUserBookings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Adjust this number based on how many items you want per page
  const [view, setView] = useState('trips'); // New state for view toggle
<<<<<<< HEAD
  const loggedInCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
=======
  // State for pagination of bookings
  const [currentBookingsPage, setCurrentBookingsPage] = useState(1);
  const bookingsPerPage = 4; // Adjust this number based on how many items you want per page for bookings

  // Pagination logic for bookings
  const totalBookingsPages = Math.ceil(userBookings.length / bookingsPerPage);
  const bookingsStartIndex = (currentBookingsPage - 1) * bookingsPerPage;
  const bookingsEndIndex = bookingsStartIndex + bookingsPerPage;
  const currentBookingsPageItems = userBookings.slice(bookingsStartIndex, bookingsEndIndex);
<<<<<<< HEAD
  const params = useParams();
  const [editTrip, setEditTrip] = useState(null);
=======
>>>>>>> d52f44c3626a95062b8997ce13f6c9ba759feabe
>>>>>>> tripsOfCompanies

    //--------------------------------Add new Trip-------------------------
  const [newTrip, setNewTrip] = useState({
      tripNumber: "",
      date: "",
      avilabalPlaces: "",
      departuerStation: "",
      destinationStation: "",
      departuerTime: "",
      destinationTime: "",
      price: "",
      bus: "",
    });
  
  
    // Handle the change of the new trip data
  const handleNewTripChange = (event) => {
      setNewTrip({
        ...newTrip,
        [event.target.name]: event.target.value,
      });
    };
  
    //---------------------------------------------------------------------
  

  const token = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(token); // Decode token to get company info
  console.log(decodedToken)
  const companyId = decodedToken.user_id;
  console.log("companyy:",companyId)

    
  useEffect(() => {

     
      if (!token) {
        console.warn('No token found');
        return;
      }

      axios
      .get(`http://127.0.0.1:8000/mixinuser_pk/${companyId}?user_type=company`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { name ,company_trips } = res.data
          setName(name);
          setTrips(company_trips);
        })
        .catch((err) => console.error("Error fetching trips:", err));
    }, [params.id, setEditTrip]);


/*   const fetchUserBookings = (companyName) => {
    const bookings = JSON.parse(localStorage.getItem('bookedTrips')) || [];
    const companyBookings = bookings.filter((booking) => booking.company === companyName);
    setUserBookings(companyBookings);
  }; */

  // handle accept/reject status
  const handleBookingStatus = (booking, status) => {
    const updatedBooking = { ...booking, status };
    const updatedBookings = userBookings.map((b) =>
      b.tripNumber === booking.tripNumber ? updatedBooking : b
    );
    setUserBookings(updatedBookings);

    // Save the updated bookings to local storage
    const allBookings = JSON.parse(localStorage.getItem('bookedTrips')) || [];
    const newBookings = allBookings.map((b) =>
      b.tripNumber === booking.tripNumber ? updatedBooking : b
    );
    localStorage.setItem('bookedTrips', JSON.stringify(newBookings));
  };


  // Pagination logic
  const totalPages = Math.ceil(trips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = trips.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
  
    axios
      .put(` http://127.0.0.1:8000/selected/trip/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrips((prevTrips) =>
          prevTrips.map((trip) => (trip.id === formData.id ? res.data : trip))
        );
        setShowEditModal(false);
        setFormData({});
      })
      .catch((err) => console.error("Error updating trip:", err));
  };
  
  const handleBookingsPageChange = (pageNumber) => {
    setCurrentBookingsPage(pageNumber);
  };

  const handleBookingsNext = () => {
    setCurrentBookingsPage((prev) => Math.min(prev + 1, totalBookingsPages));
  };

  const handleBookingsPrevious = () => {
    setCurrentBookingsPage((prev) => Math.max(prev - 1, 1));
  };

  const handleEditClick = (trip) => {
    setFormData({
      tripNumber: trip.tripNumber,
      date: trip.date,
      avilabalPlaces: trip.avilabalPlaces,
      departuerStation: trip.departuerStation,
      destinationStation: trip.destinationStation,
      departuerTime: trip.departuerTime,
      destinationTime: trip.destinationTime,
      price: trip.price,
      status: trip.status,
      bus: trip.bus,
      id: trip.id, // Ensure to capture the trip ID for the update
    });
    setShowEditModal(true);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteClick = (trip) => {
    setSelectedTrip(trip);
    setShowDeleteModal(true);
  };
  const handleAddTrip = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Adding trip with data:", newTrip); // Log the trip data
  
    // Open the modal first
    setShowAddModal(true);
  
    // Make the POST request to add the new trip
    axios
      .post("http://localhost:8000/all/trips/", newTrip, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Trip added:", res.data);
        setTrips((prevTrips) => [...prevTrips, res.data]); // Update the trips state with the new trip
        setNewTrip({
          tripNumber: "",
          date: "",
          avilabalPlaces: "",
          departuerStation: "",
          destinationStation: "",
          departuerTime: "",
          destinationTime: "",
          price: "",
          bus: "",
        }); // Reset newTrip state
        setShowAddModal(false); // Close the modal
      })
      .catch((err) => {
        console.error("Error adding trip:",  err.response ? err.response.data : err.message); // Log the error
        setShowAddModal(false); // Close the modal even if there's an error
      });
  };
  

  const handleEditTrip = (trip, company) => {
    setEditTrip(trip);
   /*  setCompany(company); */
    setFormData({
      tripNumber: trip.tripNumber,
      date: trip.date,
      avilabalPlaces: trip.avilabalPlaces,
      departuerStation: trip.departuerStation,
      destinationStation: trip.destinationStation,
      departuerTime: trip.departuerTime,
      destinationTime: trip.destinationTime,
      status: trip.status,
      price: trip.price,
      user: trip.user,
      bus: trip.bus,
      book: trip.book,
    });
    setShowEditModal(true);
  };

  const handleDeleteTrip = (trip, company) => {
    setEditTrip(trip);
    /* setCompany(company); */
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/selected/trip/${selectedTrip.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== selectedTrip.id));
        setShowDeleteModal(false);
      })
      .catch((err) => console.error("Error deleting trip:", err));
  };
 
  const cancelDelete = () => {
    setShowDeleteModal(false); // Hide the modal without deleting
  };

  return (
    <div className="container mt-2 ">
      <div className="row" class='main'>

        <div className="col-md-9 my-2">
          <h2 className="text-center my-3 text-bold ">{view === 'trips' ? `Trips of ${companyName}` : `Bookings for ${companyName}`}</h2>
          <ul class="nav justify-content-center py-2">
            <li class="nav-item">
              <button
                className={`list-group-item list-group-item-action p-2 ${view === 'trips' ? 'active' : ''}`}
                onClick={() => setView('trips')}
              >
                List Trips
              </button>          </li>
            <li class="nav-item">
              <button
                className={`list-group-item list-group-item-action  p-2  ${view === 'bookings' ? 'active' : ''}`}
                onClick={() => setView('bookings')}
              >
                List Bookings
              </button>          </li>
            <li class="nav-item">
              <button className="list-group-item list-group-item-action p-2" onClick={() => setShowAddModal(true)}>Add Trip</button>
            </li>

          </ul>
          {view === 'trips' && (
            <>
              {currentPageItems.length ? (
                <div className="table-responsive col-sm-6 col-md-12">
                  <table className="table table-striped">
                    <thead className=''>
                      <tr>
                        <th>Trip Number</th>
                        <th>Trip Date</th>
                        <th>Available Places</th>
                        <th>Departure Station</th>
                        <th>Stop Stations</th>
                        <th>Departure Time</th>
                        <th>Arrived Time</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageItems.map((trip) => (
                        <tr key={trip.id}>
                          <td>{trip.tripNumber}</td>
                          <td>{trip.date}</td>
                          <td>{trip.avilabalPlaces}</td>
                          <td>{trip.departuerStation}</td>
                          <td>{trip.destinationStation}</td>
                          <td>{trip.departuerTime}</td>
                          <td>{trip.destinationTime}</td>
                          <td>{trip.price}</td>
                          <td>{trip.status}</td>
                          <td>
                            <button className='btn btn-outline-primary btn-sm mx-1' onClick={() => handleEditClick(trip)}>Edit</button>
                          </td>
                          <td>
                            <button className='btn btn-outline-danger btn-sm mx-1' onClick={() => handleDeleteClick(trip)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">No trips found for this company.</p>
              )}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevious}>Previous</button>
                  </li>
                  {[...Array(totalPages).keys()].map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNext}>Next</button>
                  </li>
                </ul>
              </nav>
            </>
          )}
          {view === 'bookings' && (
            <>
              {currentBookingsPageItems.length ? (
                <div className="table-responsive col-sm-6 col-md-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Trip Number</th>
                        <th>User Name</th>
                        <th>Trip Date</th>
                        <th>Departure Station</th>
                        <th>Arrival Station</th>
                        <th>Seats Booked</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookingsPageItems.map((booking, index) => (
                        <tr key={index}>
                          <td>{booking.tripNumber}</td>
                          <td>{booking.userName}</td>
                          <td>{booking.tripDate}</td>
                          <td>{booking.departureStation}</td>
                          <td>{booking.stopStations}</td>
                          <td>{booking.numPlaces}</td>
                          <td>{booking.tripPrice}</td>
                          <td>{booking.status || 'Pending'}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm mx-1"
                              onClick={() => handleBookingStatus(booking, 'Accepted')}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger btn-sm mx-1"
                              onClick={() => handleBookingStatus(booking, 'Rejected')}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination Controls for Bookings */}
                  <nav aria-label="Bookings page navigation example">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentBookingsPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleBookingsPrevious}>Previous</button>
                      </li>
                      {[...Array(totalBookingsPages).keys()].map((pageNumber) => (
                        <li key={pageNumber} className={`page-item ${currentBookingsPage === pageNumber + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => handleBookingsPageChange(pageNumber + 1)}>{pageNumber + 1}</button>
                        </li>
                      ))}
                      <li className={`page-item ${currentBookingsPage === totalBookingsPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleBookingsNext}>Next</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                <p className="text-center">No bookings found for this company.</p>
              )}
            </>
          )}

        </div>
      </div>

      {showAddModal && (
        <Modal
          id="add-trip-modal"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        >
          <ModalHeader closeButton>
            <ModalTitle>Add Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form id="add-trip-form" onSubmit={handleAddTrip}>
              <div className="form-group">
                <label>Trip Number:</label>
                <input
                  type="text"
                  name="tripNumber"
                  value={newTrip.tripNumber}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Trip Date:</label>
                <input
                  type="date"
                  name="date"
                  value={newTrip.date}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Available Places:</label>
                <input
                  type="number"
                  name="avilabalPlaces"
                  value={newTrip.avilabalPlaces}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Departure Station:</label>
                <input
                  type="text"
                  name="departuerStation"
                  value={newTrip.departuerStation}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Arrived Station:</label>
                <input
                  type="text"
                  name="destinationStation"
                  value={newTrip.destinationStation}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Departure Time:</label>
                <input
                  type="time"
                  name="departuerTime"
                  value={newTrip.departuerTime}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Arrived Time:</label>
                <input
                  type="time"
                  name="destinationTime"
                  value={newTrip.destinationTime}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={newTrip.price}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Bus</label>
                <input
                  type="number"
                  name="bus"
                  value={newTrip.bus}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add Trip
              </button>
            </form>
          </ModalBody>
        </Modal>
      )}
      ,
      {showEditModal && (
        <Modal
          id="edit-trip-modal"
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        >
          <ModalHeader closeButton>
            <ModalTitle>Edit Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form id="edit-trip-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Trip Number:</label>
                <input
                  type="text"
                  name="tripNumber"
                  value={formData.tripNumber}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Trip Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Available Places:</label>
                <input
                  type="number"
                  name="avilabalPlaces"
                  value={formData.avilabalPlaces}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Departure Station:</label>
                <input
                  type="text"
                  name="departuerStation"
                  value={formData.departuerStation}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Arrived Station:</label>
                <input
                  type="text"
                  name="destinationStation"
                  value={formData.destinationStation}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Departure Time:</label>
                <input
                  type="time"
                  name="departuerTime"
                  value={formData.departuerTime}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Arrived Time:</label>
                <input
                  type="time"
                  name="destinationTime"
                  value={formData.destinationTime}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {/* <div className="form-group">
                <label>User</label>
                <input
                  type="number"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="form-control"
                />
              </div> */}
              <div className="form-group">
                <label>Bus</label>
                <input
                  type="number"
                  name="bus"
                  value={formData.bus}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {/* <div className="form-group">
                <label>Book</label>
                <input
                  type="number"
                  name="book"
                  value={formData.book}
                  onChange={handleChange}
                  className="form-control"
                />
              </div> */}
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </form>
          </ModalBody>
        </Modal>
      )}
      ,
      {showDeleteModal && (
        <Modal
          id="delete-trip-modal"
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        >
          <ModalHeader closeButton>
            <ModalTitle>Delete Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this trip?</ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-danger"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelDelete}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      )}
  
    </div>
  );
};

export default DisplayTrips;
