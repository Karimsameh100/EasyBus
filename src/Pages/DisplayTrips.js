// فيه مشكله انه لما بعمل لوج ان مش بيظهرلي غير انه مفيش شركه بالاسم ده 
// DisplayTrips.js
// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Ensure axios is installed: npm install axios

// function DisplayTrips() {
//     const [companyTrips, setCompanyTrips] = useState([]);
//     const [loggedInCompany, setLoggedInCompany] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         // Retrieve logged-in company data from localStorage
//         const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));

//         if (storedCompany) {
//             setLoggedInCompany(storedCompany);

//             // Fetch trips data from the API
//             fetchTrips(storedCompany);
//         }
//     }, []);

//     const fetchTrips = async (company) => {
//         try {
//             const response = await axios.get("http://localhost:4001/posts");
//             const tripsData = response.data;

//             // Filter trips based on the company's name (you might need to adjust the filtering condition based on your data)
//             const filteredTrips = tripsData.filter(trip => trip.companyId === company.name.toLowerCase().replace(' ', ''));

//             setCompanyTrips(filteredTrips);
//         } catch (error) {
//             setError("Error fetching trips. Please try again later.");
//             console.error("Error fetching trips:", error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             {loggedInCompany ? (
//                 <>
//                     <h2 className="mb-4">{loggedInCompany.name} Trips</h2>
//                     {error && <p className="text-danger">{error}</p>}
//                     {companyTrips.length > 0 ? (
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Trip ID</th>
//                                     <th>Trip Name</th>
//                                     <th>Departure Time</th>
//                                     <th>Destination</th>
//                                     {/* Add more columns as per your API response */}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {companyTrips.map(trip => (
//                                     <tr key={trip.id}>
//                                         <td>{trip.id}</td>
//                                         <td>{trip.tripName}</td>
//                                         <td>{trip.departureTime}</td>
//                                         <td>{trip.destination}</td>
//                                         {/* Adjust these fields based on your actual trip data structure */}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No trips available for {loggedInCompany.name}</p>
//                     )}
//                 </>
//             ) : (
//                 <p>Please login to see your trips</p>
//             )}
//         </div>
//     );
// }

// export default DisplayTrips;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function DisplayTrips() {
//     const [trips, setTrips] = useState([]);
//     const [filteredTrips, setFilteredTrips] = useState([]);

//     useEffect(() => {
//         // Fetch trips from API
//         const fetchTrips = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4001/posts');
//                 setTrips(response.data);
//                 filterTrips(response.data);
//             } catch (error) {
//                 console.error('Error fetching trips:', error);
//             }
//         };

//         // Fetch the logged-in company data from localStorage
//         const storedCompany = JSON.parse(localStorage.getItem('userInputs'));
//         if (storedCompany) {
//             fetchTrips();
//         } else {
//             console.warn('No logged-in company found.');
//         }
//     }, []);

//     // Filter trips based on company ID and name
//     const filterTrips = (trips) => {
//         const storedCompany = JSON.parse(localStorage.getItem('userInputs'));
//         if (storedCompany) {
//             const filtered = trips.filter(
//                 (trip) =>
//                     trip.companyId === storedCompany.id &&
//                     trip.companyName === storedCompany.name
//             );
//             setFilteredTrips(filtered);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Trips of {JSON.parse(localStorage.getItem('userInputs'))?.name}</h2>
//             {filteredTrips.length > 0 ? (
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Trip Number</th>
//                             <th>Trip Date</th>
//                             <th>Available Places</th>
//                             <th>Departure Station</th>
//                             <th>Stop Stations</th>
//                             <th>Departure Time</th>
//                             <th>Arrived Time</th>
//                             <th>Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredTrips.map((trip) => (
//                             <tr key={trip.tripNumber}>
//                                 <td>{trip.tripNumber}</td>
//                                 <td>{trip.tripDate}</td>
//                                 <td>{trip.availablePlaces}</td>
//                                 <td>{trip.departureStation}</td>
//                                 <td>{trip.stopStations.join(', ')}</td>
//                                 <td>{trip.departureTime}</td>
//                                 <td>{trip.arrivedTime}</td>
//                                 <td>{trip.price}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p className="text-center">No trips found for this company.</p>
//             )}
//         </div>
//     );
// }

