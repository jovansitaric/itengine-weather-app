import "./scss/style.scss";
import axios from "axios";
import { useEffect, useId, useState } from "react";
import styled from "styled-components";

import goodWeather from './images/good-weather.jpg';
import Card from "./components/Card";
import ToggleUnits from "./components/ToggleUnits";

const MainContainer = styled.form`
    min-height: 100vh;
    background-image: url(${goodWeather});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

function App() {
    const [data, setData] = useState([]);
    const [daysForecast, setDaysForecast] = useState(false);
    const [isMetric, setIsMetric] = useState(true);
    const [lat, setLat] = useState(false);
    const [lon, setLon] = useState(false);
    const [loading, setLoading] = useState(false);
    const id = useId();

	useEffect(() => {
        setLoading(true);

        if (!navigator.geolocation) return alert("Browser can't get location. Try different browser");
            
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(() => position.coords.latitude);
            setLon(() => position.coords.longitude);
        });

        if (lat && lon) {
            fetchWithGeoLocation();
        }
	}, [lat, lon])

    const fetchWithGeoLocation = () => {
        console.log("fetchWithGeoLocation");

        const geoLocationUrl = `${process.env.REACT_APP_API_URL}forecast.json?${process.env.REACT_APP_API_KEY}&q=${lat},${lon}&days=5`;

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
            })
    };

    if (loading) {
        
        return (
            <h2>Loading..</h2>
        );
    }

    else {

        return (
            <MainContainer action="" className="m-app">
                <div className="_wr">
                    <div className="_w">
                        <ToggleUnits isMetric={isMetric} setIsMetric={setIsMetric} />
                    </div>
                </div>
                <div className="_wr">
                    <div className="_w">
                        {data.forecast.forecastday.map((weather, index) => {
                            return <Card isMetric={isMetric} day={weather.day} key={`${id}-${index}`} />
                        })}
                    </div>
                </div>
            </MainContainer> 
        )
    }
}

export default App;
