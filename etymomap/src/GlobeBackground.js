import React, {useState, useRef, useEffect, useContext} from 'react';
import Globe from 'react-globe.gl';
import { ctx } from './GlobeBackgroundProvider';


function GlobeBackground() {
    const [countries, setCountries] = useState({ features: []});
    const [locations, setLocations] = useState([]);
    const {currentCountryName, setCurrentCountryName} = useContext(ctx);
    const globeEl = useRef();

    const [focus, setFocus] = useState(false); // toggle between a spinning globe and hovering over a given country

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


    const toggleFocus = () => {
        const location = getCoordinatesByName(currentCountryName);

        if (!focus) {
            globeEl.current.pointOfView({ lat: location.latitude, lng: location.longitude, altitude: focusedAltitude}, transitionTime)
            globeEl.current.controls().autoRotateSpeed = 0;
        }
        else {
            globeEl.current.pointOfView({ lat: defaultLatitude, lng: location.longitude, altitude: defaultAltitude }, transitionTime); // set globe angle, position, size
            globeEl.current.controls().autoRotateSpeed = rotateSpeed;
        }

        setFocus(!focus);
    }

    const getCoordinatesByName = (countryName) => {
        for (let i = 0; i < locations.length; i++)
            if (locations[i]['name'] === countryName) return {latitude: locations[i]['latitude'], longitude: locations[i]['longitude']}

        return null;
    }

    // Colors for countries on globe
    const defaultColor = '#421854';
    const highlightColor = '#7d5125';

    // Create globe
    return (
    <div id="wrapper">
        <Globe
            ref={globeEl}
            globeImageUrl={'water.png'}
            backgroundColor='#f6e6d0'
            showAtmosphere={false}
            animateIn={true}

            polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')} // Draw countries
            polygonAltitude={0.01} // Make countries flat on surface
            polygonCapColor={d => d.properties.SOVEREIGNT===currentCountryName && focus ? defaultColor : highlightColor} // Set colors of countries
            polygonStrokeColor={() => '#111'}
            polygonsTransitionDuration={300}

            onGlobeClick={toggleFocus}
        />
    </div>
    );
    
}

export default GlobeBackground;