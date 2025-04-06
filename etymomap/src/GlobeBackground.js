// Display spinning globe to screen

import React, {useContext} from 'react';
import Globe from 'react-globe.gl';
import { ctx } from './GlobeBackgroundProvider';

const DEFAULT_COLOR = "#421854"; // Default country color
const HIGHLIGHT_COLOR = "#7d5125"; // Highlighted country color

function GlobeBackground({children}) {
    const {globeEl} = useContext(ctx); // Globe.gl object reference
    const {countries} = useContext(ctx); // Country data
    const {getCurrentCountryName, getFocusValue} = useContext(ctx); // Currently-selected country


    // Determine which color to paint a country
    const colorCountry = (d) => {
        // If country is selected, use highlight color, otherwise use default color
        return d.properties.SOVEREIGNT===getCurrentCountryName() && getFocusValue() ? DEFAULT_COLOR : HIGHLIGHT_COLOR;
    }


    // Create globe
    return (
    <>
        <Globe
            ref={globeEl}
            globeImageUrl={'water.png'} // Globe texture
            backgroundColor='#f6e6d0' // Sky color
            showAtmosphere={false}
            animateIn={true} // Spin globe when loading

            polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')} // Draw countries
            polygonAltitude={0.01} // Distance of land above water
            polygonCapColor={d => colorCountry(d)} // Set colors of countries
            // polygonStrokeColor={() => '#111'} // Draw borders between countries
            polygonsTransitionDuration={0} // Draw polygons right away
        />

        <div style={{position: 'absolute', top: 0, left: 0}}>{children}</div>
    </>
    );
    
}

export default GlobeBackground;