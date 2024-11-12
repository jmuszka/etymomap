import React from 'react';
import Globe from 'react-globe.gl';

function GlobeBackground() {
    const { useState, useEffect, useRef} = React;
    const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();
    const globeEl = useRef();

    useEffect(() => {
        // load data
        fetch('countries.geojson').then(res => res.json()).then(setCountries);

        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.8;
        //globeEl.current.controls().enableZoom = false;

        globeEl.current.pointOfView({ lat: 25, lng: 0, altitude: 1.2 }); // set globe angle, position, size
    }, []);


    return <Globe
        ref={globeEl}
        //enablePointerInteraction={false}

        globeImageUrl={'water.png'}
        backgroundColor='#f6e6d0'
        showAtmosphere={false}
        lineHoverPrecision={0}
        animateIn={false}

        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
        //polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
        polygonAltitude={0.01}
        polygonCapColor={d => d === hoverD ? '#421854' : '#7d5125'}
        polygonStrokeColor={() => '#111'}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
    />;
    
}

export default GlobeBackground;