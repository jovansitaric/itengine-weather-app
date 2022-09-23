import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "./Loader";

export const ApiDataContext = createContext();

export function ApiDataProvider({ children }) {
    const [data, setData] = useState([]);
    const [lat, setLat] = useState(false);
    const [lon, setLon] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation)
            return alert("Browser can't get location. Try different browser");

        navigator.geolocation.getCurrentPosition((position) => {
            setLat(() => position.coords.latitude);
            setLon(() => position.coords.longitude);
        });

        if (lat && lon) {
            fetchWithGeoLocation();
        }
    }, [lat, lon]);

    const fetchWithGeoLocation = () => {
        console.log("fetchWithGeoLocation");

        const geoLocationUrl = `${process.env.REACT_APP_API_URL}forecast.json?${process.env.REACT_APP_API_KEY}&q=${lat},${lon}&days=6`;

        axios
            .get(geoLocationUrl)
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        
        return (
            <Loader />
        );
    }

    else {

        return (
            <ApiDataContext.Provider value={data}>
                {children}
            </ApiDataContext.Provider>
        );
    }
}

export function useAPI() {
    const context = useContext(ApiDataContext);

    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}
