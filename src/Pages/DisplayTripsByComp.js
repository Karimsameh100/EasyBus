

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // // The path to your JSON file
// // // const dataUrl = '/data/companiesTrips.json'; 

// // const DisplayTripsByComp = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     // Fetch data from the JSON file
// //     axios.get("http://localhost:4002/companies")
// //       .then(response => setData(response.data))
// //       .catch(error => console.error('Error fetching data:', error));
// //   }, []);

// //   if (!data) {
// //     return <div className='d-flex justify-content-center align-items-center fs-5 '>Loading...</div>;
// //   }

// //   return (
// //     <div>
// //       <h1 className='text-center'>Company Trips</h1>
// //       {data.companies.map(company => (
// //         <div key={company.id}>
// //           <h2>{company.name}</h2>
// //           <img src={company.image} alt={company.name} style={{ width: '200px', height: '100px' }} />
// //           <p>{company.about}</p>
// //           <table border="1" style={{ marginBottom: '20px', width: '100%' }}>
// //             <thead>
// //               <tr>
// //                 <th>Trip Number</th>
// //                 <th>Trip Date</th>
// //                 <th>Available Places</th>
// //                 <th>Departure Station</th>
// //                 <th>Stop Stations</th>
// //                 <th>Departure Time</th>
// //                 <th>Arrived Time</th>
// //                 <th>Price</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {company.trips.map(trip => (
// //                 <tr key={trip.tripNumber}>
// //                   <td>{trip.tripNumber}</td>
// //                   <td>{trip.tripDate}</td>
// //                   <td>{trip.availablePlaces}</td>
// //                   <td>{trip.departureStation}</td>
// //                   <td>{trip.stopStations}</td>
// //                   <td>{trip.departureTime}</td>
// //                   <td>{trip.arrivedTime}</td>
// //                   <td>{trip.price}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default DisplayTripsByComp;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DisplayTripsByComp = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tripsPerPage] = useState(5); // Number of trips per page

//   useEffect(() => {
//     // Fetch data from the API
//     axios.get("http://localhost:4002/companies")
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError('Failed to load data.');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className='d-flex justify-content-center align-items-center fs-5'>Loading...</div>;
//   }

//   if (error) {
//     return <div className='d-flex justify-content-center align-items-center fs-5'>{error}</div>;
//   }

//   // Function to paginate trips
//   const paginateTrips = (trips) => {
//     const indexOfLastTrip = currentPage * tripsPerPage;
//     const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
//     return trips.slice(indexOfFirstTrip, indexOfLastTrip);
//   };

//   // Function to handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       <h1 className='text-center'>Company Trips</h1>
//       {data && data.map(company => (
//         <div className='text-center' key={company.id} style={{ marginBottom: '40px' }}>
//           <h2 className='bg-black text-light py-2 my-3 '>{company.name}</h2>
//           <img src={company.image} alt={company.name} style={{ width: '1000px', height: '300px' }} />
//           <h3 className='py-5'>{company.about}</h3>
//           <table border="1" style={{ marginBottom: '20px', width: '100%' }}>
//             <thead>
//               <tr style={{backgroundColor: 'grey'}}>
//                 <th>Trip Number</th>
//                 <th>Trip Date</th>
//                 <th>Available Places</th>
//                 <th>Departure Station</th>
//                 <th>Stop Stations</th>
//                 <th>Departure Time</th>
//                 <th>Arrived Time</th>
//                 <th>Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginateTrips(company.trips).map(trip => (
//                 <tr key={trip.tripNumber}>
//                   <td>{trip.tripNumber}</td>
//                   <td>{trip.tripDate}</td>
//                   <td>{trip.availablePlaces}</td>
//                   <td>{trip.departureStation}</td>
//                   <td>{trip.stopStations}</td>
//                   <td>{trip.departureTime}</td>
//                   <td>{trip.arrivedTime}</td>
//                   <td>{trip.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           <div className='text-center'>
//             {Array.from({ length: Math.ceil(company.trips.length / tripsPerPage) }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 style={{ margin: '0 5px' }}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DisplayTripsByComp;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayTripsByComp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTrips, setAllTrips] = useState([]);
  const params = useParams(); // Define the params variable using the useParams hook

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage] = useState(5); // Number of trips per page

  useEffect(() => {
    axios
      .get(`http://localhost:8000/all/trips/`)
      //   (`http://localhost:4001/posts/${params.id}`)
      .then((res) => {
        setAllTrips(res.data);
      })
      .catch((err) => console.error("Error fetching trips:", err));
  }, [params.id, setEditTrip, setAllTrips]);

  useEffect(() => {
    // Fetch data from the API
    axios.get("http://localhost:4002/companies")
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='d-flex justify-content-center align-items-center fs-5'>Loading...</div>;
  }

  if (error) {
    return <div className='d-flex justify-content-center align-items-center fs-5'>{error}</div>;
  }

  // Function to paginate trips
  const paginateTrips = (trips) => {
    const indexOfLastTrip = currentPage * tripsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
    return trips.slice(indexOfFirstTrip, indexOfLastTrip);
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table table-striped table-bordered-bold">
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
          {allTrips.map((trip) => (
            <tr key={trip.tripNumber}>
              <td>{trip.tripNumber}</td>
              <td>{trip.date}</td>
              <td>{trip.avilabalPlaces}</td>
              <td>{trip.departuerStation}</td>
              <td>{trip.destinationStation}</td>
              <td>{trip.departuerTime}</td>
              <td>{trip.destinationTime}</td>
              <td>{trip.price}</td>
              <td>
                {/* <button
class="btn btn-success btn-sm mx-1"
style={{ width: "100%" }}
onClick={() =>
isLoggedIn
? handleBookTrip(trip, company)
: setShowLoginModal(true)
}
>
Book
</button> */}
                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: "45%" }}
                  onClick={() => {
                    handleEditTrip(trip, company);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm mx-1 "
                  style={{ width: "47%" }}
                  onClick={() => {
                    handleDeleteTrip(trip, company);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-warning btn-sm mx-1 my-1"
                  style={{ width: "100%" }}
                  onClick={() =>
                    isLoggedIn
                      ? handleAddToFavorites(trip, company)
                      : setShowLoginModal(true)
                  }
                >
                  Favorites
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='text-center'>
        {Array.from({ length: Math.ceil(company.trips.length / tripsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: '0 5px' }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DisplayTripsByComp;
