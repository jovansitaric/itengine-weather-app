import React from "react";
import styled from "styled-components";
import WeatherIcon from "./WeatherIcon";

const Card = ({ day, isMetric }) => {
    const temperatures = {
        avgtemp: isMetric ? day.avgtemp_c : day.avgtemp_f,
        minTemp: isMetric ? day.mintemp_c : day.mintemp_f,
        maxTemp: isMetric ? day.maxtemp_c : day.maxtemp_f,
    };
    const { code, text } = day.condition;

    return (
        <CardContainer className="m-card">
            <div className="m-card__content">
                <WeatherIcon text={text} />
                <h2>{text}</h2>
                <span>{temperatures.avgtemp}</span>
            </div>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    
`

export default Card;
