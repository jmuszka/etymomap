import React, {useState, useRef, useContext, createContext, useEffect} from 'react';

export const ctx = createContext();

export const GlobeBackgroundProvider = ({children}) => {
    const [currentCountryName, setCurrentCountryName] = useState("");

    const setFocusCountry = (countryName) => {
        setCurrentCountryName(countryName);
    }

    return(
        <ctx.Provider value={{currentCountryName, setCurrentCountryName}}>
            {children}
        </ctx.Provider> 
    );
}