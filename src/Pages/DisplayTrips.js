


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisplayTrips() {
    const [companyName, setCompanyName] = useState('');
    const [trips, setTrips] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Adjust this number based on how many items you want per page

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
        </div>
    );
}

export default DisplayTrips;

