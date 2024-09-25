

// export function CityDetailes() {
//   const params = useParams();
//   const [city, setCity] = useState();
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const reviewsPerPage = 4;
//   const [hasMoreReviews, setHasMoreReviews] = useState(true);
//   const [companiess, setCompanies] = useState([]);
//   const [trips, setTrips] = useState([]);
//   const currentUserId = 1;
//   const [allTrips, setAllTrips] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   // State to control the visibility of the success alert
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

//   // ------------------Favourites-----------START---------------------//
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/all/trips/`)
//       .then((res) => {
//         setAllTrips(res.data);
//       })
//       .catch((err) => console.error("Error fetching trips:", err));
//   }, [params.id]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/cities/${params.id}/`)
//       .then((res) => setCity(res.data))
//       .catch((err) => console.error("Error fetching city:", err));

//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (isLoggedIn === "true") {
//       setIsLoggedIn(true);
//     }
//   }, [params.id]);

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/register/company/')
//       .then(response => {
//         const cityName = city?.city;
//         const filteredCompanies = response.data.filter(company => {
//           const trips = company.company_trips.filter(trip => {
//             return trip.departuerStation === cityName || trip.destinationStation === cityName;
//           });
//           return trips.length > 0;
//         });
//         setCompanies(filteredCompanies);
//       })
//       .catch(error => console.error(error));
//   }, [params.id]);

//   const handleAddToFavorites = (trip) => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     const isAlreadyFavorite = storedFavorites.some(fav => fav.tripNumber === trip.tripNumber);
  
//     if (!isAlreadyFavorite) {
//       const newFavorite = { ...trip };
//       storedFavorites.push(newFavorite);
//       localStorage.setItem("favorites", JSON.stringify(storedFavorites));
  
//       // Dispatch a storage event to notify other components
//       window.dispatchEvent(new Event("storage"));
  
//       // Set favorites state and update badge count immediately
//       setFavorites(storedFavorites);
      
//       // Show success alert
//       setShowSuccessAlert(true);
      
//       // Automatically hide alert after 3 seconds
//       setTimeout(() => {
//         setShowSuccessAlert(false);
//       }, 3000);
//     }
//   };
//   // ------------------Favourites-----------END---------------------//

//   const handleBookTrip = (trip, company) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//     } else {
//       navigate(`/booking/${trip.tripNumber}`, { state: { trip, company } });
//     }
//   };

//   if (!city) {
//     return <div className="text-center fs-2 text-bg-primary h-75">Loading...</div>;
//   }

//   return (
//     <>
//       {/* Add a Bootstrap alert at the bottom of the page */}
//       {showSuccessAlert && (
//         <Alert
//           variant="success"
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "fit-content",
//             zIndex: 1000,
//           }}
//         >
//           This trip was added successfully to favorites!
//         </Alert>
//       )}

//       {/* Rest of the CityDetailes component */}
//       <div style={{ position: "relative" }}>
//         <img
//           src={city.image}
//           style={{
//             width: "100%",
//             height: "100vh",
//             objectFit: "cover",
//             opacity: 0.9,
//           }}
//         />
//         <div
//           className="d-flex flex-column align-items-center justify-content-center"
//           style={{
//             position: "absolute",
//             top: "0%",
//             left: "0%",
//             right: "0%",
//             padding: "10px",
//             paddingBottom: "30px",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(128, 128, 128, 0.4)",
//             display: "block",
//             justifyContent: "around",
//             alignItems: "center",
//             borderRadius: "10px",
//             boxSizing: "border-box",
//           }}
//         >
//           <h1 className="text-light text-center">Book your Ticket</h1>
//           <SearchComponent />
//           <h2 className="text-light text-center">{city.city} City</h2>
//         </div>
//       </div>

//       <div class="container-fluid">
//         {companiess && companiess.map((company) => (
//           <div key={company.id} class="row d-flex justify-content-center mb-5">
//             <h2 className="text-center m-5">Travel with {company.name}</h2>
//             <div class="col-sm-6 col-md-4">
//               <img src={company.image} className="img-fluid mt-5 " alt="Image" />
//             </div>
//             <div className="table-responsive col-sm-6 col-md-8">
//               <table className="table table-striped table-bordered-bold w-100">
//                 <thead>
//                   <tr>
//                     <th>Trip Number</th>
//                     <th>Trip Date</th>
//                     <th>Available Places</th>
//                     <th>Departure Station</th>
//                     <th>Stop Stations</th>
//                     <th>Go In</th>
//                     <th>Arrive At</th>
//                     <th>Price</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {company.company_trips.filter(trip => {
//                     return trip.departuerStation === city.city || trip.destinationStation === city.city;
//                   }).map(trip => (
//                     <tr key={trip.id}>
//                       <td>{trip.tripNumber}</td>
//                       <td>{trip.date}</td>
//                       <td>{trip.avilabalPlaces}</td>
//                       <td>{trip.departuerStation}</td>
//                       <td>{trip.destinationStation}</td>
//                       <td>{trip.departuerTime}</td>
//                       <td>{trip.destinationTime}</td>
//                       <td>{trip.price}</td>
//                       <td>
//                         <button
//                           className="btn btn-success btn-sm mx-1"
//                           style={{ width: "100%" }}
//                           onClick={() =>
//                             isLoggedIn
//                               ? handleBookTrip(trip, company)
//                               : setShowLoginModal(true)
//                           }
//                         >
//                           <FaRegBookmark /> Book
//                         </button>
//                         <button
//                           className="btn btn-outline-warning btn-sm mx-1 my-1"
//                           style={{ width: "100%" }}
//                           onClick={() =>
//                             isLoggedIn
//                               ? handleAddToFavorites(trip, company)
//                               : setShowLoginModal(true)
//                           }
//                         >
//                           <FaHeart />
//                           Liked
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

  