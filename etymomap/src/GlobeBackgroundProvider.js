import React, {useState, useRef, useContext, createContext, useEffect} from 'react';

export const ctx = createContext();

export const GlobeBackgroundProvider = ({children}) => {
    const [currentCountryName, setCurrentCountryName] = useState("");
    const [focus, setFocus] = useState(false);
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: []});
    const [locations, setLocations] = useState([]);

    const defaultLatitude = 25.0;
    const defaultLongitude = 0.0;
    const defaultAltitude = 1.2;
    const focusedAltitude = 0.5;
    const transitionTime = 1000; //ms
    const rotateSpeed = 0.8;

    // Initialization
    useEffect(() => {
        // Load data
        fetch('countries.geojson').then(res => res.json()).then(setCountries);
        fetch('coordinates.json').then(res => res.json()).then(setLocations);

        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = rotateSpeed;
        globeEl.current.controls().enableZoom = false;

        globeEl.current.pointOfView({ lat: defaultLatitude, lng: defaultLongitude, altitude: defaultAltitude }); // set globe angle, position, size
    }, []);


    const toggleFocus = (countryName) => {
        const location = getCoordinatesByName(countryName);
        setCurrentCountryName(countryName)
        //console.log("TOGGLE FOCUS: " + currentCountryName)

        if (!location) return

        if (!focus) {
            globeEl.current.pointOfView({ lat: location.latitude, lng: location.longitude, altitude: focusedAltitude}, transitionTime)
            globeEl.current.controls().autoRotateSpeed = 0;
        }
        else {
            globeEl.current.pointOfView({ lat: defaultLatitude, altitude: defaultAltitude }, transitionTime); // set globe angle, position, size
            globeEl.current.controls().autoRotateSpeed = rotateSpeed;
        }

        setFocus(!focus);
    }

    const getCurrentCountryName = () => {
        return currentCountryName;
    }

    const getFocusValue = () => {
        return focus;
    }

    const getCoordinatesByName = (countryName) => {
        for (let i = 0; i < locations.length; i++)
            if (locations[i]['name'] === countryName) return {latitude: locations[i]['latitude'], longitude: locations[i]['longitude']}

        return null;
    }

    return(
        <ctx.Provider value={{currentCountryName, setCurrentCountryName, globeEl, toggleFocus, countries, locations, getCurrentCountryName, getFocusValue}}>
            {children}
        </ctx.Provider> 
    );
}