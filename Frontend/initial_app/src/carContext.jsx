import React, { createContext, useContext, useState } from 'react';

// Create context
const CarContext = createContext();

// Export the provider
export const CarProvider = ({ children }) => {
    const [selectedCar, setSelectedCar] = useState(null);

    return (
        <CarContext.Provider value={{ selectedCar, setSelectedCar }}>
            {children}
        </CarContext.Provider>
    );
};

// Custom hook for easy access
export const useCar = () => useContext(CarContext);