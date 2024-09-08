import React, { useEffect, useState } from 'react';

function DisplayTrips() {

    useEffect(() => {
        // Fetch all trips from API or localStorage
        const allTrips = JSON.parse(localStorage.getItem('trips')) || [];

        // Filter trips for the logged-in company
        const companyTrips = allTrips.filter(trip => trip.companyId === loggedInCompany.id);

        setTrips(companyTrips);
    }, [loggedInCompany]);

    return (
        <div className="container">
            <h2 className="my-4">Trips for {loggedInCompany.name}</h2>
            <ul>
                {trips.map(trip => (
                    <li key={trip.tripNumber}>{trip.tripNumber} - {trip.tripDate}</li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayTrips;
