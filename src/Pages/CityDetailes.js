import React, { useState } from "react";
import CityTrips from "../CityTrips.json"
import { useParams } from "react-router-dom";
import SearchComponent from "../Componants/Searh";
import { Reviews } from "../Componants/Review";

export function CityDetailes(){
    const params = useParams();
    const [city,setCity]=useState(CityTrips[params.id-1])

    return (
        <>
            <div style={{ position: "relative" }}>
                <img src={city.image} style={{width : "100%" , height : "100vh" , objectFit : "cover", opacity: 0.9 }} />
             
                <div style={{ 
                    position: "absolute", 
                    top: "30%", 
                    left: "20%",
                    right : "20%",
                    padding :"0px auto",
                    backgroundColor: "rgba(255, 255, 255, 0.1)", 
                    display: "block", 
                    justifyContent: "between", 
                    // alignItems: "center",
                    borderRadius : "10px" 
                }}>
                     <h1 className="text-light text-center">Book your Tiket</h1>
                    <SearchComponent />
                    <h2 className="text-light text-center">{city.city} City</h2>
                </div>
                
            </div>
            <div style={{display: "flex", alignItems: "center", margin: "20px"}}>
                <img src={city.image} style={{width : "50%" , height : "50%" , objectFit : "cover", marginRight: "20px"}} />
                <h4 style={{textAlign: "left"}}>{city.info}</h4>
            </div>
            <div>
                <Reviews />
            </div>
        </>
    )
}