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

    return <Button type="button" onClick={handleConversion}>Test</Button>;
};

const Button = styled.button`

`

export default ToggleUnits;
