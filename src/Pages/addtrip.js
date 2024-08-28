
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTripForm = () => {
  const [tripNumber, setTripNumber] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [availablePlaces, setAvailablePlaces] = useState("");
  const [departureStation, setDepartureStation] = useState("");
  const [stopStations, setStopStations] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [departureTimePeriod, setDepartureTimePeriod] = useState("AM");
  const [arrivedTime, setArrivedTime] = useState("");
  const [arrivedTimePeriod, setArrivedTimePeriod] = useState("PM");
  const [price, setPrice] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4002/companies');
        if (response.data) {
          console.log('Fetched data:', response.data);
          setCompanies(response.data);
        } else {
          setError('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "tripNumber") {
      setTripNumber(value);
    } else if (name === "tripDate") {
      setTripDate(value);
    } else if (name === "availablePlaces") {
      setAvailablePlaces(value);
    } else if (name === "departureStation") {
      setDepartureStation(value);
    } else if (name === "stopStations") {
      setStopStations(value);
    } else if (name === "departureTime") {
      setDepartureTime(value);
    } else if (name === "departureTimePeriod") {
      setDepartureTimePeriod(value);
    } else if (name === "arrivedTime") {
      setArrivedTime(value);
    } else if (name === "arrivedTimePeriod") {
      setArrivedTimePeriod(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "selectedCompanyId") {
      setSelectedCompanyId(value);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) errors.tripNumber = "Trip number must be a positive number.";
    if (!tripDate) errors.tripDate = "Trip date is required.";
    if (!availablePlaces || isNaN(availablePlaces) || availablePlaces <= 0) errors.availablePlaces = "Available places must be a positive number.";
    if (!departureStation || typeof departureStation !== 'string' || departureStation.trim() === '' || /\d/.test(departureStation) || departureStation.split(' ').some(word => word.length < 3)) {
      errors.departureStation = "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
    }
    if (!stopStations || typeof stopStations !== 'string' || stopStations.trim() === '' || /\d/.test(stopStations) || stopStations.split(' ').some(word => word.length < 3)) {
      errors.stopStations = "Stop stations must be a non-empty string with each word having more than 3 characters and no numbers.";
    }
    if (!departureTime) errors.departureTime = "Departure time is required.";
    if (!arrivedTime) errors.arrivedTime = "Arrival time is required.";
    if (arrivedTime && departureTime && arrivedTime <= departureTime) errors.arrivedTime = "Arrival time must be after departure time.";
    if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number.";
    if (!selectedCompanyId) errors.selectedCompanyId = "Company is required.";
    setValidationErrors(errors);
    return errors;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time, period) => {
    return `${time} ${period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length !== 0) return; 

    // Format price by appending 'EGP' to add in file such 500 EGP
    const formattedPrice = `${price} EGP`;

    // Format times
    const formattedDepartureTime = formatTime(departureTime, departureTimePeriod);
    const formattedArrivedTime = formatTime(arrivedTime, arrivedTimePeriod);

    const newTrip = {
      tripNumber,
      tripDate: formatDate(tripDate), 
      availablePlaces,
      departureStation,
      stopStations,
      departureTime: formattedDepartureTime, 
      arrivedTime: formattedArrivedTime, 
      price: formattedPrice, 
    };

    try {
      const selectedCompany = companies.find(company => company.id === selectedCompanyId);
      if (!selectedCompany) {
        throw new Error('Selected company not found');
      }

      const updatedCompany = {
        ...selectedCompany,
        trips: [...(selectedCompany.trips || []), newTrip],
      };

      console.log('Updated Company:', updatedCompany);

      await axios.put(`http://localhost:4002/companies/${selectedCompanyId}`, updatedCompany);

      // Reset form fields and set success message after successful submission
      setTripNumber("");
      setTripDate("");
      setAvailablePlaces("");
      setDepartureStation("");
      setStopStations("");
      setDepartureTime("");
      setDepartureTimePeriod("AM");
      setArrivedTime("");
      setArrivedTimePeriod("PM");
      setPrice("");
      setSelectedCompanyId("");
      setSuccessMessage("Trip successfully added!");

    } catch (error) {
      console.error("Error adding trip:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Add New Trip</h2>
          <form onSubmit={handleSubmit}>
            {/* Trip Number */}
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
              {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
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
              {validationErrors.tripDate && <p className="text-danger">{validationErrors.tripDate}</p>}
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
              {validationErrors.availablePlaces && <p className="text-danger">{validationErrors.availablePlaces}</p>}
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
              {validationErrors.departureStation && <p className="text-danger">{validationErrors.departureStation}</p>}
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
              {validationErrors.stopStations && <p className="text-danger">{validationErrors.stopStations}</p>}
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
              {validationErrors.departureTime && <p className="text-danger">{validationErrors.departureTime}</p>}
              <select
                className="form-select mt-2"
                id="departureTimePeriod"
                name="departureTimePeriod"
                value={departureTimePeriod}
                onChange={handleInputChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
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
              {validationErrors.arrivedTime && <p className="text-danger">{validationErrors.arrivedTime}</p>}
              <select
                className="form-select mt-2"
                id="arrivedTimePeriod"
                name="arrivedTimePeriod"
                value={arrivedTimePeriod}
                onChange={handleInputChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className={`form-control ${validationErrors.price ? 'border-danger' : ''}`}
                id="floatingInputPrice"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInputPrice">Price</label>
              {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
            </div>

            <div className="form-floating mb-3">
              <select
                className={`form-select ${validationErrors.selectedCompanyId ? 'border-danger' : ''}`}
                id="floatingSelectCompany"
                aria-label="Select company"
                name="selectedCompanyId"
                value={selectedCompanyId}
                onChange={handleInputChange}
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelectCompany">Select Company</label>
              {validationErrors.selectedCompanyId && <p className="text-danger">{validationErrors.selectedCompanyId}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Add Trip</button>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddTripForm;