// export default DisplayTrips;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisplayTrips() {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [companyName, setCompanyName] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({}); // Initialize formData state
    const [editTrip, setEditTrip] = useState(null); // Initialize editTrip state
    const [company, setCompany] = useState(null); // Initialize company state
    const [showModal, setShowModal] = useState(false);

    // const handleEditTrip = (trip, company) => {
    //     setEditTrip(trip);
    //     setCompany(company);
    //     setFormData({
    //         tripNumber: trip.tripNumber,
    //         tripDate: trip.tripDate,
    //         availablePlaces: trip.availablePlaces,
    //         departureStation: trip.departureStation,
    //         stopStations: trip.stopStations,
    //         departureTime: trip.departureTime,
    //         arrivedTime: trip.arrivedTime,
    //         price: trip.price,
    //     });
    //     setShowEditModal(true);
    // };

    // const handleChange = (event) => {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Update the trip in the JSON data
    //     axios.put(`http://localhost:4001/posts/${params.id}`, {
    //         ...city,
    //         companies: city.companies.map((c) => {
    //             if (c.id === company.id) {
    //                 return {
    //                     ...c,
    //                     trips: c.trips.map((t) => {
    //                         if (t.tripNumber === editTrip.tripNumber) {
    //                             return {
    //                                 ...formData,
    //                                 id: t.id,
    //                             };
    //                         }
    //                         return t;
    //                     }),
    //                 };
    //             }
    //             return c;
    //         }),
    //     })
    //         .then((res) => {
    //             setCity(res.data);
    //             setShowEditModal(false); // Hide the modal after update
    //         })
    //         .catch((err) => console.error('Error updating trip:', err));
    // };

    // const handleDeleteTrip = (trip, company) => {
    //     setEditTrip(trip);
    //     setCompany(company);
    //     setShowDeleteModal(true);
    // };

    // const confirmDelete = () => {
    //     // Delete the trip from the JSON data
    //     axios
    //         .put(`http://localhost:4001/posts/${params.id}`, {
    //             ...city,
    //             companies: city.companies.map((c) => {
    //                 if (c.id === company.id) {
    //                     return {
    //                         ...c,
    //                         trips: c.trips.filter((t) => t.tripNumber !== editTrip.tripNumber),
    //                     };
    //                 }
    //                 return c;
    //             }),
    //         })
    //         .then((res) => {
    //             setCity(res.data);
    //             setShowDeleteModal(false); // Hide the modal after deletion
    //         })
    //         .catch((err) => console.error("Error deleting trip:", err));
    // };

    // const cancelDelete = () => {
    //     setShowDeleteModal(false); // Hide the modal on cancel
    // };


    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get('http://localhost:4001/posts');
                setTrips(response.data);
                filterTrips(response.data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        // Fetch the logged-in company data from localStorage
        const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
        if (storedCompany) {
            setCompanyName(storedCompany.name);
            fetchTrips();
        } else {
            console.warn('No logged-in company found.');
        }
    }, []);

    const filterTrips = (trips) => {
        const storedCompany = JSON.parse(localStorage.getItem('loggedInCompany'));
        if (storedCompany) {
            const filtered = trips.filter(
                (trip) =>
                    trip.companyId === storedCompany.id &&
                    trip.companyName === storedCompany.name
            );
            setFilteredTrips(filtered);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Trips of {companyName}</h2>
                {filteredTrips.length > 0 ? (
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
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrips.map((trip) => (
                                <tr key={trip.tripNumber}>
                                    <td>{trip.tripNumber}</td>
                                    <td>{trip.tripDate}</td>
                                    <td>{trip.availablePlaces}</td>
                                    <td>{trip.departureStation}</td>
                                    <td>{trip.stopStations.join(', ')}</td>
                                    <td>{trip.departureTime}</td>
                                    <td>{trip.arrivedTime}</td>
                                    <td>{trip.price}</td>
                                    {/* <td>

                                        <button
                                            className="btn btn-primary btn-sm"
                                            style={{ width: "33%" }}
                                            onClick={() => {
                                                handleEditTrip(trip, company);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ width: "33%" }}
                                            onClick={() => {
                                                handleDeleteTrip(trip, company);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No trips found for this company.</p>
                )}
            </div>


            {/* {showEditModal && (
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
                        <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                            Delete
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            )} */}
        </>
    );
}

export default DisplayTrips;
