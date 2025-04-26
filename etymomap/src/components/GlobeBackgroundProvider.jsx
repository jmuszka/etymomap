// Change state of globe through intertaction

// The user can select country/countries, and toggle hovering
// If hovering over a country, zoom in on the country (change long, lat, alt) and stop rotating globe
// When ending hovering mode, reset to default lat and long, and resume rotation

import React, {useState, useRef, createContext, useEffect} from 'react';
export const ctx = createContext(); // To pass information between components

export const GlobeBackgroundProvider = ({children}) => {
    const [currentCountryName, setCurrentCountryName] = useState("");
    const [focus, setFocus] = useState(false); // country selection
    const globeEl = useRef(); // Globe.gl reference

    // TODO: consolidate these two dataset
    const [countries, setCountries] = useState({ features: []}); // Country drawing data
    const [locations, setLocations] = useState([]); // Country hovering data

    // Globe configurations
    const DEFAULT_LATITUDE = 25.0;
    const DEFAULT_LONGITUDE = 0.0;
    const DEFAULT_ALTITUDE = 1.2;

    const FOCUSED_ALTITUDE = 0.5;
    const TRANSITION_TIME = 1000; //ms
    const ROTATION_SPEED = 0.8;

    // Initialization
    useEffect(() => {
        

        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = ROTATION_SPEED;
        globeEl.current.controls().enableZoom = false;

        // Set globe angle, position, size
        globeEl.current.pointOfView({ 
            lat: DEFAULT_LATITUDE, 
            lng: DEFAULT_LONGITUDE, 
            altitude: DEFAULT_ALTITUDE });

        // Load data
        fetch('countries.geojson').then(res => res.json()).then(setCountries);
        fetch('coordinates.json').then(res => res.json()).then(setLocations);
    }, []);


    // Toggle between spinning globe or hovering over a country
    const toggleFocus = (countryName) => {

        // Compute average coordinates between all selected countries
        let location = {latitude: 0, longitude: 0}
        countryName.map((country) => {
            location.latitude += getCoordinatesByName(country).latitude / countryName.length;
            location.longitude += getCoordinatesByName(country).longitude / countryName.length;
        })

        setCurrentCountryName(countryName)

        if (location.latitude == 0 && location.longitude == 0 && !focus) return // do nothing if country does not exist

        // If not currently focused, focus
        if (!focus) {
            globeEl.current.pointOfView({ 
                lat: location.latitude, // Go to latitude of selected country
                lng: location.longitude, // Go to longitude of selected country
                altitude: FOCUSED_ALTITUDE}, // Go to hover altitude
            TRANSITION_TIME);
            globeEl.current.controls().autoRotateSpeed = 0; // Stop rotating
        }
        // If currently focused, unfocus
        else {
            globeEl.current.pointOfView({ 
                // Do not change longitude
                lat: DEFAULT_LATITUDE,  // Reset latitude
                altitude: DEFAULT_ALTITUDE // Reset altitude
            }, TRANSITION_TIME); // Set globe angle, position, size
            globeEl.current.controls().autoRotateSpeed = ROTATION_SPEED; // Start rotating agaion
        }

        // Flip focus bit
        setFocus(!focus);
    }

    // Get the name of the current country that is selected
    const getCurrentCountryName = () => {
        return currentCountryName;
    }

    // Determine if currently hovering over selected country or not
    const getFocusValue = () => {
        return focus;
    }

    // Get the location of a country by its name
    const getCoordinatesByName = (countryName) => {
        for (let i = 0; i < locations.length; i++)
            if (locations[i]['name'] === countryName) return {latitude: locations[i]['latitude'], longitude: locations[i]['longitude']}

        // Return nothing if country not found
        return null;
    }

    return(
        // Allow information about country selection and hovering to be accessed by other components
        <ctx.Provider value={{currentCountryName, setCurrentCountryName, globeEl, toggleFocus, countries, locations, getCurrentCountryName, getFocusValue}}>
            {children}
        </ctx.Provider> 
    );
}