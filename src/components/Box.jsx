import React from "react";
import ApiWeatherIcons from "./ApiWeatherIcons";

const Box = ({ data, isMetric }) => {
    const { time, temp_c, temp_f, feelslike_c, feelslike_f } = data;
    const { icon } = data.condition

    const dateTime = new Date(time);
    const hours = dateTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const temperatures = {
        temp: isMetric ? Math.round(temp_c) : Math.round(temp_f),
        feelslike: isMetric ? Math.round(feelslike_c) : Math.round(feelslike_f),
    };

    return (
        <div className="m-box">
            <span className="m-box__text">{hours}</span>
            <ApiWeatherIcons icon={icon} />
            <span className="m-box__text">{temperatures.temp} {`${isMetric ? '\u2103' : '\u2109'} `}</span>
        </div>
    );
};

export default Box;
