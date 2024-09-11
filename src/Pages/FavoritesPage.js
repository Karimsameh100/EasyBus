import React, { useState, useEffect } from "react";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (tripNumber) => {
    const updatedFavorites = favorites.filter(
      (trip) => trip.tripNumber !== tripNumber
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Dispatch a custom event to notify the NavBar component
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Your Favorite Trips</h2>
      {favorites.length === 0 ? (
        <p className="text-center my-3">You have no favorite trips yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Trip Number</th>
                <th>Trip Date</th>
                <th>Available Places</th>
                <th>Departure Station</th>
                <th>Stop Stations</th>
                <th>Go In</th>
                <th>Arrive At</th>
                <th>Price</th>
                <th>Company Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.tripNumber}</td>
                  <td>{trip.tripDate}</td>
                  <td>{trip.availablePlaces}</td>
                  <td>{trip.departureStation}</td>
                  <td>{trip.stopStations}</td>
                  <td>{trip.departureTime}</td>
                  <td>{trip.arrivedTime}</td>
                  <td>{trip.price}</td>
                  <td>{trip.companyName}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromFavorites(trip.tripNumber)}
                    >
                      Remove from Favorites
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




export default FavoritesPage;
