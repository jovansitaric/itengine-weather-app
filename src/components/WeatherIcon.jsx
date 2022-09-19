import React from "react";
import { Sunny, Cloudy, Rain, Snow } from "weather-styled-icon";

const WeatherIcon = ({ text }) => {
    return <Icon text={text} />;
};

const Icon = ({ text }) => {

    if (text.includes('sunny')) {
        return <Sunny />
    }

    else if (text.includes('rain')) {
        return <Rain />
    }

    else if (text.includes('cloud')) {
        return <Cloudy />
    }

    else {
        return <Snow />
    }
};

export default WeatherIcon;
