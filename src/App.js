import "./scss/style.scss";
import axios from "axios";
import { useEffect, useId, useState } from "react";
import styled from "styled-components";

import goodWeather from './images/good-weather.jpg';
import Card from "./components/Card";
import ToggleUnits from "./components/ToggleUnits";

const MainContainer = styled.form`
    min-height: 100vh;
    background-image: linear-gradient(to bottom, #00000030, #00000030), url(${goodWeather});
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
    const [loading, setLoading] = useState(true);
    const id = useId();

	useEffect(() => {

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
            })
    };

    if (loading) {
        
        return (
            <h2>Loading..</h2>
        );
    }

    else {
        const currentDay = data.forecast.forecastday[0];
        const forecast = data.forecast.forecastday.filter((forecast, index) => {
            if (index === 0) return;
            return forecast;
        });
        console.log(forecast);

        return (
            <MainContainer action="" className="m-app">
                <div className="_wr">
                    <div className="_w">
                        <ToggleUnits isMetric={isMetric} setIsMetric={setIsMetric} />
                    </div>
                </div>
                <div className="_wr m-section">
                    <div className="_w -jcc">
                        <Card className="-main" isMetric={isMetric} data={currentDay} /> 
                    </div>
                </div>
                <div className="_wr m-section">
                    <div className="_w -jcsb">
                        {forecast.map((weather, index) => {
                            return <Card className='_l2' isMetric={isMetric} data={weather} key={`${id}-${index}`} />
                        })}
                    </div>
                </div>
            </MainContainer> 
        )
    }
}

export default App;
