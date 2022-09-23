import React, { useId } from "react";
import { useLocation } from "react-router-dom";
import { useUnits } from "./UnitsDataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import goodWeather from "../images/good-weather.jpg";
import Card from "./Card";
import Box from "./Box";
import ToggleUnits from "./ToggleUnits";
import "swiper/css";

const SingleWeather = () => {
    const id = useId();
    const currentWeather = useLocation();
    const { day, hour, astro } = currentWeather.state;
    const contextUnits = useUnits();
    const { isMetric, setIsMetric } = contextUnits;

    const currentTime = new Date();

    const currentDay = hour[currentTime.getHours()];
    const { chance_of_rain, feelslike_c, humidity, feelslike_f, wind_kph, wind_mph, pressure_mb, uv, is_day } = currentDay;
    const { moon_illumination, moon_phase, moonrise, moonset, sunrise, sunset } = astro;

    const temperatures = {
        avgtemp: isMetric ? Math.round(day.avgtemp_c) : Math.round(day.avgtemp_f),
        feelslike: isMetric ? Math.round(feelslike_c) : Math.round(feelslike_f),
    };

    const winds = {
        wind: isMetric ? Math.round(wind_kph) : Math.round(wind_mph),
    };

    const feelsLikeFeel = () => {

        const currentTemperature = temperatures.avgtemp;
        const feelsLike = temperatures.feelslike;

        const formula = currentTemperature - feelsLike;

        if (formula < 0) {
            return <span className='a-icon -feelsLike -warm'></span>;
        }

        else if (formula > 0) {
            return <span className='a-icon -feelsLike -cold'></span>;
        }

        else {
            return <span className='a-icon -feelsLike -none'></span>;
        }
    };

    return (
        <div
            className="m-app"
            style={{ backgroundImage: `url(${goodWeather})` }}
        >
            <div className="_wr m-section">
                <div className="_w">
                    <div className="_12">
                        <ToggleUnits
                            isMetric={isMetric}
                            setIsMetric={setIsMetric}
                        />
                    </div>
                </div>
            </div>
            <section className="m-section -main _wr">
                <div className="_w -jcc">
                    <Card
                        data={currentWeather.state}
                        isMetric={isMetric}
                        className="-main _l6"
                    />
                </div>
            </section>
            <section className="m-section m-slider -hours">
                <Swiper
                    slidesPerView={3}
                    breakpoints={{
                        576: {
                            slidesPerView: 5,
                        },
                        992: {
                            slidesPerView: 10,
                        },
                    }}
                >
                    {hour.map((data, index) => {
                        return (
                            <SwiperSlide key={`${id}-${index}`}>
                                <Box isMetric={isMetric} data={data} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>
            <section className="m-section -dailyInfo _wr">
                <div className="_w">
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <span className="m-card__content--text">
                                {
                                    `${is_day
                                        ? `Sunrise: ${sunrise}`
                                        : `Moonrise: ${moonrise}`
                                    }`
                                }
                            </span>
                        </div>
                    </div>
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <span className="m-card__content--text">
                                {
                                    `${is_day
                                        ? `Sunset: ${sunset}`
                                        : `Moonset: ${moonset}`
                                    }`
                                }
                            </span>
                        </div>
                    </div>
                    { is_day == false && 
                        <>
                            <div className="_l6 m-card">
                                <div className="m-card__content">
                                    <span className="m-card__content--text">
                                        Moonphase: {moon_phase}
                                    </span>
                                </div>
                            </div>
                            <div className="_l6 m-card">
                                <div className="m-card__content">
                                    <span className="m-card__content--text">
                                        Moon illumination: {moon_illumination}
                                    </span>
                                </div>
                            </div>
                        </>
                    }
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <span className="m-card__content--text">Wind Speed: { winds.wind } { isMetric ? 'kph' : 'mph' }</span>
                        </div>
                    </div>
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <span className="m-card__content--text">Pressure: { pressure_mb } mb</span>
                        </div>
                    </div>
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <span className="m-card__content--text">Humidity: { humidity }</span>
                        </div>
                    </div>
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <span className="m-card__content--text">UV index: { uv }</span>
                        </div>
                    </div>
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <div className="m-card__content--text">
                                <span>Feels like: { temperatures.feelslike }  {`${isMetric ? '\u2103' : '\u2109'} `}</span>
                                { feelsLikeFeel() }
                            </div>
                        </div>
                    </div>
                    <div className="_l6 m-card">
                        <div className="m-card__content">
                            <div className="m-card__content--text">
                                <span>Rain chance: { chance_of_rain } %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SingleWeather;
