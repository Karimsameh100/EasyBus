
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddTripForm = () => {
//   const [tripNumber, setTripNumber] = useState("");
//   const [tripDate, setTripDate] = useState("");
//   const [availablePlaces, setAvailablePlaces] = useState("");
//   const [departureStation, setDepartureStation] = useState("");
//   const [stopStations, setStopStations] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [departureTimePeriod, setDepartureTimePeriod] = useState("AM");
//   const [arrivedTime, setArrivedTime] = useState("");
//   const [arrivedTimePeriod, setArrivedTimePeriod] = useState("PM");
//   const [price, setPrice] = useState("");
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   const [validationErrors, setValidationErrors] = useState({});
//   const [companies, setCompanies] = useState([]);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4001/post');
//         if (response.data) {
//           console.log('Fetched data:', response.data);
//           setCompanies(response.data);
//         } else {
//           setError('No data returned from API');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "tripNumber") {
//       setTripNumber(value);
//     } else if (name === "tripDate") {
//       setTripDate(value);
//     } else if (name === "availablePlaces") {
//       setAvailablePlaces(value);
//     } else if (name === "departureStation") {
//       setDepartureStation(value);
//     } else if (name === "stopStations") {
//       setStopStations(value);
//     } else if (name === "departureTime") {
//       setDepartureTime(value);
//     } else if (name === "departureTimePeriod") {
//       setDepartureTimePeriod(value);
//     } else if (name === "arrivedTime") {
//       setArrivedTime(value);
//     } else if (name === "arrivedTimePeriod") {
//       setArrivedTimePeriod(value);
//     } else if (name === "price") {
//       setPrice(value);
//     } else if (name === "selectedCompanyId") {
//       setSelectedCompanyId(value);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) errors.tripNumber = "Trip number must be a positive number.";
//     if (!tripDate) errors.tripDate = "Trip date is required.";
//     if (!availablePlaces || isNaN(availablePlaces) || availablePlaces <= 0) errors.availablePlaces = "Available places must be a positive number.";
//     if (!departureStation || typeof departureStation !== 'string' || departureStation.trim() === '' || /\d/.test(departureStation) || departureStation.split(' ').some(word => word.length < 3)) {
//       errors.departureStation = "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!stopStations || typeof stopStations !== 'string' || stopStations.trim() === '' || /\d/.test(stopStations) || stopStations.split(' ').some(word => word.length < 3)) {
//       errors.stopStations = "Stop stations must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!departureTime) errors.departureTime = "Departure time is required.";
//     if (!arrivedTime) errors.arrivedTime = "Arrival time is required.";
//     if (arrivedTime && departureTime && arrivedTime <= departureTime) errors.arrivedTime = "Arrival time must be after departure time.";
//     if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number.";
//     if (!selectedCompanyId) errors.selectedCompanyId = "Company is required.";
//     setValidationErrors(errors);
//     return errors;
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const formatTime = (time, period) => {
//     return `${time} ${period}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = validateForm();
//     if (Object.keys(errors).length !== 0) return; 

//     // Format price by appending 'EGP' to add in file such 500 EGP
//     const formattedPrice = `${price} EGP`;

//     // Format times
//     const formattedDepartureTime = formatTime(departureTime, departureTimePeriod);
//     const formattedArrivedTime = formatTime(arrivedTime, arrivedTimePeriod);

//     const newTrip = {
//       tripNumber,
//       tripDate: formatDate(tripDate), 
//       availablePlaces,
//       departureStation,
//       stopStations,
//       departureTime: formattedDepartureTime, 
//       arrivedTime: formattedArrivedTime, 
//       price: formattedPrice, 
//     };

//     try {
//       const selectedCompany = companies.find(company => company.id === selectedCompanyId);
//       if (!selectedCompany) {
//         throw new Error('Selected company not found');
//       }

//       const updatedCompany = {
//         ...selectedCompany,
//         trips: [...(selectedCompany.trips || []), newTrip],
//       };

//       console.log('Updated Company:', updatedCompany);

//       await axios.put(`http://localhost:4001/post/${selectedCompanyId}`, updatedCompany);

//       // Reset form fields and set success message after successful submission
//       setTripNumber("");
//       setTripDate("");
//       setAvailablePlaces("");
//       setDepartureStation("");
//       setStopStations("");
//       setDepartureTime("");
//       setDepartureTimePeriod("AM");
//       setArrivedTime("");
//       setArrivedTimePeriod("PM");
//       setPrice("");
//       setSelectedCompanyId("");
//       setSuccessMessage("Trip successfully added!");

//     } catch (error) {
//       console.error("Error adding trip:", error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row my-5">
//         <div className="col-md-6">
//           <h2 className="mb-4 text-center">Add New Trip</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Trip Number */}
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
//               {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
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
//               {validationErrors.tripDate && <p className="text-danger">{validationErrors.tripDate}</p>}
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
//               {validationErrors.availablePlaces && <p className="text-danger">{validationErrors.availablePlaces}</p>}
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
//               {validationErrors.departureStation && <p className="text-danger">{validationErrors.departureStation}</p>}
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
//               {validationErrors.stopStations && <p className="text-danger">{validationErrors.stopStations}</p>}
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
//               {validationErrors.departureTime && <p className="text-danger">{validationErrors.departureTime}</p>}
//               <select
//                 className="form-select mt-2"
//                 id="departureTimePeriod"
//                 name="departureTimePeriod"
//                 value={departureTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
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
//               {validationErrors.arrivedTime && <p className="text-danger">{validationErrors.arrivedTime}</p>}
//               <select
//                 className="form-select mt-2"
//                 id="arrivedTimePeriod"
//                 name="arrivedTimePeriod"
//                 value={arrivedTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="number"
//                 className={`form-control ${validationErrors.price ? 'border-danger' : ''}`}
//                 id="floatingInputPrice"
//                 placeholder="Enter price"
//                 name="price"
//                 value={price}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputPrice">Price</label>
//               {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
//             </div>

//             <div className="form-floating mb-3">
//               <select
//                 className={`form-select ${validationErrors.selectedCompanyId ? 'border-danger' : ''}`}
//                 id="floatingSelectCompany"
//                 aria-label="Select company"
//                 name="selectedCompanyId"
//                 value={selectedCompanyId}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map(company => (
//                   <option key={company.id} value={company.id}>
//                     {company.name}
//                   </option>
//                 ))}
//               </select>
//               <label htmlFor="floatingSelectCompany">Select Company</label>
//               {validationErrors.selectedCompanyId && <p className="text-danger">{validationErrors.selectedCompanyId}</p>}
//             </div>

//             <button type="submit" className="btn btn-primary">Add Trip</button>
//           </form>
//           {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
//           {error && <div className="alert alert-danger mt-3">{error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTripForm;


/////////////////////////////////////////////////////////////////add but override////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AddTripForm(){

//   const [tripNumber, setTripNumber] = useState("");
//   const [tripDate, setTripDate] = useState("");
//   const [availablePlaces, setAvailablePlaces] = useState("");
//   const [departureStation, setDepartureStation] = useState("");
//   const [stopStations, setStopStations] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [departureTimePeriod, setDepartureTimePeriod] = useState("AM");
//   const [arrivedTime, setArrivedTime] = useState("");
//   const [arrivedTimePeriod, setArrivedTimePeriod] = useState("PM");
//   const [price, setPrice] = useState("");
//   const [selectedCityId, setSelectedCityId] = useState("");
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   const [cities, setCities] = useState([]);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [companies,setCompanies]=useState([])  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4001/posts`);
//         setCities(response.data);
//         // if (response.data) {
//         //   const citiesData = response.data.map(post => ({
//         //     // cityId: post.id,
//         //     // cityName: post.city,
//         //     // companies: post.companies,
//         //   }));
//         //   setCities(citiesData);
//         // } else {
//         //   setError('No data returned from API');
//         // }
       
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
  
//     if (name === "tripNumber") {
//       setTripNumber(value);
//     } else if (name === "tripDate") {
//       setTripDate(value);
//     } else if (name === "availablePlaces") {
//       setAvailablePlaces(value);
//     } else if (name === "departureStation") {
//       setDepartureStation(value);
//     } else if (name === "stopStations") {
//       setStopStations(value);
//     } else if (name === "departureTime") {
//       setDepartureTime(value);
//     } else if (name === "departureTimePeriod") {
//       setDepartureTimePeriod(value);
//     } else if (name === "arrivedTime") {
//       setArrivedTime(value);
//     } else if (name === "arrivedTimePeriod") {
//       setArrivedTimePeriod(value);
//     } else if (name === "price") {
//       setPrice(value);
//     } else if (name === "selectedCityId") {
//       setSelectedCityId(value);
//       setSelectedCompanyId("");  
//     } else if (name === "selectedCompanyId") {
//       setSelectedCompanyId(value);
//     }
//   };
  

//   const validateForm = () => {
//     const errors = {};
//     if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) errors.tripNumber = "Trip number must be a positive number.";
//     if (!tripDate) errors.tripDate = "Trip date is required.";
//     if (!availablePlaces || isNaN(availablePlaces) || availablePlaces <= 0) errors.availablePlaces = "Available places must be a positive number.";
//     if (!departureStation || typeof departureStation !== 'string' || departureStation.trim() === '' || /\d/.test(departureStation) || departureStation.split(' ').some(word => word.length < 3)) {
//       errors.departureStation = "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!stopStations || typeof stopStations !== 'string' || stopStations.trim() === '' || /\d/.test(stopStations) || stopStations.split(' ').some(word => word.length < 3)) {
//       errors.stopStations = "Stop stations must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!departureTime) errors.departureTime = "Departure time is required.";
//     if (!arrivedTime) errors.arrivedTime = "Arrival time is required.";
//     if (arrivedTime && departureTime && arrivedTime <= departureTime) errors.arrivedTime = "Arrival time must be after departure time.";
//     if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number.";
//     if (!selectedCityId) errors.selectedCityId = "City is required.";
//     if (!selectedCompanyId) errors.selectedCompanyId = "Company is required.";
//     setValidationErrors(errors);
//     return errors;
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const formatTime = (time, period) => {
//     return `${time} ${period}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const errors = validateForm();
//     if (Object.keys(errors).length !== 0) return;
  
//     const formattedPrice = `${price} EGP`;
//     const formattedDepartureTime = formatTime(departureTime, departureTimePeriod);
//     const formattedArrivedTime = formatTime(arrivedTime, arrivedTimePeriod);
  
//     const newTrip = {
//       tripNumber,
//       tripDate: formatDate(tripDate),
//       availablePlaces,
//       departureStation,
//       stopStations,
//       departureTime: formattedDepartureTime,
//       arrivedTime: formattedArrivedTime,
//       price: formattedPrice,
//     };
  
//     try {
//       console.log('Selected City ID:', selectedCityId);
//       console.log('Selected Company ID:', selectedCompanyId);
  
//       const selectedCity = cities.find(city => city.id === selectedCityId);
//       if (!selectedCity) {
//         throw new Error('Selected city not found');
//       }
  
//       console.log('Selected City:', selectedCity);

//       setCompanies (()=>{
//         const selectedCity = cities.find(city => city.id === selectedCityId);
//         // selectedCity.companies
//       })
//       console.log("hello from :",companies)  
//       const selectedCompany = selectedCity.companies.find(company => String(company.id) === String(selectedCompanyId));
//       if (!selectedCompany) {
//         throw new Error('Selected company not found in the selected city');
//       }
  
//       console.log('Selected Company:', selectedCompany);
  
//       const updatedCompany = {
//         ...selectedCompany,
//         trips: [...(selectedCompany.trips || []), newTrip],
//       };
  
//       const updatedCities = cities.map(city =>
//         city.id === selectedCityId
//           ? { ...city, companies: city.companies.map(c => c.id === selectedCompanyId ? updatedCompany : c) }
//           : city
//       );
  
//       await axios.put(`http://localhost:4001/posts/${selectedCityId}`, {
//         ...selectedCity,
//         companies: updatedCompany,
//       });
  
//       setCities(updatedCities); 
//       setSuccessMessage("Trip successfully added!");
//       setTripNumber("");
//       setTripDate("");
//       setAvailablePlaces("");
//       setDepartureStation("");
//       setStopStations("");
//       setDepartureTime("");
//       setDepartureTimePeriod("AM");
//       setArrivedTime("");
//       setArrivedTimePeriod("PM");
//       setPrice("");
//       setSelectedCityId("");
//       setSelectedCompanyId("");
//     } catch (error) {
//       console.error("Error adding trip:", error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row my-5">
//         <div className="col-md-6">
//           <h2 className="mb-4 text-center">Add New Trip</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Trip Number */}
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
//               {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
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
//               {validationErrors.tripDate && <p className="text-danger">{validationErrors.tripDate}</p>}
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
//               {validationErrors.availablePlaces && <p className="text-danger">{validationErrors.availablePlaces}</p>}
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
//               {validationErrors.departureStation && <p className="text-danger">{validationErrors.departureStation}</p>}
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
//               {validationErrors.stopStations && <p className="text-danger">{validationErrors.stopStations}</p>}
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="time"
//                 className={`form-control ${validationErrors.departureTime ? 'border-danger' : ''}`}
//                 id="floatingInputDepartureTime"
//                 placeholder="Enter departure time"
//                 name="departureTime"
//                 value={departureTime}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputDepartureTime">Departure Time</label>
//               {validationErrors.departureTime && <p className="text-danger">{validationErrors.departureTime}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="departureTimePeriod">Departure Time Period</label>
//               <select
//                 id="departureTimePeriod"
//                 className="form-select"
//                 name="departureTimePeriod"
//                 value={departureTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="time"
//                 className={`form-control ${validationErrors.arrivedTime ? 'border-danger' : ''}`}
//                 id="floatingInputArrivedTime"
//                 placeholder="Enter arrival time"
//                 name="arrivedTime"
//                 value={arrivedTime}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputArrivedTime">Arrival Time</label>
//               {validationErrors.arrivedTime && <p className="text-danger">{validationErrors.arrivedTime}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="arrivedTimePeriod">Arrival Time Period</label>
//               <select
//                 id="arrivedTimePeriod"
//                 className="form-select"
//                 name="arrivedTimePeriod"
//                 value={arrivedTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="number"
//                 className={`form-control ${validationErrors.price ? 'border-danger' : ''}`}
//                 id="floatingInputPrice"
//                 placeholder="Enter price"
//                 name="price"
//                 value={price}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputPrice">Price</label>
//               {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
//             </div>
//             {/* City Selection */}
//             <div className="form-floating mb-3">
//               <select
//                 className="form-select"
//                 id="floatingSelectCity"
//                 aria-label="Select city"
//                 name="selectedCityId"
//                 value={selectedCityId}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select City</option>
//                 {cities.map(city => (
//                   <option key={city.id} value={city.id}>
//                     {city.city}
//                   </option>
//                 ))}
//               </select>
//               <label htmlFor="floatingSelectCity">Select City</label>
//             </div>
//             {/* Company Selection */}
//             <div className="form-floating mb-3">
//               <select
//                 className="form-select"
//                 id="floatingSelectCompany"
//                 aria-label="Select company"
//                 name="selectedCompanyId"
//                 value={selectedCompanyId}
//                 onChange={handleInputChange}
//                 disabled={!selectedCityId}
//               >
//                 <option value="">Select Company</option>
//                 {selectedCityId && cities.find(city => city.id === selectedCityId)?.companies.map(company => (
//                   <option key={company.id} value={company.id}>
//                     {company.name}
//                   </option>
//                 ))}
//               </select>
//               <label htmlFor="floatingSelectCompany">Select Company</label>
//               {validationErrors.selectedCompanyId && <p className="text-danger">{validationErrors.selectedCompanyId}</p>}
//             </div>
//             <button type="submit" className="btn btn-primary">Add Trip</button>
//           </form>
//           {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
//           {error && <div className="alert alert-danger mt-3">{error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTripForm;

////////////////////////////////////////////////////////////////didn't add trip ////////////////////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AddTripForm() {
//   const [tripNumber, setTripNumber] = useState("");
//   const [tripDate, setTripDate] = useState("");
//   const [availablePlaces, setAvailablePlaces] = useState("");
//   const [departureStation, setDepartureStation] = useState("");
//   const [stopStations, setStopStations] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [departureTimePeriod, setDepartureTimePeriod] = useState("AM");
//   const [arrivedTime, setArrivedTime] = useState("");
//   const [arrivedTimePeriod, setArrivedTimePeriod] = useState("PM");
//   const [price, setPrice] = useState("");
//   const [selectedCityId, setSelectedCityId] = useState("");
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   const [cities, setCities] = useState([]);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4001/posts`);
//         setCities(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case "tripNumber":
//         setTripNumber(value);
//         break;
//       case "tripDate":
//         setTripDate(value);
//         break;
//       case "availablePlaces":
//         setAvailablePlaces(value);
//         break;
//       case "departureStation":
//         setDepartureStation(value);
//         break;
//       case "stopStations":
//         setStopStations(value);
//         break;
//       case "departureTime":
//         setDepartureTime(value);
//         break;
//       case "departureTimePeriod":
//         setDepartureTimePeriod(value);
//         break;
//       case "arrivedTime":
//         setArrivedTime(value);
//         break;
//       case "arrivedTimePeriod":
//         setArrivedTimePeriod(value);
//         break;
//       case "price":
//         setPrice(value);
//         break;
//       case "selectedCityId":
//         setSelectedCityId(value);
//         setSelectedCompanyId(""); // Reset selected company when city changes
//         break;
//       case "selectedCompanyId":
//         setSelectedCompanyId(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) errors.tripNumber = "Trip number must be a positive number.";
//     if (!tripDate) errors.tripDate = "Trip date is required.";
//     if (!availablePlaces || isNaN(availablePlaces) || availablePlaces <= 0) errors.availablePlaces = "Available places must be a positive number.";
//     if (!departureStation || typeof departureStation !== 'string' || departureStation.trim() === '' || /\d/.test(departureStation) || departureStation.split(' ').some(word => word.length < 3)) {
//       errors.departureStation = "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!stopStations || typeof stopStations !== 'string' || stopStations.trim() === '' || /\d/.test(stopStations) || stopStations.split(' ').some(word => word.length < 3)) {
//       errors.stopStations = "Stop stations must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!departureTime) errors.departureTime = "Departure time is required.";
//     if (!arrivedTime) errors.arrivedTime = "Arrival time is required.";
//     if (arrivedTime && departureTime && arrivedTime <= departureTime) errors.arrivedTime = "Arrival time must be after departure time.";
//     if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number.";
//     if (!selectedCityId) errors.selectedCityId = "City is required.";
//     if (!selectedCompanyId) errors.selectedCompanyId = "Company is required.";
//     setValidationErrors(errors);
//     return errors;
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const formatTime = (time, period) => {
//     return `${time} ${period}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = validateForm();
//     if (Object.keys(errors).length !== 0) return;

//     const formattedPrice = `${price} EGP`;
//     const formattedDepartureTime = formatTime(departureTime, departureTimePeriod);
//     const formattedArrivedTime = formatTime(arrivedTime, arrivedTimePeriod);

//     const newTrip = {
//       tripNumber,
//       tripDate: formatDate(tripDate),
//       availablePlaces,
//       departureStation,
//       stopStations,
//       departureTime: formattedDepartureTime,
//       arrivedTime: formattedArrivedTime,
//       price: formattedPrice,
//     };

//     try {
//       const selectedCity = cities.find(city => city.id === selectedCityId);
//       if (!selectedCity) {
//         throw new Error('Selected city not found');
//       }
// console.log(selectedCity)
//       const selectedCompany = selectedCity.companies.find(company => String(company.id) === String(selectedCompanyId));
//       if (!selectedCompany) {
//         throw new Error('Selected company not found in the selected city');
//       }

//       // Append the new trip to the selected company's existing trips
//       const updatedCompany = {
//         ...selectedCompany,
//         trips: [...(selectedCompany.trips || []), newTrip],
//       };

//       // Update the companies array within the selected city
//       const updatedCompanies = selectedCity.companies.map(company =>
//         company.id === selectedCompanyId ? updatedCompany : company
//       );

//       // Update the cities array with the new company list
//       const updatedCities = cities.map(city =>
//         city.id === selectedCityId
//           ? { ...city, companies: updatedCompanies }
//           : city
//       );

//       // Send the updated city data to the server
//       await axios.put(`http://localhost:4001/posts/${selectedCityId}`, {
//         ...selectedCity,
//         companies: updatedCompanies,
//         // console.log(companies)
//       });

//       // Update the local state
//       setCities(updatedCities);
//       setSuccessMessage("Trip successfully added!");
//       resetForm();
//     } catch (error) {
//       console.error("Error adding trip:", error);
//       setError(error.message);
//     }
//   };

//   const resetForm = () => {
//     setTripNumber("");
//     setTripDate("");
//     setAvailablePlaces("");
//     setDepartureStation("");
//     setStopStations("");
//     setDepartureTime("");
//     setDepartureTimePeriod("AM");
//     setArrivedTime("");
//     setArrivedTimePeriod("PM");
//     setPrice("");
//     setSelectedCityId("");
//     setSelectedCompanyId("");
//   };

//   return (
//     <div className="container">
//       <div className="row my-5">
//         <div className="col-md-6">
//           <h2 className="mb-4 text-center">Add New Trip</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Trip Number */}
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
//               {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
//             </div>

//             {/* Trip Date */}
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
//               {validationErrors.tripDate && <p className="text-danger">{validationErrors.tripDate}</p>}
//             </div>

//             {/* Available Places */}
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
//               {validationErrors.availablePlaces && <p className="text-danger">{validationErrors.availablePlaces}</p>}
//             </div>

//             {/* Departure Station */}
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
//               {validationErrors.departureStation && <p className="text-danger">{validationErrors.departureStation}</p>}
//             </div>

//             {/* Stop Stations */}
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
//               {validationErrors.stopStations && <p className="text-danger">{validationErrors.stopStations}</p>}
//             </div>

//             {/* Departure Time */}
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
//               {validationErrors.departureTime && <p className="text-danger">{validationErrors.departureTime}</p>}
//             </div>

//             {/* Departure Time Period */}
//             <div className="form-floating mb-3">
//               <select
//                 className={`form-control ${validationErrors.departureTimePeriod ? 'border-danger' : ''}`}
//                 id="floatingSelectDepartureTimePeriod"
//                 name="departureTimePeriod"
//                 value={departureTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//               <label htmlFor="floatingSelectDepartureTimePeriod">Departure Time Period</label>
//               {validationErrors.departureTimePeriod && <p className="text-danger">{validationErrors.departureTimePeriod}</p>}
//             </div>

//             {/* Arrival Time */}
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
//               {validationErrors.arrivedTime && <p className="text-danger">{validationErrors.arrivedTime}</p>}
//             </div>

//             {/* Arrival Time Period */}
//             <div className="form-floating mb-3">
//               <select
//                 className={`form-control ${validationErrors.arrivedTimePeriod ? 'border-danger' : ''}`}
//                 id="floatingSelectArrivedTimePeriod"
//                 name="arrivedTimePeriod"
//                 value={arrivedTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//               <label htmlFor="floatingSelectArrivedTimePeriod">Arrival Time Period</label>
//               {validationErrors.arrivedTimePeriod && <p className="text-danger">{validationErrors.arrivedTimePeriod}</p>}
//             </div>

//             {/* Price */}
//             <div className="form-floating mb-3">
//               <input
//                 type="number"
//                 className={`form-control ${validationErrors.price ? 'border-danger' : ''}`}
//                 id="floatingInputPrice"
//                 placeholder="Enter price"
//                 name="price"
//                 value={price}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputPrice">Price</label>
//               {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
//             </div>

//             {/* City */}
//             <div className="form-floating mb-3">
//               <select
//                 className={`form-control ${validationErrors.selectedCityId ? 'border-danger' : ''}`}
//                 id="floatingSelectCity"
//                 name="selectedCityId"
//                 value={selectedCityId}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select City</option>
//                 {cities.map(city => (
//                   <option key={city.id} value={city.id}>{city.city}</option>
//                 ))}
//               </select>
//               <label htmlFor="floatingSelectCity">City</label>
//               {validationErrors.selectedCityId && <p className="text-danger">{validationErrors.selectedCityId}</p>}
//             </div>

//             {/* Company */}
//             <div className="form-floating mb-3">
//               <select
//                 className={`form-control ${validationErrors.selectedCompanyId ? 'border-danger' : ''}`}
//                 id="floatingSelectCompany"
//                 name="selectedCompanyId"
//                 value={selectedCompanyId}
//                 onChange={handleInputChange}
//                 disabled={!selectedCityId}
//               >
//                 <option value="">Select Company</option>
//                 {selectedCityId && cities.find(city => city.id === selectedCityId)?.companies.map(company => (
//                   <option key={company.id} value={company.id}>{company.name}</option>
//                 ))}
//               </select>
//               <label htmlFor="floatingSelectCompany">Company</label>
//               {validationErrors.selectedCompanyId && <p className="text-danger">{validationErrors.selectedCompanyId}</p>}
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="btn btn-primary w-100">Add Trip</button>
//           </form>

//           {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
//           {error && <div className="alert alert-danger mt-3">{error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddTripForm;


/////////////////////////////////////////////////////////////////////////////localstorge////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AddTripForm (){
//   const [tripNumber, setTripNumber] = useState("");
//   const [tripDate, setTripDate] = useState("");
//   const [availablePlaces, setAvailablePlaces] = useState("");
//   const [departureStation, setDepartureStation] = useState("");
//   const [stopStations, setStopStations] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [departureTimePeriod, setDepartureTimePeriod] = useState("AM");
//   const [arrivedTime, setArrivedTime] = useState("");
//   const [arrivedTimePeriod, setArrivedTimePeriod] = useState("PM");
//   const [price, setPrice] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [cities, setCities] = useState([]);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   useEffect(() => {
//     const fetchCompany = async () => {
//       try {
//         // Fetch company data from localStorage
//         const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
//         if (storedCompany) {
//           setSelectedCompany(storedCompany);
//         } else {
//           setError('No company data found.');
//         }
//       } catch (error) {
//         console.error('Error fetching company data:', error);
//         setError(error.message);
//       }
//     };

//     const fetchCities = async () => {
//       try {
//         const response = await axios.get('http://localhost:4001/posts'); // Fetch cities from API
//         setCities(response.data);
//       } catch (error) {
//         console.error('Error fetching cities:', error);
//         setError('Failed to fetch cities.');
//       }
//     };

//     fetchCompany();
//     fetchCities();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "tripNumber") {
//       setTripNumber(value);
//     } else if (name === "tripDate") {
//       setTripDate(value);
//     } else if (name === "availablePlaces") {
//       setAvailablePlaces(value);
//     } else if (name === "departureStation") {
//       setDepartureStation(value);
//     } else if (name === "stopStations") {
//       setStopStations(value);
//     } else if (name === "departureTime") {
//       setDepartureTime(value);
//     } else if (name === "departureTimePeriod") {
//       setDepartureTimePeriod(value);
//     } else if (name === "arrivedTime") {
//       setArrivedTime(value);
//     } else if (name === "arrivedTimePeriod") {
//       setArrivedTimePeriod(value);
//     } else if (name === "price") {
//       setPrice(value);
//     } else if (name === "selectedCity") {
//       setSelectedCity(value);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) errors.tripNumber = "Trip number must be a positive number.";
//     if (!tripDate) errors.tripDate = "Trip date is required.";
//     if (!availablePlaces || isNaN(availablePlaces) || availablePlaces <= 0) errors.availablePlaces = "Available places must be a positive number.";
//     if (!departureStation || typeof departureStation !== 'string' || departureStation.trim() === '' || /\d/.test(departureStation) || departureStation.split(' ').some(word => word.length < 3)) {
//       errors.departureStation = "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!stopStations || typeof stopStations !== 'string' || stopStations.trim() === '' || /\d/.test(stopStations) || stopStations.split(' ').some(word => word.length < 3)) {
//       errors.stopStations = "Stop stations must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!departureTime) errors.departureTime = "Departure time is required.";
//     if (!arrivedTime) errors.arrivedTime = "Arrival time is required.";
//     if (arrivedTime && departureTime && arrivedTime <= departureTime) errors.arrivedTime = "Arrival time must be after departure time.";
//     if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number.";
//     if (!selectedCity) errors.selectedCity = "City is required.";
//     if (!selectedCompany) errors.selectedCompany = "Company is required.";
//     setValidationErrors(errors);
//     return errors;
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const formatTime = (time, period) => {
//     return `${time} ${period}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = validateForm();
//     if (Object.keys(errors).length !== 0) return; 

//     // Format price by appending 'EGP'
//     const formattedPrice = `${price} EGP`;

//     // Format times
//     const formattedDepartureTime = formatTime(departureTime, departureTimePeriod);
//     const formattedArrivedTime = formatTime(arrivedTime, arrivedTimePeriod);

//     const newTrip = {
//       tripNumber,
//       tripDate: formatDate(tripDate), 
//       availablePlaces,
//       departureStation,
//       stopStations,
//       departureTime: formattedDepartureTime, 
//       arrivedTime: formattedArrivedTime, 
//       price: formattedPrice, 
//       city: selectedCity,  // Include city in new trip
//     };

//     try {
//       // Get the current trips from the file
//       const response = await axios.get(`http://localhost:4001/posts/${selectedCity}`);
//       const allTrips = response.data;

//       // Add the new trip to the list
//       const updatedTrips = [...allTrips, { ...newTrip }];
//       // , companyId: selectedCompany.id, companyName: selectedCompany.name
//       // Save the updated trips to the file
//       await axios.post('http://localhost:4001/posts', updatedTrips);

//       setSuccessMessage("Trip added successfully!");
//       // Clear form fields
//       setTripNumber("");
//       setTripDate("");
//       setAvailablePlaces("");
//       setDepartureStation("");
//       setStopStations("");
//       setDepartureTime("");
//       setDepartureTimePeriod("AM");
//       setArrivedTime("");
//       setArrivedTimePeriod("PM");
//       setPrice("");
//       setSelectedCity("");
//     } catch (error) {
//       console.error('Error adding trip:', error);
//       setError("Failed to add trip. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Add New Trip</h2>
//       {error && <p className="text-danger">{error}</p>}
//       {successMessage && <p className="text-success">{successMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="tripNumber">Trip Number</label>
//           <input
//             type="number"
//             className="form-control"
//             id="tripNumber"
//             name="tripNumber"
//             value={tripNumber}
//             onChange={handleInputChange}
//           />
//           {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="tripDate">Trip Date</label>
//           <input
//             type="date"
//             className="form-control"
//             id="tripDate"
//             name="tripDate"
//             value={tripDate}
//             onChange={handleInputChange}
//           />
//           {validationErrors.tripDate && <p className="text-danger">{validationErrors.tripDate}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="availablePlaces">Available Places</label>
//           <input
//             type="number"
//             className="form-control"
//             id="availablePlaces"
//             name="availablePlaces"
//             value={availablePlaces}
//             onChange={handleInputChange}
//           />
//           {validationErrors.availablePlaces && <p className="text-danger">{validationErrors.availablePlaces}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="departureStation">Departure Station</label>
//           <input
//             type="text"
//             className="form-control"
//             id="departureStation"
//             name="departureStation"
//             value={departureStation}
//             onChange={handleInputChange}
//           />
//           {validationErrors.departureStation && <p className="text-danger">{validationErrors.departureStation}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="stopStations">Stop Stations</label>
//           <input
//             type="text"
//             className="form-control"
//             id="stopStations"
//             name="stopStations"
//             value={stopStations}
//             onChange={handleInputChange}
//           />
//           {validationErrors.stopStations && <p className="text-danger">{validationErrors.stopStations}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="departureTime">Departure Time</label>
//           <input
//             type="time"
//             className="form-control"
//             id="departureTime"
//             name="departureTime"
//             value={departureTime}
//             onChange={handleInputChange}
//           />
//           <select
//             className="form-control mt-2"
//             id="departureTimePeriod"
//             name="departureTimePeriod"
//             value={departureTimePeriod}
//             onChange={handleInputChange}
//           >
//             <option value="AM">AM</option>
//             <option value="PM">PM</option>
//           </select>
//           {validationErrors.departureTime && <p className="text-danger">{validationErrors.departureTime}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="arrivedTime">Arrived Time</label>
//           <input
//             type="time"
//             className="form-control"
//             id="arrivedTime"
//             name="arrivedTime"
//             value={arrivedTime}
//             onChange={handleInputChange}
//           />
//           <select
//             className="form-control mt-2"
//             id="arrivedTimePeriod"
//             name="arrivedTimePeriod"
//             value={arrivedTimePeriod}
//             onChange={handleInputChange}
//           >
//             <option value="AM">AM</option>
//             <option value="PM">PM</option>
//           </select>
//           {validationErrors.arrivedTime && <p className="text-danger">{validationErrors.arrivedTime}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             name="price"
//             value={price}
//             onChange={handleInputChange}
//           />
//           {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="selectedCity">City</label>
//           <select
//             className="form-control"
//             id="selectedCity"
//             name="selectedCity"
//             value={selectedCity}
//             onChange={handleInputChange}
//           >
//             <option value="">Select a city</option>
//             {cities.map((city) => (
//               <option key={city.id} value={city.name}>{city.city}</option>
//             ))}
//           </select>
//           {validationErrors.selectedCity && <p className="text-danger">{validationErrors.selectedCity}</p>}
//         </div>
//         <button type="submit" className="btn btn-primary">Add Trip</button>
//       </form>
//     </div>
//   );
// };

// export default AddTripForm;

///////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTripForm (){
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
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        // Fetch company data from localStorage
        const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
        if (storedCompany) {
          setSelectedCompany(storedCompany);
        } else {
          setError('No company data found.');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        setError(error.message);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:4001/posts'); // Fetch cities from API
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Failed to fetch cities.');
      }
    };

    fetchCompany();
    fetchCities();
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
    } else if (name === "selectedCity") {
      setSelectedCity(value);
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
    if (!selectedCity) errors.selectedCity = "City is required.";
    if (!selectedCompany) errors.selectedCompany = "Company is required.";
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
  
    const formattedPrice = `${price} EGP`;
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
      city: selectedCity,
      companyId: selectedCompany.id,
      companyName: selectedCompany.name
    };
  
    try {
      const response = await axios.get(`http://localhost:4001/posts?city=${selectedCity}&companyId=${selectedCompany.id}`);
      
      //  
      if (response.data && response.data.length > 0) {
        const companyData = response.data[0]; //frist item
        let updatedTrips = companyData.trips || [];
        updatedTrips = [...updatedTrips, newTrip];
  
        const updatedData = { ...companyData, trips: updatedTrips };
  
        // تأكد من أن الـ id ليس undefined
        if (companyData.id) {
          await axios.put(`http://localhost:4001/posts/${companyData.id}`, updatedData);
          setSuccessMessage("Trip added successfully!");
  
          // إعادة تعيين الحقول
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
          setSelectedCity("");
        } else {
          setError("Failed to identify company data.");
        }
      } else {
        setError("No data found for the selected city and company.");
      }
    } catch (error) {
      console.error('Error adding trip:', error);
      setError("Failed to add trip. Please try again.");
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Trip</h2>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tripNumber">Trip Number</label>
          <input
            type="number"
            className="form-control"
            id="tripNumber"
            name="tripNumber"
            value={tripNumber}
            onChange={handleInputChange}
          />
          {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="tripDate">Trip Date</label>
          <input
            type="date"
            className="form-control"
            id="tripDate"
            name="tripDate"
            value={tripDate}
            onChange={handleInputChange}
          />
          {validationErrors.tripDate && <p className="text-danger">{validationErrors.tripDate}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="availablePlaces">Available Places</label>
          <input
            type="number"
            className="form-control"
            id="availablePlaces"
            name="availablePlaces"
            value={availablePlaces}
            onChange={handleInputChange}
          />
          {validationErrors.availablePlaces && <p className="text-danger">{validationErrors.availablePlaces}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="departureStation">Departure Station</label>
          <input
            type="text"
            className="form-control"
            id="departureStation"
            name="departureStation"
            value={departureStation}
            onChange={handleInputChange}
          />
          {validationErrors.departureStation && <p className="text-danger">{validationErrors.departureStation}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="stopStations">Stop Stations</label>
          <input
            type="text"
            className="form-control"
            id="stopStations"
            name="stopStations"
            value={stopStations}
            onChange={handleInputChange}
          />
          {validationErrors.stopStations && <p className="text-danger">{validationErrors.stopStations}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="departureTime">Departure Time</label>
          <input
            type="time"
            className="form-control"
            id="departureTime"
            name="departureTime"
            value={departureTime}
            onChange={handleInputChange}
          />
          <select
            className="form-control mt-2"
            id="departureTimePeriod"
            name="departureTimePeriod"
            value={departureTimePeriod}
            onChange={handleInputChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          {validationErrors.departureTime && <p className="text-danger">{validationErrors.departureTime}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="arrivedTime">Arrival Time</label>
          <input
            type="time"
            className="form-control"
            id="arrivedTime"
            name="arrivedTime"
            value={arrivedTime}
            onChange={handleInputChange}
          />
          <select
            className="form-control mt-2"
            id="arrivedTimePeriod"
            name="arrivedTimePeriod"
            value={arrivedTimePeriod}
            onChange={handleInputChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          {validationErrors.arrivedTime && <p className="text-danger">{validationErrors.arrivedTime}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
          {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="selectedCity">City</label>
          <select
            className="form-control"
            id="selectedCity"
            name="selectedCity"
            value={selectedCity}
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.city}
              </option>
            ))}
          </select>
          {validationErrors.selectedCity && <p className="text-danger">{validationErrors.selectedCity}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Add Trip</button>
      </form>
    </div>
  );
};

export default AddTripForm;



///////////////////////////////////////////////////////give message add put didnt add?///////////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AddTripForm() {
//   const [tripNumber, setTripNumber] = useState("");
//   const [tripDate, setTripDate] = useState("");
//   const [availablePlaces, setAvailablePlaces] = useState("");
//   const [departureStation, setDepartureStation] = useState("");
//   const [stopStations, setStopStations] = useState("");
//   const [departureTime, setDepartureTime] = useState("");
//   const [departureTimePeriod, setDepartureTimePeriod] = useState("AM");
//   const [arrivedTime, setArrivedTime] = useState("");
//   const [arrivedTimePeriod, setArrivedTimePeriod] = useState("PM");
//   const [price, setPrice] = useState("");
//   const [selectedCityId, setSelectedCityId] = useState("");
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   const [cities, setCities] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:4001/posts');
//         setCities(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "selectedCityId") {
//       setSelectedCityId(value);
//       setSelectedCompanyId(""); // Reset company selection when city changes
//       const selectedCity = cities.find(city => city.id === value);
//       setCompanies(selectedCity && Array.isArray(selectedCity.companies) ? selectedCity.companies : []);
//     } else if (name === "selectedCompanyId") {
//       setSelectedCompanyId(value);
//     } else {
//       switch (name) {
//         case 'tripNumber': setTripNumber(value); break;
//         case 'tripDate': setTripDate(value); break;
//         case 'availablePlaces': setAvailablePlaces(value); break;
//         case 'departureStation': setDepartureStation(value); break;
//         case 'stopStations': setStopStations(value); break;
//         case 'departureTime': setDepartureTime(value); break;
//         case 'departureTimePeriod': setDepartureTimePeriod(value); break;
//         case 'arrivedTime': setArrivedTime(value); break;
//         case 'arrivedTimePeriod': setArrivedTimePeriod(value); break;
//         case 'price': setPrice(value); break;
//         default: break;
//       }
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) errors.tripNumber = "Trip number must be a positive number.";
//     if (!tripDate) errors.tripDate = "Trip date is required.";
//     if (!availablePlaces || isNaN(availablePlaces) || availablePlaces <= 0) errors.availablePlaces = "Available places must be a positive number.";
//     if (!departureStation || typeof departureStation !== 'string' || departureStation.trim() === '' || /\d/.test(departureStation) || departureStation.split(' ').some(word => word.length < 3)) {
//       errors.departureStation = "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!stopStations || typeof stopStations !== 'string' || stopStations.trim() === '' || /\d/.test(stopStations) || stopStations.split(' ').some(word => word.length < 3)) {
//       errors.stopStations = "Stop stations must be a non-empty string with each word having more than 3 characters and no numbers.";
//     }
//     if (!departureTime) errors.departureTime = "Departure time is required.";
//     if (!arrivedTime) errors.arrivedTime = "Arrival time is required.";
//     if (arrivedTime && departureTime && arrivedTime <= departureTime) errors.arrivedTime = "Arrival time must be after departure time.";
//     if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number.";
//     if (!selectedCityId) errors.selectedCityId = "City is required.";
//     if (!selectedCompanyId) errors.selectedCompanyId = "Company is required.";
//     setValidationErrors(errors);
//     return errors;
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const formatTime = (time, period) => {
//     return `${time} ${period}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = validateForm();
//     if (Object.keys(errors).length !== 0) return;

//     const formattedPrice = `${price} EGP`;
//     const formattedDepartureTime = formatTime(departureTime, departureTimePeriod);
//     const formattedArrivedTime = formatTime(arrivedTime, arrivedTimePeriod);

//     const newTrip = {
//       tripNumber,
//       tripDate: formatDate(tripDate),
//       availablePlaces,
//       departureStation,
//       stopStations,
//       departureTime: formattedDepartureTime,
//       arrivedTime: formattedArrivedTime,
//       price: formattedPrice,
//     };

//     try {
//       setLoading(true);
//       const selectedCity = cities.find(city => city.id === selectedCityId);
//       if (!selectedCity) {
//         throw new Error('Selected city not found');
//       }

//       const selectedCompany = selectedCity.companies.find(company => String(company.id) === String(selectedCompanyId));
//       if (!selectedCompany) {
//         throw new Error('Selected company not found in the selected city');
//       }

//       const updatedCompany = {
//         ...selectedCompany,
//         trips: [...(selectedCompany.trips || []), newTrip],
//       };

//       const updatedCities = cities.map(city =>
//         city.id === selectedCityId
//           ? {
//               ...city,
//               companies: city.companies.map(c =>
//                 c.id === selectedCompanyId ? updatedCompany : c
//               ),
//             }
//           : city
//       );

//       const response = await axios.put(`http://localhost:4001/posts/${selectedCityId}`, {
//         ...selectedCity,
//         companies: updatedCities.find(city => city.id === selectedCityId).companies,
//       });

//       setCities(updatedCities);
//       setSuccessMessage("Trip successfully added!");
//       setTripNumber("");
//       setTripDate("");
//       setAvailablePlaces("");
//       setDepartureStation("");
//       setStopStations("");
//       setDepartureTime("");
//       setDepartureTimePeriod("AM");
//       setArrivedTime("");
//       setArrivedTimePeriod("PM");
//       setPrice("");
//       setSelectedCityId("");
//       setSelectedCompanyId("");
//     } catch (error) {
//       console.error("Error adding trip:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row my-5">
//         <div className="col-md-6">
//           <h2 className="mb-4 text-center">Add New Trip</h2>
//           <form onSubmit={handleSubmit}>
//             {/* Form Fields */}
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
//               {validationErrors.tripNumber && <p className="text-danger">{validationErrors.tripNumber}</p>}
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
//               {validationErrors.tripDate && <p className="text-danger">{validationErrors.tripDate}</p>}
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
//               {validationErrors.availablePlaces && <p className="text-danger">{validationErrors.availablePlaces}</p>}
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
//               {validationErrors.departureStation && <p className="text-danger">{validationErrors.departureStation}</p>}
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
//               {validationErrors.stopStations && <p className="text-danger">{validationErrors.stopStations}</p>}
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="time"
//                 className={`form-control ${validationErrors.departureTime ? 'border-danger' : ''}`}
//                 id="floatingInputDepartureTime"
//                 placeholder="Enter departure time"
//                 name="departureTime"
//                 value={departureTime}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputDepartureTime">Departure Time</label>
//               {validationErrors.departureTime && <p className="text-danger">{validationErrors.departureTime}</p>}
//             </div>

//             <div className="form-floating mb-3">
//               <select
//                 className="form-select"
//                 id="floatingSelectDepartureTimePeriod"
//                 name="departureTimePeriod"
//                 value={departureTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//               <label htmlFor="floatingSelectDepartureTimePeriod">Departure Time Period</label>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="time"
//                 className={`form-control ${validationErrors.arrivedTime ? 'border-danger' : ''}`}
//                 id="floatingInputArrivedTime"
//                 placeholder="Enter arrived time"
//                 name="arrivedTime"
//                 value={arrivedTime}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputArrivedTime">Arrived Time</label>
//               {validationErrors.arrivedTime && <p className="text-danger">{validationErrors.arrivedTime}</p>}
//             </div>

//             <div className="form-floating mb-3">
//               <select
//                 className="form-select"
//                 id="floatingSelectArrivedTimePeriod"
//                 name="arrivedTimePeriod"
//                 value={arrivedTimePeriod}
//                 onChange={handleInputChange}
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//               <label htmlFor="floatingSelectArrivedTimePeriod">Arrived Time Period</label>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="number"
//                 className={`form-control ${validationErrors.price ? 'border-danger' : ''}`}
//                 id="floatingInputPrice"
//                 placeholder="Enter price"
//                 name="price"
//                 value={price}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="floatingInputPrice">Price</label>
//               {validationErrors.price && <p className="text-danger">{validationErrors.price}</p>}
//             </div>

//             <div className="form-floating mb-3">
//               <select
//                 className={`form-select ${validationErrors.selectedCityId ? 'border-danger' : ''}`}
//                 id="floatingSelectCity"
//                 name="selectedCityId"
//                 value={selectedCityId}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select City</option>
//                 {cities.map(city => (
//                   <option key={city.id} value={city.id}>{city.city}</option>
//                 ))}
//               </select>
//               <label htmlFor="floatingSelectCity">City</label>
//               {validationErrors.selectedCityId && <p className="text-danger">{validationErrors.selectedCityId}</p>}
//             </div>

//             <div className="form-floating mb-3">
//               <select
//                 className={`form-select ${validationErrors.selectedCompanyId ? 'border-danger' : ''}`}
//                 id="floatingSelectCompany"
//                 name="selectedCompanyId"
//                 value={selectedCompanyId}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map(company => (
//                   <option key={company.id} value={company.id}>{company.name}</option>
//                 ))}
//               </select>
//               <label htmlFor="floatingSelectCompany">Company</label>
//               {validationErrors.selectedCompanyId && <p className="text-danger">{validationErrors.selectedCompanyId}</p>}
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               {loading ? "Submitting..." : "Add Trip"}
//             </button>

//             {successMessage && <p className="text-success mt-3">{successMessage}</p>}
//             {error && <p className="text-danger mt-3">{error}</p>}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddTripForm;

