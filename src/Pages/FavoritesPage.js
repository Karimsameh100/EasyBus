import React, { useState, useEffect } from "react";
import axios from "axios";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:8000/favorites/${favoriteId}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Directly update favorites after removing the trip
      const updatedFavorites = favorites.filter(
        (trip) => trip.tripNumber !== favoriteId
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update local storage
    } catch (error) {
      console.error("Error removing from favorites", error);
    }
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.tripNumber}</td>
                  <td>{trip.date}</td>
                  <td>{trip.avilabalPlaces}</td>
                  <td>{trip.departuerStation}</td>
                  <td>{trip.destinationStation}</td>
                  <td>{trip.departuerTime}</td>
                  <td>{trip.destinationTime}</td>
                  <td>{trip.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFavorite(trip.tripNumber)}
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
