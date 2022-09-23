import "./scss/style.scss";
import { useId } from "react";

import goodWeather from './images/good-weather.jpg';
import Card from "./components/Card";
import ToggleUnits from "./components/ToggleUnits";
import { useAPI } from "./components/ApiDataContext";
import { useUnits } from "./components/UnitsDataContext";
import Location from "./components/Location";
import { Link } from "react-router-dom";

function App() {
    const contextData = useAPI();
    const data = contextData;
    const { isMetric, setIsMetric } = useUnits();
    const id = useId();

    const currentDay = data.forecast.forecastday[0];
    const forecast = data.forecast.forecastday.filter((forecast, index) => {
        if (index === 0) return false;
        return forecast;
    });

    return (
        <section className="m-section m-app" style={{backgroundImage: `url(${goodWeather})`}}>
            <div className="_wr">
                <div className="_w">
                    <Link to="/addCity" className="a-icon -plus" />
                </div>
            </div>
            <div className="m-section _wr">
                <div className="_w">
                    <div className="_12">
                        <Location location={data.location} />
                    </div>
                </div>
            </div>
            <div className="_wr m-section">
                <div className="_w">
                    <div className="_12">
                        <ToggleUnits isMetric={isMetric} setIsMetric={setIsMetric} />
                    </div>
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
