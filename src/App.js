import "./scss/style.scss";
import { useId, useState } from "react";

import goodWeather from './images/good-weather.jpg';
import Card from "./components/Card";
import ToggleUnits from "./components/ToggleUnits";
import { useAPI } from "./components/ApiDataContext";
import { useUnits } from "./components/UnitsDataContext";
import Location from "./components/Location";

function App() {
    const contextData = useAPI();
    const data = contextData;
    const { isMetric, setIsMetric } = useUnits();
    const id = useId();

    const currentDay = data.forecast.forecastday[0];
    const forecast = data.forecast.forecastday.filter((forecast, index) => {
        if (index === 0) return;
        return forecast;
    });
    console.log(forecast);

    return (
        <section className="m-app" style={{backgroundImage: `url(${goodWeather})`}}>
            <div className="_wr">
                <div className="_w">
                    <Location location={data.location} />
                </div>
            </div>
            <div className="_wr m-section">
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
        </section> 
    )
}

export default App;
