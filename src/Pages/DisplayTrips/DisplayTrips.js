import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import './DisplayTrips.css'; // Import the CSS file for styling
import AddTripForm from '../addtrip' ;

const DisplayTrips = () => {
  const [trips, setTrips] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Adjust this number based on how many items you want per page
  const [view, setView] = useState('trips'); // New state for view toggle

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:4001/posts');
        getCompaniesTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
    if (storedCompany) {
      setCompanyName(storedCompany.name);
      fetchTrips();
      fetchUserBookings(storedCompany.name);
    } else {
      console.warn('No logged-in company found.');
    }
  }, []);

  const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));

  function getCompaniesTrips(data) {
    const allTrips = [];
    data.forEach((items) => {
      items?.companies?.forEach((company) => {
        if (company.id === storedCompany.id) {
          company.trips.forEach((element) => {
            allTrips.push(element);
          });
        }
      });
    });
    setTrips(allTrips);
  }

  const fetchUserBookings = (companyName) => {
    const bookings = JSON.parse(localStorage.getItem('bookedTrips')) || [];
    const companyBookings = bookings.filter((booking) => booking.company === companyName);
    setUserBookings(companyBookings);
  };

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
    handleUpdateTrip(formData);
    setShowEditModal(false);
  };

  const handleEditClick = (trip) => {
    setSelectedTrip({ ...trip, companyId: storedCompany.id });
    setFormData({
      tripNumber: trip.tripNumber,
      tripDate: trip.tripDate,
      availablePlaces: trip.availablePlaces,
      departureStation: trip.departureStation,
      stopStations: trip.stopStations,
      departureTime: trip.departureTime,
      arrivedTime: trip.arrivedTime,
      price: trip.price,
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
    setSelectedTrip({ ...trip, companyId: storedCompany.id });
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleUpdateTrip = (updatedTrip) => {
    axios.get('http://localhost:4001/posts')
      .then((response) => {
        if (response.data) {
          const updatedPosts = response.data.map((post) => {
            post.companies.forEach((company) => {
              if (company.id === selectedTrip.companyId) {
                company.trips = company.trips.map((trip) => {
                  if (trip.tripNumber === updatedTrip.tripNumber) {
                    return updatedTrip;
                  }
                  return trip;
                });
              }
            });
            return post;
          });
          axios.put('http://localhost:4001/posts', updatedPosts)
            .then(() => {
              axios.get('http://localhost:4001/posts')
                .then((response) => {
                  getCompaniesTrips(response.data);
                })
                .catch((error) => {
                  console.error('Error fetching trips:', error);
                });
              setShowEditModal(false);
            })
            .catch((error) => {
              console.error('Error updating trips:', error);
            });
        } else {
          console.error('Error fetching posts:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  const handleDeleteTrip = (trip) => {
    axios.get('http://localhost:4001/posts')
      .then((response) => {
        const updatedPosts = response.data.map((post) => {
          post.companies.forEach((company) => {
            if (company.id === selectedTrip.companyId) {
              company.trips = company.trips.filter((trip) => trip.tripNumber !== selectedTrip.tripNumber);
            }
          });
          return post;
        });
        axios.put('http://localhost:4001/posts', updatedPosts)
          .then(() => {
            axios.get('http://localhost:4001/posts')
              .then((response) => {
                getCompaniesTrips(response.data);
              })
              .catch((error) => {
                console.error('Error fetching trips:', error);
              });
            setShowDeleteModal(false);
          })
          .catch((error) => {
            console.error('Error deleting trips:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${view === 'trips' ? 'active' : ''}`}
              onClick={() => setView('trips')}
            >
              List Trips
            </button>
            <button
              className={`list-group-item list-group-item-action ${view === 'bookings' ? 'active' : ''}`}
              onClick={() => setView('bookings')}
            >
              List Bookings
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-center mb-4">{view === 'trips' ? `Trips of ${companyName}` : `Bookings for ${companyName}`}</h2>
          {view === 'trips' && (
            <>
            <div className='text-center'><button className="btn btn-primary center" onClick={() => setShowAddModal(true)}>Add Trip</button>
            </div>
              {currentPageItems.length ? (
                <div className="table-responsive col-sm-6 col-md-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Trip Number</th>
                      <th>Trip Date</th>
                      <th>Available Places</th>
                      <th>Departure Station</th>
                      <th>Stop Stations</th>
                      <th>Departure Time</th>
                      <th>Arrived Time</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageItems.map((trip, index) => (
                      <tr key={index}>
                        <td>{trip.tripNumber}</td>
                        <td>{trip.tripDate}</td>
                        <td>{trip.availablePlaces}</td>
                        <td>{trip.departureStation}</td>
                        <td>{trip.stopStations}</td>
                        <td>{trip.departureTime}</td>
                        <td>{trip.arrivedTime}</td>
                        <td>{trip.price}</td>
                        <td>
                          <button className='btn btn-outline-info btn-sm mx-1' onClick={() => handleEditClick(trip)}>Edit</button>
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
              {userBookings.length ? (
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
                    {userBookings.map((booking, index) => (
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
                </div>
              ) : (
                <p className="text-center">No bookings found for this company.</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <ModalHeader closeButton>
          <ModalTitle>Edit Trip</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="tripNumber">Trip Number</label>
              <input
                type="text"
                className="form-control"
                id="tripNumber"
                name="tripNumber"
                value={formData.tripNumber}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="tripDate">Trip Date</label>
              <input
                type="date"
                className="form-control"
                id="tripDate"
                name="tripDate"
                value={formData.tripDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="availablePlaces">Available Places</label>
              <input
                type="number"
                className="form-control"
                id="availablePlaces"
                name="availablePlaces"
                value={formData.availablePlaces}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departureStation">Departure Station</label>
              <input
                type="text"
                className="form-control"
                id="departureStation"
                name="departureStation"
                value={formData.departureStation}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stopStations">Stop Stations</label>
              <input
                type="text"
                className="form-control"
                id="stopStations"
                name="stopStations"
                value={formData.stopStations}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departureTime">Departure Time</label>
              <input
                type="time"
                className="form-control"
                id="departureTime"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="arrivedTime">Arrived Time</label>
              <input
                type="time"
                className="form-control"
                id="arrivedTime"
                name="arrivedTime"
                value={formData.arrivedTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
              <Button type="submit" variant="primary">Save Changes</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <ModalHeader closeButton>
          <ModalTitle>Confirm Delete</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this trip?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDeleteTrip(selectedTrip)}>Delete</Button>
        </ModalFooter>
      </Modal>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <ModalHeader closeButton>
              <ModalTitle>Add Trip</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <AddTripForm />
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
            </ModalFooter>
          </Modal>

    </div>
  );
};

export default DisplayTrips;
