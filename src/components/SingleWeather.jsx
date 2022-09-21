import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiDataProvider } from './ApiDataContext';

const SingleWeather = () => {
    const { date } = useParams();

    return (
        <ApiDataProvider>
            <div>
                SingleWeather: {date}
            </div>
        </ApiDataProvider>
    );
};

export default SingleWeather;
