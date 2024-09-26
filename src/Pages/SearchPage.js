import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalTitle,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "react-bootstrap";
import { FaRegBookmark, FaHeart } from "react-icons/fa";
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const { state } = location;
  const { filteredTrips } = state ?? {};
  console.log(filteredTrips)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [companies, setCompanies] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const isUser = localStorage.getItem("authToken") ? true : false;
    if (isUser) {
      setIsLoggedIn(true);
    }
    const fetchCompanies = async () => {
      const promises = filteredTrips.map((trip) => {
        return axios.get(`http://127.0.0.1:8000/company/${trip.company}`)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.error(error);
          });
      });
      const results = await Promise.all(promises);
      const companies = {};
      results.forEach((company, index) => {
        companies[filteredTrips[index].id] = company;
      });
      setCompanies(companies);
    };
    fetchCompanies();
  }, [filteredTrips, localStorage.getItem("authToken")]);

  const handleBookTrip = (trip) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      const company = companies[trip.id];
      navigate(`/booking/${trip.tripNumber}`, { state: { trip, company } });
    }
  };

  if (!filteredTrips || filteredTrips.length === 0) {
    return <div className='text-center'> <h1 className='my-5'> No trips found  -_- </h1></div>;
  }

  return (
    <>
      <div className="table-responsive container mt-5 mb-5">
        <h1 className="text-center mb-4">Search Results</h1>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Company</th>
              <th>Trip Number</th>
              <th>Departure Station</th>
              <th>Stop Stations</th>
              <th>Trip Date</th>
              <th>Available Places</th>
              <th>Price</th>
              <th>Check in</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip.tripNumber}>
                <td>{companies[trip.id] && companies[trip.id].name}</td>
                <td>{trip.tripNumber}</td>
                <td>{trip.departuerStation}</td>
                <td>{trip.destinationStation}</td>
                <td>{trip.date}</td>
                <td>{trip.avilabalPlaces}</td>
                <td>{trip.price} EGP</td>
                <td>
                  <button
                    className="btn btn-success btn-sm mx-1"
                    style={{ width: "100%" }}
                    onClick={() =>
                      isLoggedIn
                        ? handleBookTrip(trip)
                        : setShowLoginModal(true)
                    }
                  >
                    <FaRegBookmark /> Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showLoginModal && (
        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
          <ModalHeader closeButton>
            <ModalTitle>Login To Add to Favorites or Book The Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>
            You need to Login to complete Booking and add your favourite trips
            !!
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                navigate("/Login1");
                setShowLoginModal(false);
              }}
            >
              Go to Login
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowLoginModal(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default SearchResults;