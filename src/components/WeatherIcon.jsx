import React from "react";
import { Sunny, Cloudy, Rain, Snow } from "weather-styled-icon";

const WeatherIcon = ({ text }) => {
    return <Icon text={text} />;
};

const Icon = ({ text }) => {

    if (text.includes('snow')) {
        return <Snow />
    }

    else if (text.includes('rain')) {
        return <Rain />
    }

    else if (text.includes('cloud')) {
        return <Cloudy />
    }

    else {
        return <Sunny />
    }
};

export default WeatherIcon;
