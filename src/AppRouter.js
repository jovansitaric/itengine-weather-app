import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AddCity from "./components/AddCity";
import { ApiDataProvider } from "./components/ApiDataContext";
import SingleWeather from "./components/SingleWeather";
import UnitsDataContext from "./components/UnitsDataContext";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ApiDataProvider>
                        <UnitsDataContext>
                            <App />
                        </UnitsDataContext>
                    </ApiDataProvider>
                } />
                <Route path="/weather/:date" element={
                    <UnitsDataContext>
                        <SingleWeather />
                    </UnitsDataContext>
                } />
                <Route path="/addCity" element={
                    <AddCity />
                } />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;
