import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAPI } from "./ApiDataContext";
import goodWeather from "../images/good-weather.jpg";
import Card from "./Card";
import Box from "./Box";
import { useUnits } from "./UnitsDataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ToggleUnits from "./ToggleUnits";

const SingleWeather = () => {
    // const { date } = useParams();
    const currentWeather = useLocation();
    const { hour, astro } = currentWeather.state;
    const contextUnits = useUnits();
    const { isMetric, setIsMetric } = contextUnits;
    console.log(currentWeather);

    return (
        <div
            className="m-app"
            style={{ backgroundImage: `url(${goodWeather})` }}
        >
            <div className="_wr m-section">
                <div className="_w">
                    <ToggleUnits isMetric={isMetric} setIsMetric={setIsMetric} />
                </div>
            </div>
            <section className="m-section _wr">
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
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        576: {
                            slidesPerView: 5
                        },
                        992: {
                            slidesPerView: 10
                        }
                    }}
                >
                    {hour.map(data => {
                        return (
                            <SwiperSlide>
                                <Box isMetric={isMetric} data={data} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
        </div>
    );
};

export default SingleWeather;
