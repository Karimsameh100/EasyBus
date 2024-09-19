import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { state } = location;
    const { filteredTrips } = state ?? {};
    console.log(filteredTrips)

    if (!filteredTrips || filteredTrips.length === 0) {
        return <div className='text-center'> <h1 className='my-5'> No trips found  -_- </h1></div>;
    } 


    return (
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
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip.tripNumber}>
                <td>{trip.companyName}</td>
                <td>{trip.tripNumber}</td>
                <td>{trip.departuerStation}</td>
                <td>{trip.destinationStation}</td>
                <td>{trip.date}</td>
                <td>{trip.avilabalPlaces}</td>
                <td>{trip.price} EGP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SearchResults;