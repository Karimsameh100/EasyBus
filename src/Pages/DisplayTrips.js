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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Trips of {companyName}</h2>
            {/* ///////add trip */}
            <div className="mb-3">
        <Link to="/add-trip">
          <button className="btn btn-primary">Add New Trip</button>
        </Link>
      </div>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No trips found for this company.</p>
            )}
        </div>
    );
}

export default DisplayTrips;
