import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { state } = location;
    const { filteredTrips } = state ?? {};
    console.log(filteredTrips)

    if (!filteredTrips || filteredTrips.length === 0) {
        return <div>No trips found</div>;
    } 


    return (
        <div className="container mt-5">
        <h1 className="text-center mb-4">Search Results</h1>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Company</th>
              <th>Trip Number</th>
              <th>Departure Station</th>
              <th>Stop Stations</th>
              <th>Trip Date</th>
              <th>Available Places</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip.tripNumber}>
                <td>{trip.companyName}</td>
                <td>{trip.tripNumber}</td>
                <td>{trip.departureStation}</td>
                <td>{trip.stopStations}</td>
                <td>{trip.tripDate}</td>
                <td>{trip.availablePlaces}</td>
                <td>{trip.price} EGP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SearchResults;