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

  // State for pagination of bookings
  const [currentBookingsPage, setCurrentBookingsPage] = useState(1);
  const bookingsPerPage = 4; // Adjust this number based on how many items you want per page for bookings

  // Pagination logic for bookings
  const totalBookingsPages = Math.ceil(userBookings.length / bookingsPerPage);
  const bookingsStartIndex = (currentBookingsPage - 1) * bookingsPerPage;
  const bookingsEndIndex = bookingsStartIndex + bookingsPerPage;
  const currentBookingsPageItems = userBookings.slice(bookingsStartIndex, bookingsEndIndex);
  const params = useParams();
  const [editTrip, setEditTrip] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [userNames, setUserNames] = useState({});

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
  
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    // Handle the change of the new trip data
  const handleNewTripChange = (event) => {
      setNewTrip({
        ...newTrip,
        [event.target.name]: event.target.value,
      });
    };
  
 // Decode token to get company info
  console.log(decodedToken)
  const companyId = decodedToken.user_id;
  console.log("companyy:",companyId)

    
  useEffect(() => {
      if (!token) {
        console.warn('No token found');
        return;
      }

      axios.get(`http://127.0.0.1:8000/mixinuser_pk/${companyId}?user_type=company`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { name ,company_trips } = res.data
          setName(name);
          setTrips(company_trips);

          // Extract the trip IDs associated with the company
          const tripIds = company_trips.map((trip) => trip.id);
          // Fetch all bookings
          axios.get('http://127.0.0.1:8000/booking/data/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((bookingRes) => {
            const allBookings = bookingRes.data;

            // Filter bookings for trips that belong to the logged-in company
            const filteredBookings = allBookings.filter((booking) =>
              tripIds.includes(booking.trip)
            );
            setUserBookings(filteredBookings);
            // For each booking, fetch the user name based on user ID
            const userNameMap = {};
        
            // For each booking, fetch the user name based on user ID
            const userFetchPromises = filteredBookings.map((booking) => {
              return fetchUserName(booking.user).then(userName => {
                userNameMap[booking.user] = userName; // Store in mapping
              });
            });

            Promise.all(userFetchPromises).then(() => {
              setUserNames(userNameMap); // Set the user names mapping state
            });
      })
          .catch((err) => console.error("Error fetching bookings:", err));
        })
        .catch((err) => console.error("Error fetching trips:", err));
      }, [params.id, setEditTrip]);

      const fetchUserName = async (userId) => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/mixinuser_pk/${userId}?user_type=user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data.name; // Return the user name
        } catch (err) {
          console.error("Error fetching user name:", err);
          return ""; // Return an empty string if there's an error
        }
      };

  // handle accept/reject status
  const handleBookingStatus = (bookingId, status) => {
    
    // Send the status update to the backend
    axios.patch(`http://127.0.0.1:8000/booking/${bookingId}/update-status/`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Update the UI with the new status
        setUserBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: response.data.status } : booking
          )
        );
      })
      .catch((error) => {
        console.error("Error updating booking status:", error);
      });
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
  
    const errors = validateForm(formData); // Validate the form data
    if (Object.keys(errors).length === 0) {
      const updatedFormData = {
        ...formData,
        company: companyId, 
      };
  
      console.log("Form submitted with data:", updatedFormData);
      axios.put(`http://127.0.0.1:8000/selected/trip/${formData.id}`, updatedFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Updated trip data:", res.data);
          setTrips((prevTrips) => 
              prevTrips.map((trip) => 
                  trip.id === formData.id ? { ...trip, ...res.data } : trip
              )
          );
          setShowEditModal(false);
          setFormData({});
        })
        .catch((err) => console.error("Error updating trip:", err));
    } else {
      setValidationErrors(errors); // Set validation errors to display under the fields
    }
  };
  
  
  const handleBookingsPageChange = (pageNumber) => {
    setCurrentBookingsPage(pageNumber);
  };

  const handleBookingsNext = () => {
    if (currentBookingsPage < totalBookingsPages) {
      setCurrentBookingsPage((prev) => prev + 1);
    }
  };

  const handleBookingsPrevious = () => {
    if (currentBookingsPage > 1) {
      setCurrentBookingsPage((prev) => prev - 1);
    }
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

  const validateForm = (tripData) => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];
  
    const { tripNumber, date: tripDate, avilabalPlaces: avilabalPlaces, departuerStation: departuerStation, destinationStation, departuerTime: departuerTime, destinationTime: arrivedTime, price, status, bus } = tripData;
  
    // Validate tripNumber
    if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) {
      errors.tripNumber = "Trip number must be a positive number.";
    }
  
    // Validate tripDate
    if (!tripDate) {
      errors.date = "Trip date is required.";
    } else if (tripDate < today) {
      errors.date = "Trip date cannot be in the past.";
    }
  
    // Validate availablePlaces
    if (!avilabalPlaces || isNaN(avilabalPlaces) || avilabalPlaces <= 0) {
      errors.avilabalPlaces = "Available places must be a positive number.";
    }
  
    // Validate departureStation
    if (!departuerStation || typeof departuerStation !== 'string' || departuerStation.trim() === '' || /\d/.test(departuerStation) || departuerStation.split(' ').some(word => word.length < 3)) {
      errors.departuerStation = "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
    }
  
    // Validate destinationStation
    if (!destinationStation || typeof destinationStation !== 'string' || destinationStation.trim() === '') {
      errors.destinationStation = "Destination station is required.";
    }
  
    // Validate departureTime
    if (!departuerTime) {
      errors.departuerTime = "Departure time is required.";
    }
  
    // Validate arrivedTime
    if (!arrivedTime) {
      errors.arrivedTime = "Arrival time is required.";
    } else if (arrivedTime && departuerTime && arrivedTime <= departuerTime) {
      errors.arrivedTime = "Arrival time must be after departure time.";
    }
  
    // Validate price
    if (!price || isNaN(price) || price <= 0) {
      errors.price = "Price must be a positive number.";
    }
  
    // Validate status (optional but required for edit)
