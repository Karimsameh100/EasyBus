import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import './DisplayTrips.css'; // Import the CSS file for styling
import AddTripForm from '../addtrip';

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
  // State for pagination of bookings
  const [currentBookingsPage, setCurrentBookingsPage] = useState(1);
  const bookingsPerPage = 4; // Adjust this number based on how many items you want per page for bookings

  // Pagination logic for bookings
  const totalBookingsPages = Math.ceil(userBookings.length / bookingsPerPage);
  const bookingsStartIndex = (currentBookingsPage - 1) * bookingsPerPage;
  const bookingsEndIndex = bookingsStartIndex + bookingsPerPage;
  const currentBookingsPageItems = userBookings.slice(bookingsStartIndex, bookingsEndIndex);

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
        if (company.name === storedCompany.name) {
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
                        <th>Edit</th>
                        <th>Delete</th>
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

      {/* Edit Modal */}
  

    </div>
  );
};

export default DisplayTrips;
