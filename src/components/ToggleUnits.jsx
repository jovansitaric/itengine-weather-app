import React from "react";
import styled from "styled-components";

const ToggleUnits = ({ isMetric, setIsMetric }) => {

    const handleConversion = (e) => {
        e.preventDefault();

        if (isMetric) {
            setIsMetric(false);
        }

        else {
            setIsMetric(true);
        }
    };

    return (
        <button className="a-button -main" type="button" onClick={handleConversion}>
            <span className={ `temperatures ${isMetric ? '-active' : '-disabled'} ` }>&#8451;</span>
            <span className="temperatures">/</span>
            <span className={ `temperatures ${!isMetric ? '-active' : '-disabled'} ` }>&#8457;</span>
        </button>
    );
};

export default ToggleUnits;
