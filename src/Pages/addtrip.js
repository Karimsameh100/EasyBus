
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTrip () {
  const [tripNumber, setTripNumber] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [availablePlaces, setAvailablePlaces] = useState("");
  const [departureStation, setDepartureStation] = useState("");
  const [stopStations, setStopStations] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivedTime, setArrivedTime] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [companiesList, setCompaniesList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    if (name === 'tripNumber') {
      if (!value || isNaN(value) || value <= 0) error = "Trip number must be a positive number.";
    } else if (name === 'tripDate') {
      if (!value) error = "Trip date is required.";
    } else if (name === 'availablePlaces') {
      if (!value || isNaN(value) || value <= 0) error = "Available places must be a positive number.";
    } else if (name === 'departureStation') {
        if (!value || typeof value !== 'string' || value.trim() === '') {
          error = "Departure station must be a non-empty string.";
        } else if (/\d/.test(value)) {
          error = "Departure station must not contain numbers.";
        } else if (value.split(' ').some(word => word.length < 3)) {
          error = "Departure station must be a non-empty string with each word having more than 3 characters.";
        }
    } else if (name === 'stopStations') {
        if (!value || typeof value !== 'string' || value.trim() === '') {
          error = "Stop stations must be a non-empty string.";
        } else if (/\d/.test(value)) {
          error = "Stop stations must not contain numbers.";
        } else if (value.split(' ').some(word => word.length < 3)) {
          error = "Stop stations must be a non-empty string with each word having more than 3 characters.";
        }
    } else if (name === 'departureTime') {
      if (!value) error = "Departure time is required.";
    } else if (name === 'arrivedTime') {
      if (!value) error = "Arrival time is required.";
    } else if (name === 'price') {
      if (!value || isNaN(value) || value <= 0) error = "Price must be a positive number.";
    } else if (name === 'selectedCompanyId') {
      if (!value) error = "Please select a company.";
    }
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'tripNumber') {
      setTripNumber(value);
    } else if (name === 'tripDate') {
      setTripDate(value);
    } else if (name === 'availablePlaces') {
      setAvailablePlaces(value);
    } else if (name === 'departureStation') {
      setDepartureStation(value);
    } else if (name === 'stopStations') {
      setStopStations(value);
    } else if (name === 'departureTime') {
      setDepartureTime(value);
    } else if (name === 'arrivedTime') {
      setArrivedTime(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'selectedCompanyId') {
      setSelectedCompanyId(value);
    }
  
    validateField(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    // Validate all fields
    validateField('tripNumber', tripNumber);
    validateField('tripDate', tripDate);
    validateField('availablePlaces', availablePlaces);
    validateField('departureStation', departureStation);
    validateField('stopStations', stopStations);
    validateField('departureTime', departureTime);
    validateField('arrivedTime', arrivedTime);
    validateField('price', price);
    validateField('selectedCompanyId', selectedCompanyId);

    if (Object.values(validationErrors).some(error => error)) return; // Stop if validation fails

    const newTrip = {
      tripNumber,
      tripDate,
      availablePlaces: parseInt(availablePlaces, 10),
      departureStation,
      stopStations,
      departureTime,
      arrivedTime,
      price: parseInt(price,10),
    };

    if (window.confirm("Are you sure you want to add this trip?")) {
      const updatedCompanies = companiesList.map(company => {
        if (company.id === selectedCompanyId) {
          return {
            ...company,
            trips: [...company.trips, newTrip],
          };
        }
        return company;
      });

      axios.post("http://localhost:4001/posts")
        .then((response) => {
          setTripNumber("");
          setTripDate("");
          setAvailablePlaces("");
          setDepartureStation("");
          setStopStations("");
          setDepartureTime("");
          setArrivedTime("");
          setPrice("");
          setSelectedCompanyId("");
          navigate("/trips");
        })
        .catch((error) => {
          console.error("Error updating trips:", error);
        });
    }
   };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Add New Trip</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="number"
                className={`form-control ${validationErrors.tripNumber ? 'border-danger' : ''}`}
                id="floatingInputTripNumber"
                placeholder="Enter trip number"
                name="tripNumber"
                value={tripNumber}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputTripNumber">Trip Number</label>
              <p className="text-danger">{validationErrors.tripNumber}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className={`form-control ${validationErrors.tripDate ? 'border-danger' : ''}`}
                id="floatingInputTripDate"
                name="tripDate"
                value={tripDate}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputTripDate">Trip Date</label>
              <p className="text-danger">{validationErrors.tripDate}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className={`form-control ${validationErrors.availablePlaces ? 'border-danger' : ''}`}
                id="floatingInputAvailablePlaces"
                placeholder="Enter available places"
                name="availablePlaces"
                value={availablePlaces}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputAvailablePlaces">Available Places</label>
              <p className="text-danger">{validationErrors.availablePlaces}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${validationErrors.departureStation ? 'border-danger' : ''}`}
                id="floatingInputDepartureStation"
                placeholder="Enter departure station"
                name="departureStation"
                value={departureStation}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputDepartureStation">Departure Station</label>
              <p className="text-danger">{validationErrors.departureStation}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${validationErrors.stopStations ? 'border-danger' : ''}`}
                id="floatingInputStopStations"
                placeholder="Enter stop stations"
                name="stopStations"
                value={stopStations}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputStopStations">Stop Stations</label>
              <p className="text-danger">{validationErrors.stopStations}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="time"
                className={`form-control ${validationErrors.departureTime ? 'border-danger' : ''}`}
                id="floatingInputDepartureTime"
                name="departureTime"
                value={departureTime}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputDepartureTime">Departure Time</label>
              <p className="text-danger">{validationErrors.departureTime}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="time"
                className={`form-control ${validationErrors.arrivedTime ? 'border-danger' : ''}`}
                id="floatingInputArrivedTime"
                name="arrivedTime"
                value={arrivedTime}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputArrivedTime">Arrival Time</label>
              <p className="text-danger">{validationErrors.arrivedTime}</p>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                step="5"
                className={`form-control ${validationErrors.price ? 'border-danger' : ''}`}
                id="floatingInputPrice"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputPrice">Price</label>
              <p className="text-danger">{validationErrors.price}</p>
            </div>

            {/* <div className="form-floating mb-3">
              <select
                className={`form-control ${validationErrors.selectedCompanyId ? 'border-danger' : ''}`}
                id="floatingInputSelectCompany"
                name="selectedCompanyId"
                value={selectedCompanyId}
                onChange={handleInputChange}
              >
                <option value="">Select Company</option>
                {companiesList.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingInputSelectCompany">Select Company</label>
              <p className="text-danger">{validationErrors.selectedCompanyId}</p>
            </div> */}

            <button type="submit" className="btn btn-primary">Add Trip</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrip

