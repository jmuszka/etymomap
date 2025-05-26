// Display spinning globe to screen

import React, {useContext} from 'react';
import Globe from 'react-globe.gl';
import { ctx } from './GlobeBackgroundProvider';

const DEFAULT_COLOR = "#69441f"; // Default country color
const HIGHLIGHT_COLOR = "#421854"; // Highlighted country color 

function GlobeBackground() {
    const {globeEl} = useContext(ctx); // Globe.gl object reference
    const {countries} = useContext(ctx); // Country data
    // const  {toggleFocus} = useContext(ctx);
    const {getCurrentCountryName, getFocusValue} = useContext(ctx); // Currently-selected country


    // Determine which color to paint a country
    const colorCountry = (d) => {
        // If country is selected, use highlight color, otherwise use default color
        return getCurrentCountryName().includes(d.properties.SOVEREIGNT) && getFocusValue() ? HIGHLIGHT_COLOR : DEFAULT_COLOR;
    }


    // Create globe
    return (
        <>
            <div className="
                fixed 
                -z-10 
                w-full h-full 
                bg-[radial-gradient(circle_at_center,_#00000000_70%,_magenta_170%)]
                lg:bg-[radial-gradient(circle_at_center,_#00000000_50%,_magenta_150%)]
            "/>

            <div className="fixed -z-20">

                    <Globe
                        ref={globeEl}
                        globeImageUrl={'water.png'} // Globe texture
                        backgroundColor='#f6e6d0' // Sky color
                        showAtmosphere={false}
                        animateIn={true} // Spin globe when loading

                        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')} // Draw countries
                        polygonAltitude={0.015} // Distance of land above water
                        polygonCapColor={d => colorCountry(d)} // Set colors of countries
                        polygonStrokeColor={() => DEFAULT_COLOR} // Draw borders between countries
                        polygonsTransitionDuration={0} // Draw polygons right away
                    />
            </div>
        </>
    );
    
}

export default GlobeBackground;