import React from "react";

const Location = ({ location }) => {
    const { country, name, region } = location;

    return (
        <div className="m-section -location">
            <div className="m-section__content">
                <span className="a-text -location">Country: {country}</span>
                <span className="a-text -location">Region: {region}</span>
            </div>
            <div className="m-section__content">
                <h1 className="-mha">Current Location: {name}</h1>
            </div>
        </div>
    );
};

export default Location;
