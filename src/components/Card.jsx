import React from "react";
import { Link } from "react-router-dom";
import WeatherIcon from "./WeatherIcon";

const dateOptions = {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
}

const Card = ({ data, isMetric, className }) => {
    console.log(data);
    const { day, date } = data;
    const temperatures = {
        avgtemp: isMetric ?  Math.round(day.avgtemp_c) :  Math.round(day.avgtemp_f),
        minTemp: isMetric ?  Math.round(day.mintemp_c) :  Math.round(day.mintemp_f),
        maxTemp: isMetric ?  Math.round(day.maxtemp_c) :  Math.round(day.maxtemp_f),
    };

    const currentDate = new Date(date).toLocaleString("en-GB", dateOptions);
    console.log(currentDate);

    const { code, text } = day.condition;

    return (
        <div className={`m-card ${className ? className : ''}`}>
            <Link to={`/weather/${date}`} state={data} className="m-card__content">
                <span className="m-card__content--date">{currentDate}</span>
                <WeatherIcon text={text} />
                <h2 className="m-card__content--heading">{temperatures.avgtemp} {`${isMetric ? '\u2103' : '\u2109'} `}</h2>
                <div className="m-card__content--temp">
                    <span>{temperatures.maxTemp}</span>
                    <span className="-light">/</span>
                    <span className="-light">{temperatures.minTemp}</span>
                </div>
                <p className="m-card__content--text">{text}</p>
            </Link>
        </div>
    );
};

export default Card;
