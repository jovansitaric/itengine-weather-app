import React from "react";

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
            <span className={ `temperatures ${isMetric ? '-active' : '-disabled'} ` }>Metric</span>
            <span className="temperatures">/</span>
            <span className={ `temperatures ${!isMetric ? '-active' : '-disabled'} ` }>Imperial</span>
        </button>
    );
};

export default ToggleUnits;
