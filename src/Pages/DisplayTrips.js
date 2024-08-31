import React, { useState, useEffect } from 'react';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditTripModal, DeleteTripModal } from '../Componants/EditDeleteModel.js';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter,Button } from 'react-bootstrap';



const DisplayTrips = () => {
  const [trips, setTrips] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Adjust this number based on how many items you want per page

  useEffect(() => {
      const fetchTrips = async () => {
          try {
              const response = await axios.get('http://localhost:4001/posts');
              getCompaniesTrips(response.data);
              console.log('Fetched trips:', response.data);
          } catch (error) {
              console.error('Error fetching trips:', error);
          }
      };

      const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
      if (storedCompany) {
          setCompanyName(storedCompany.name);
          fetchTrips();
      } else {
          console.warn('No logged-in company found.');
      }
  }, []);

  function getCompaniesTrips(data) {
      const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
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
    setSelectedTrip(trip);
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
    setSelectedTrip(trip);
    setShowDeleteModal(true);
  };

  const cancelDelete =()=>{
    setShowDeleteModal(false);
  }

  const handleClose = () => {
    // Add your logic to handle the closing of the modal dialog
    console.log("Modal closed");
  };
  
  const handleUpdateTrip = (updatedTrip) => {
    axios.get('http://localhost:4001/posts')
      .then((response) => {
        const updatedPosts = response.data.map((post) => {
          post.companies.forEach((company) => {
            company.trips = company.trips.map((trip) => {
              if (trip.tripNumber === updatedTrip.tripNumber) {
                return updatedTrip; // Return the updated trip
              }
              return trip;
            });
          });
          return post;
        });
        axios.put('http://localhost:4001/posts', updatedPosts) // Pass the updated posts
          .then((response) => {
            console.log('Trips updated successfully!');
            setTrips(updatedTrips);
            setShowEditModal(false);
          })
          .catch((error) => {
            console.error('Error updating trips:', error);
          });
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
            company.trips = company.trips.filter((t) => t.tripNumber !== trip.tripNumber);
          });
          return post;
        });
        axios.put('http://localhost:4001/posts', updatedPosts) // Pass the updated posts
          .then((response) => {
            console.log('Trip deleted successfully!');
            setTrips(updatedTrips);
            setShowDeleteModal(false);
          })
          .catch((error) => {
            console.error('Error deleting trip:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Trips of {companyName}</h2>
      {currentPageItems.length ? (
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
                  <button onClick={() => handleEditClick(trip)}>Edit</button>
                  <button onClick={() => handleDeleteClick(trip)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No trips found for this company.</p>
      )}
       <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePrevious} aria-disabled={currentPage === 1}>
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleNext} aria-disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
            {showEditModal && (
                <Modal id="edit-trip-modal" show={showEditModal} onHide={() => setShowEditModal(false)}>
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
                                    name="tripDate"
                                    value={formData.tripDate}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Available Places:</label>
                                <input
                                    type="number"
                                    name="availablePlaces"
                                    value={formData.availablePlaces}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Departure Station:</label>
                                <input
                                    type="text"
                                    name="departureStation"
                                    value={formData.departureStation}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Arrived Station:</label>
                                <input
                                    type="text"
                                    name="arrivedStation"
                                    value={formData.arrivedStation}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Departure Time:</label>
                                <input
                                    type="time"
                                    name="departureTime"
                                    value={formData.departureTime}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Arrived Time:</label>
                                <input
                                    type="time"
                                    name="arrivedTime"
                                    value={formData.arrivedTime}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </form>
                    </ModalBody>
                </Modal>
            )},
            {showDeleteModal && (
                <Modal id="delete-trip-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <ModalHeader closeButton>
                        <ModalTitle>Delete Trip</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this trip?
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-danger" onClick={handleDeleteTrip}>
                            Delete
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            )}
    </div>
  );
};

export default DisplayTrips;