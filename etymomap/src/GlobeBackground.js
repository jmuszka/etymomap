import React, {useState, useRef, useEffect, useContext} from 'react';
import Globe from 'react-globe.gl';
import { ctx } from './GlobeBackgroundProvider';


function GlobeBackground({children}) {
    const {globeEl} = useContext(ctx);
    const {countries} = useContext(ctx);
    const {currentCountryName} = useContext(ctx);
    const {focus, toggleFocus} = useContext(ctx);
    const {getCurrentCountryName, getFocusValue} = useContext(ctx);


    const colorCountry = (d) => {
        // Colors for countries on globe
        const defaultColor = '#421854';
        const highlightColor = '#7d5125';

        //d => d.properties.SOVEREIGNT===currentCountryName && focus ? defaultColor : highlightColor
        //console.log("COLOR COUNTRY2: " + getCurrentCountryName())
        return d.properties.SOVEREIGNT===getCurrentCountryName() && getFocusValue() ? defaultColor : highlightColor;
    }

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
            polygonCapColor={d => colorCountry(d)} // Set colors of countries
            polygonStrokeColor={() => '#111'}
            polygonsTransitionDuration={300}

            onGlobeClick={toggleFocus}
        />

        <div style={{position: 'absolute', top: 0, left: 0}}>{children}</div>
    </div>
    );
    
}

export default GlobeBackground;