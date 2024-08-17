import React, { useState ,useEffect } from "react";
import CityTrips from "../CityTrips.json"
import { useParams } from "react-router-dom";
import SearchComponent from "../Componants/Searh";
import { Reviews } from "../Componants/Review";
import axios from "axios";

export function CityDetailes(){
    const params = useParams();
    const [city,setCity]=useState();

    useEffect(() => {
        axios
          .get(`http://localhost:4001/posts/${params.id}`)
          .then((res) => {
            console.log(res.data)
            setCity(res.data);
          })
          .catch((err) => console.error('Error fetching products:', err));
      }, []);

      if (!city) {
        return <div>Loading...</div>;
      }

    return (
        <>
            <div className="h-100" style={{ position: "relative" , height : "100vh",overflow: "hidden"}}>
                <img src={city?.image} style={{width : "100%" , height : "100vh" , objectFit : "cover", opacity: 0.9 }} />
             
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ 
                    position: "absolute", 
                    top: "0%", 
                    left: "0%",
                    right : "4%",
                    padding :"10px",
                    paddingBottom : "30px",
                    width : "100%",
                    height : "100%",
                    maxHeight: "100%", // add this to prevent height overflow
                    maxWidth: "100%",
                    backgroundColor: "rgba(128, 128, 128, 0.4)", 
                    display: "block", 
                    textAlign: "center",
                    justifyContent: "center", 
                    alignItems: "center",
                    borderRadius : "10px" ,
                    boxSizing: "border-box"
                }}>
                     <h1 className="text-light  text-center">Book your Tiket</h1>
                    <SearchComponent />
                    <h2 className="text-light text-center">{city.city} City</h2>
                </div>
                
            </div>
            <div style={{display: "flex", alignItems: "center", margin: "20px"}}>
                <img src={city?.image} style={{width : "50%" , height : "50%" , objectFit : "cover", marginRight: "20px"}} />
                <h4 style={{textAlign: "left"}}>{city.info}</h4>
            </div>
            <div>
                <Reviews />
            </div>
        </>
    )
}