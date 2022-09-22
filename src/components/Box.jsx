import React from "react";
import WeatherIcon from "./WeatherIcon";

const Box = ({ data, isMetric }) => {
    const { time, humidity, chance_of_rain, is_day, pressure_mb, uv, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, wind_mph } = data;
    const { text } = data.condition

    const dateTime = new Date(time);
    const hours = dateTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    console.log('data', data);

    const temperatures = {
        temp: isMetric ? Math.round(temp_c) : Math.round(temp_f),
        feelslike: isMetric ? Math.round(feelslike_c) : Math.round(feelslike_f),
    };

    const winds = {
        wind: isMetric ? Math.round(wind_kph) : Math.round(wind_mph)
    }

    return (
        <div className="m-box">
            <span class="m-box__text">{hours}</span>
            <WeatherIcon text={text} />
            <span className="m-box__text">{temperatures.temp} {`${isMetric ? '\u2103' : '\u2109'} `}</span>
        </div>
    );
};

export default Box;
