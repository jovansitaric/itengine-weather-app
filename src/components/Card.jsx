import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WeatherIcon from "./WeatherIcon";

const round = (number) => {
    return Math.round(number);
};

const dateOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
}

const Card = ({ data, isMetric, className }) => {
    const { day, date } = data;
    const temperatures = {
        avgtemp: isMetric ? round(day.avgtemp_c) : round(day.avgtemp_f),
        minTemp: isMetric ? round(day.mintemp_c) : round(day.mintemp_f),
        maxTemp: isMetric ? round(day.maxtemp_c) : round(day.maxtemp_f),
    };

    const currentDate = new Date(date).toLocaleString("en-US", dateOptions);
    console.log(currentDate);

    const { code, text } = day.condition;

    return (
        <Link to="/weather" className={`m-card ${className ? className : ''}`}>
            <div className="m-card__content">
                <span className="m-card__content--date">{currentDate}</span>
                <WeatherIcon text={text} />
                <h2 className="m-card__content--heading">{temperatures.avgtemp} {`${isMetric ? '\u2103' : '\u2109'} `}</h2>
                <div className="m-card__content--temp">
                    <span>{temperatures.maxTemp}</span>
                    <span className="-light">/</span>
                    <span className="-light">{temperatures.minTemp}</span>
                </div>
                <p className="m-card__content--text">{text}</p>
            </div>
        </Link>
    );
};

export default Card;
