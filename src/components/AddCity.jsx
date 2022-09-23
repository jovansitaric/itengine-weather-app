import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import goodWeather from "../images/good-weather.jpg";
import Loader from "./Loader";

const AddCity = () => {
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [locationSuggestion, setLocationSuggestion] = useState(false);
    const id = useId();

    const searchLocationHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        const locationUrl = `${process.env.REACT_APP_API_URL}search.json?${process.env.REACT_APP_API_KEY}&q=${location}`;

        axios
            .get(locationUrl)
            .then((response) => {
                console.log(response);
                setLocationSuggestion(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
                setLocation('');
            });
    };

    const handleChange = (e) => {
        setLocation(e.target.value);
    };

    const handleLocationClick = (e) => {
        const selected = e.target
        const cards = document.querySelectorAll('.js-suggestionCards');

        cards.forEach(element => {
            element.classList.remove('-focus');
        });
        selected.classList.add('-focus');
    };

    const handleSave = (e) => {
        const country = document.querySelector('.js-suggestedCountry').innerText;
        const city = document.querySelector('.js-suggestedCity').innerText;

        if (e.target.nodeName === 'BUTTON') {
            localStorage.setItem('country', country);
            localStorage.setItem('city', city);
        }
    };

    if (loading) {

        return (
            <Loader />
        );
    }

    else {

        return (
            <form
                className="m-app"
                style={{ backgroundImage: `url(${goodWeather})` }}
                onSubmit={searchLocationHandler}
            >
                <div className="m-section -addCity">
                    <input type="search" value={location} onChange={handleChange} className="a-input -main js-searchLocation" />
                    <button type="submit" className="a-button -main">
                        Submit
                    </button>
                </div>
                { locationSuggestion &&
                    <section className="m-section -suggestedLocation _wr">
                        <div className="_w -fdc">
                            {locationSuggestion.map((location, index) => {
                                const { country, name } = location;

                                return (
                                    <a className="m-card _12 js-suggestionCards" href="#" onClick={handleLocationClick} key={`${id} - ${index}`}>
                                        <div className="m-card__content" onClick={handleSave}>
                                            <p className="m-card__content--text js-suggestedCountry">Country: {country}</p>
                                            <p className="m-card__content--text js-suggestedCity">City: {name}</p>
                                            <button className="a-button -suggested -main -hidden -small">Save</button>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                }
            </form>
        );
    }
};

export default AddCity;
