import React, {useState, useRef} from 'react';
import Globe from 'react-globe.gl';

function GlobeBackground() {
    const { useEffect} = React;
    const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();
    const globeEl = useRef();

    const [focus, setFocus] = useState(false); // toggle between a spinning globe and hovering over a given country


    useEffect(() => {
        // load data
        fetch('countries.geojson').then(res => res.json()).then(setCountries);

        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.8;
        //globeEl.current.controls().enableZoom = false;

        globeEl.current.pointOfView({ lat: 25, lng: 0, altitude: 1.2 }); // set globe angle, position, size
    }, []);


    const toggleFocus = () => {
        if (focus) {
            globeEl.current.pointOfView({ lat: 52.516667, lng: 13.383333, altitude: 0.5}, 1000)
            globeEl.current.controls().autoRotateSpeed = 0;
        }
        else {
            globeEl.current.pointOfView({ lat: 25, lng: 0, altitude: 1.2 }, 1000); // set globe angle, position, size
            globeEl.current.controls().autoRotateSpeed = 0.8;
        }

        setFocus(!focus);
        console.log(countries);
    }

    const hoverOver = (country) => {
        //TODO: get coords from country name
        const latitude = 52.516667;
        const longitude = 13.383333;
        const altitude = 1.2;

        globeEl.current.pointOfView({latitude, longitude, altitude}, 1000)

    }

    return (
    <>
        <Globe
            ref={globeEl}
            //enablePointerInteraction={false}

            globeImageUrl={'water.png'}
            backgroundColor='#f6e6d0'
            showAtmosphere={false}
            animateIn={true}

            polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
            //polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
            polygonAltitude={0.01}
            polygonCapColor={d => d === hoverD ? '#421854' : '#7d5125'}
            polygonStrokeColor={() => '#111'}
            onPolygonHover={setHoverD}
            polygonsTransitionDuration={300}

            polygonLabel={({ properties: d }) => `
            <b>${d.ADMIN}</b> <br />
          `}

            onGlobeClick={toggleFocus}
        />
    </>
    );
    
}

export default GlobeBackground;