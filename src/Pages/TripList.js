import React from "react";
import { TripItem } from "../Componants/Trip";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
//import CityTrips from "../CityTrips.json"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function TripList() {
  const [trips, setTrips] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/cities/")
      .then((res) => {
        console.log(res.data);
        setTrips(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const totalPages = trips ? Math.ceil(trips.length / itemsPerPage) : 0;

  const handlePageChange = (page) => {
    if (trips) {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = trips ? trips.slice(startIndex, endIndex) : [];
  return (
    <div className="container-fluid p-4" style={{ width: "100%" }}>
      <div className="row justify-content-center mb-4">
        {currentPageItems.length > 0 ? (
          currentPageItems.map((Trip) => (
            <div
              className="col-md-4 col-sm-6 mb-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TripItem {...Trip} key={Trip.id} />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">
            <p>No cities found for the selected filters.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mb-4 bg-gray">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="btn btn-secondary btn-md mr-2"
        >
          {/* Previous */}
          <FaArrowLeft />
        </button>
        {Array(totalPages)
          .fill(0)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-md ${
                currentPage === index + 1 ? "btn-primary" : "btn-secondary"
              }`}
            >
              {index + 1}
            </button>
          ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn btn-secondary btn-md ml-2"
        >
          {/* Next */}
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
