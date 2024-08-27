
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AddTrip () {
//   const [tripNumber, setTripNumber] = useState("");
//   const [tripDate, setTripDate] = useState("");
//   const [availablePlaces, setAvailablePlaces] = useState("");
//   const [departureStation, setDepartureStation] = useState("");
//   const [stopStations, setStopStations] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [arrivedTime, setArrivedTime] = useState("");
//   const [price, setPrice] = useState("");
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   const [companiesList, setCompaniesList] = useState([]);
//   const [validationErrors, setValidationErrors] = useState({});
  
//   const navigate = useNavigate();

//   const validateField = (name, value) => {
//     let error = '';
//     if (name === 'tripNumber') {
//       if (!value || isNaN(value) || value <= 0) error = "Trip number must be a positive number.";
//     } else if (name === 'tripDate') {
//       if (!value) error = "Trip date is required.";
//     } else if (name === 'availablePlaces') {
//       if (!value || isNaN(value) || value <= 0) error = "Available places must be a positive number.";
//     } else if (name === 'departureStation') {
//         if (!value || typeof value !== 'string' || value.trim() === '') {
//           error = "Departure station must be a non-empty string.";
//         } else if (/\d/.test(value)) {
//           error = "Departure station must not contain numbers.";
//         } else if (value.split(' ').some(word => word.length < 3)) {
//           error = "Departure station must be a non-empty string with each word having more than 3 characters.";
//         }
//     } else if (name === 'stopStations') {
//         if (!value || typeof value !== 'string' || value.trim() === '') {
//           error = "Stop stations must be a non-empty string.";
//         } else if (/\d/.test(value)) {
//           error = "Stop stations must not contain numbers.";
//         } else if (value.split(' ').some(word => word.length < 3)) {
//           error = "Stop stations must be a non-empty string with each word having more than 3 characters.";
//         }
//     } else if (name === 'departureTime') {
//       if (!value) error = "Departure time is required.";
//     } else if (name === 'arrivedTime') {
//       if (!value) error = "Arrival time is required.";
//     } else if (name === 'price') {
//       if (!value || isNaN(value) || value <= 0) error = "Price must be a positive number.";
//     } else if (name === 'selectedCompanyId') {
//       if (!value) error = "Please select a company.";
//     }
//     setValidationErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: error
//     }));
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
  
//     if (name === 'tripNumber') {
//       setTripNumber(value);
//     } else if (name === 'tripDate') {
//       setTripDate(value);
//     } else if (name === 'availablePlaces') {
//       setAvailablePlaces(value);
//     } else if (name === 'departureStation') {
//       setDepartureStation(value);
//     } else if (name === 'stopStations') {
//       setStopStations(value);
//     } else if (name === 'departureTime') {
//       setDepartureTime(value);
//     } else if (name === 'arrivedTime') {
//       setArrivedTime(value);
//     } else if (name === 'price') {
//       setPrice(value);
//     } else if (name === 'selectedCompanyId') {
//       setSelectedCompanyId(value);
//     }
  
//     validateField(name, value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const errors = {};
//     // Validate all fields
//     validateField('tripNumber', tripNumber);
//     validateField('tripDate', tripDate);
//     validateField('availablePlaces', availablePlaces);
//     validateField('departureStation', departureStation);
//     validateField('stopStations', stopStations);
//     validateField('departureTime', departureTime);
//     validateField('arrivedTime', arrivedTime);
//     validateField('price', price);
//     validateField('selectedCompanyId', selectedCompanyId);

//     if (Object.values(validationErrors).some(error => error)) return; // Stop if validation fails

//     const newTrip = {
//       tripNumber,
//       tripDate,
//       availablePlaces: parseInt(availablePlaces, 10),
//       departureStation,
//       stopStations,
//       departureTime,
//       arrivedTime,
//       price: parseInt(price,10),
//     };

//     if (window.confirm("Are you sure you want to add this trip?")) {
//       const updatedCompanies = companiesList.map(company => {
//         if (company.id === selectedCompanyId) {
//           return {
//             ...company,
//             trips: [...company.trips, newTrip],
//           };
//         }
//         return company;
//       });

//       axios.post("http://localhost:4001/posts")
//         .then((response) => {
//           setTripNumber("");
//           setTripDate("");
//           setAvailablePlaces("");
//           setDepartureStation("");
//           setStopStations("");
//           setDepartureTime("");
//           setArrivedTime("");
//           setPrice("");
//           setSelectedCompanyId("");
//           navigate("/trips");
//         })
//         .catch((error) => {
//           console.error("Error updating trips:", error);
//         });
//     }
//    };

//   return (
//     <div className="container">
//       <div className="row my-5">
//         <div className="col-md-6">
//           <h2 className="mb-4 text-center">Add New Trip</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-floating mb-3">
//               <input
//                 type="number"
//                 className={`form-control ${validationErrors.tripNumber ? 'border-danger' : ''}`}
//                 id="floatingInputTripNumber"
//                 placeholder="Enter trip number"
//                 name="tripNumber"
//                 value={tripNumber}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputTripNumber">Trip Number</label>
//               <p className="text-danger">{validationErrors.tripNumber}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="date"
//                 className={`form-control ${validationErrors.tripDate ? 'border-danger' : ''}`}
//                 id="floatingInputTripDate"
//                 name="tripDate"
//                 value={tripDate}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputTripDate">Trip Date</label>
//               <p className="text-danger">{validationErrors.tripDate}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="number"
//                 className={`form-control ${validationErrors.availablePlaces ? 'border-danger' : ''}`}
//                 id="floatingInputAvailablePlaces"
//                 placeholder="Enter available places"
//                 name="availablePlaces"
//                 value={availablePlaces}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputAvailablePlaces">Available Places</label>
//               <p className="text-danger">{validationErrors.availablePlaces}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="text"
//                 className={`form-control ${validationErrors.departureStation ? 'border-danger' : ''}`}
//                 id="floatingInputDepartureStation"
//                 placeholder="Enter departure station"
//                 name="departureStation"
//                 value={departureStation}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputDepartureStation">Departure Station</label>
//               <p className="text-danger">{validationErrors.departureStation}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="text"
//                 className={`form-control ${validationErrors.stopStations ? 'border-danger' : ''}`}
//                 id="floatingInputStopStations"
//                 placeholder="Enter stop stations"
//                 name="stopStations"
//                 value={stopStations}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputStopStations">Stop Stations</label>
//               <p className="text-danger">{validationErrors.stopStations}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="time"
//                 className={`form-control ${validationErrors.departureTime ? 'border-danger' : ''}`}
//                 id="floatingInputDepartureTime"
//                 name="departureTime"
//                 value={departureTime}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputDepartureTime">Departure Time</label>
//               <p className="text-danger">{validationErrors.departureTime}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="time"
//                 className={`form-control ${validationErrors.arrivedTime ? 'border-danger' : ''}`}
//                 id="floatingInputArrivedTime"
//                 name="arrivedTime"
//                 value={arrivedTime}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputArrivedTime">Arrival Time</label>
//               <p className="text-danger">{validationErrors.arrivedTime}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="number"
//                 step="5"
//                 className={`form-control ${validationErrors.price ? 'border-danger' : ''}`}
//                 id="floatingInputPrice"
//                 placeholder="Enter price"
//                 name="price"
//                 value={price}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputPrice">Price</label>
//               <p className="text-danger">{validationErrors.price}</p>
//             </div>

//             <div className="form-floating mb-3">
//               <select
//                 className={`form-control ${validationErrors.selectedCompanyId ? 'border-danger' : ''}`}
//                 id="floatingInputSelectCompany"
//                 name="selectedCompanyId"
//                 value={selectedCompanyId}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Company</option>
//                 {companiesList.map((company) => (
//                   <option key={company.id} value={company.id}>
//                     {company.name}
//                   </option>
//                 ))}
//               </select>
//               <label htmlFor="floatingInputSelectCompany">Select Company</label>
//               <p className="text-danger">{validationErrors.selectedCompanyId}</p>
//             </div>

//             <button type="submit" className="btn btn-primary">Add Trip</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTrip


///////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTripForm = () => {
  const [tripNumber, setTripNumber] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [availablePlaces, setAvailablePlaces] = useState("");
  const [departureStation, setDepartureStation] = useState("");
  const [stopStations, setStopStations] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivedTime, setArrivedTime] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [data,setData]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/posts');
        if (response.data) {
          setData(response.data)
          console.log('Fetched data:', response.data);

          let allCities = [];
          response.data.forEach(city => {
           
              allCities = allCities.concat(city.city);
              
              console.log(data)
          });
          // setCities(allCities);
          // console.log(allCities)
          setCities(data)
          // Extract unique companies
          let allCompanies = [];
          response.data.forEach(city => {
            if (city.companies) {
              allCompanies = allCompanies.concat(city.companies.filter(item => item.type === 'company'));
            }
          });
          const uniqueCompanies = Array.from(new Set(allCompanies.map(c => c.id)))
                                        .slice(0, 3)
                                        .map(id => allCompanies.find(c => c.id === id));
          setCompanies(uniqueCompanies);

          // Extract cities
          // let allCities = [];
          // data.forEach(city => {
           
          //     allCities = allCities.concat(city.city);
              
          //     console.log(data)
          // });
          // setCities(allCities);
          // console.log(allCities)

          // console.log('Cities:', allCities);
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
  
  // console.log(cities)
  console.log(data)
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
    } else if (name === "arrivedTime") {
      setArrivedTime(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "selectedCompanyId") {
      setSelectedCompanyId(value);
      setSelectedCityId(""); // Clear city selection
      setStopStations(""); // Clear stop stations
    // } else if (name === "selectedCityId") {
    //   setSelectedCityId(value);
    //   const selectedCity = cities.find(city => city.id === value);
    //   setStopStations(selectedCity ? selectedCity.name : ""); // Set stopStations to the city name
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
    if (!selectedCompanyId && !selectedCityId) errors.selectedEntityId = "Company or city is required.";
    setValidationErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length !== 0) return; // Stop form submission if there are errors

    const newTrip = {
      tripNumber,
      tripDate,
      availablePlaces,
      departureStation,
      stopStations,
      departureTime,
      arrivedTime,
      price,
    };

    try {
      const selectedEntityId = selectedCompanyId || selectedCityId;
      console.log('Selected Entity ID:', selectedEntityId); // Debug: Check selectedEntityId

      const selectedEntity = [...companies, ...cities].find(entity => entity.id === selectedEntityId);
      console.log('Selected Entity:', selectedEntity); // Debug: Check selectedEntity

      if (!selectedEntity) {
        throw new Error('Selected company or city not found');
      }

      const updatedEntity = {
        ...selectedEntity,
        trips: [...(selectedEntity.trips || []), newTrip],
      };

      console.log('Updated Entity:', updatedEntity); // Debug: Check updatedEntity

      await axios.put(`http://localhost:4001/posts/${selectedEntityId}`, updatedEntity);

      // Reset form
      setTripNumber("");
      setTripDate("");
      setAvailablePlaces("");
      setDepartureStation("");
      setStopStations("");
      setDepartureTime("");
      setArrivedTime("");
      setPrice("");
      setSelectedCompanyId("");
      setSelectedCityId("");

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

            {/* Trip Date */}
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

            {/* Available Places */}
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

            {/* Departure Station */}
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

            {/* Stop Stations */}
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

            {/* Departure Time */}
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
            </div>

            {/* Arrival Time */}
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
            </div>

            {/* Price */}
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

            {/* Select Company */}
            <div className="form-floating mb-3">
              <select
                className={`form-select ${validationErrors.selectedCompanyId ? 'border-danger' : ''}`}
                id="floatingSelectCompany"
                name="selectedCompanyId"
                value={selectedCompanyId}
                onChange={handleInputChange}
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={`company-${company.id}`} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelectCompany">Select Company</label>
              {validationErrors.selectedCompanyId && <p className="text-danger">{validationErrors.selectedCompanyId}</p>}
            </div>

            {/* Select City */}
            <div className="form-floating mb-3">
              <select
                className={`form-select ${validationErrors.selectedCityId ? 'border-danger' : ''}`}
                id="floatingSelectCity"
                name="selectedCityId"
                value={selectedCityId}
                onChange={handleInputChange}
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={`city-${city.id}`} value={city.id}>
                    {city.city}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelectCity">Select City</label>
              {validationErrors.selectedCityId && <p className="text-danger">{validationErrors.selectedCityId}</p>}
            </div>

            {/* Submit Button */}
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary">Add Trip</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTripForm;