/*     if (!status || typeof status !== 'string' || status.trim() === '') {
      errors.status = "Status is required.";
    } */
  
    // Validate bus
    if (!bus || isNaN(bus) || bus <= 0) {
      errors.bus = "Bus must be a valid number.";
    }
  
    return errors;
  };
  
  

  const handleAddTrip = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Adding trip with data:", newTrip); // Log the trip data
  
    const errors = validateForm(newTrip); // Validate the new trip data
    console.log("Validation Errors:", errors);
    if (Object.keys(errors).length === 0) {
      const tripData = {
        ...newTrip,
        company: companyId, // Add the company ID from the token
      };
  
      // Make the POST request to add the new trip
      axios.post("http://localhost:8000/all/trips/", tripData, {
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
    } else {
      // Set validation errors to display under the fields
      setValidationErrors(errors);
    }
  };
  
  
  const confirmDelete = () => {
    axios.delete(`http://127.0.0.1:8000/selected/trip/${selectedTrip.id}`, {
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
      <div className="row main" >

        <div className="col-md-9 my-2">
          <h2 className="text-center my-3 text-bold ">{view === 'trips' ? `Trips of ${companyName}` : `Bookings for ${companyName}`}</h2>
          <ul className="nav justify-content-center py-2">
            <li className="nav-item">
              <button
                className={`list-group-item list-group-item-action p-2 ${view === 'trips' ? 'active' : ''}`}
                onClick={() => setView('trips')}
              >
                List Trips
              </button></li>
            <li className="nav-item">
              <button
                className={`list-group-item list-group-item-action  p-2  ${view === 'bookings' ? 'active' : ''}`}
                onClick={() => setView('bookings')}
              >
                List Bookings
              </button></li>
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
              {/* Add Trip Button Section */}
              <div className="text-end mt-3 mb-3">
                <span>Want to add a new trip ? </span>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Trip</button>
              </div>
                  
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
                <div className="table-responsive">
                  <table className="table table-striped table-bordered w-100">
                    <thead>
                      <tr>
                        <th>Trip Number</th>
                        <th>User Name</th>
                        <th>Trip Date</th>
                        <th>Pickup Location</th>
                        <th>Drop Location</th>
                        <th>Seats Booked</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookingsPageItems.map((booking, index) => (
                        <tr key={index}>
                          <td>{booking.trip}</td>
                          <td>{userNames[booking.user]}</td>
                          <td>{booking.date}</td>
                          <td>{booking.pickupLocation}</td>
                          <td>{booking.dropLocation}</td>
                          <td>{booking.numberOfPlaces}</td>
                          <td>{booking.totalFare}</td>
                          <td>{booking.status || 'Pending'}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm mx-1"
                              onClick={() => handleBookingStatus(booking.id, 'Accepted')}
                              disabled={booking.status === 'Accepted'}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger btn-sm mx-1"
                              onClick={() => handleBookingStatus(booking.id, 'Rejected')}
                              disabled={booking.status === 'Rejected'}
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
                {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
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
                {validationErrors.date && <p className="text-danger">{validationErrors.date}</p>}
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
                {validationErrors.avilabalPlaces && <p className="text-danger">{validationErrors.avilabalPlaces}</p>}
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
                {validationErrors.departuerStation && <p className="text-danger">{validationErrors.departuerStation}</p>}
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
                {validationErrors.destinationStation && <p className="text-danger">{validationErrors.destinationStation}</p>}
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
                {validationErrors.departuerTime && <p className="text-danger">{validationErrors.departuerTime}</p>}
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
                {validationErrors.destinationTime && <p className="text-danger">{validationErrors.destinationTime}</p>}
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
                 {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
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
                {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
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
                 {validationErrors.date && <p className="text-danger">{validationErrors.date}</p>}
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
                 {validationErrors.avilabalPlaces && <p className="text-danger">{validationErrors.avilabalPlaces}</p>}
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
                 {validationErrors.departuerStation && <p className="text-danger">{validationErrors.departuerStation}</p>}
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
                 {validationErrors.destinationStation && <p className="text-danger">{validationErrors.destinationStation}</p>}
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
                 {validationErrors.departuerTime && <p className="text-danger">{validationErrors.departuerTime}</p>}
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
                 {validationErrors.destinationTime && <p className="text-danger">{validationErrors.destinationTime}</p>}
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
                 {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  disabled
                />
                 {/* {validationErrors.status && <p className="text-danger">{validationErrors.status}</p>} */}
              </div>
              <div className="form-group">
                <label>Bus</label>
                <input
                  type="number"
                  name="bus"
                  value={formData.bus}
                  onChange={handleChange}
                  className="form-control"
                />
                 {validationErrors.bus && <p className="text-danger">{validationErrors.bus}</p>}
              </div>
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
