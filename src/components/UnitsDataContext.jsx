import React, { createContext, useContext, useState } from "react";

export const UnitsData = createContext();

export default function UnitsDataContext ({ children }) {
    const [isMetric, setIsMetric] = useState(true);

    return (
        <UnitsData.Provider value={{ isMetric, setIsMetric }}>
            {children}
        </UnitsData.Provider>
    );
};

export function useUnits() {
    const context = useContext(UnitsData);

    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}
