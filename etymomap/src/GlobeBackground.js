import React from 'react';
import Globe from 'react-globe.gl';

function GlobeBackground() {
    const { useState, useEffect, useRef } = React;
    const globeEl = useRef();

    useEffect(() => {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.8;
        //globeEl.current.controls().enableZoom = false;

        globeEl.current.pointOfView({ lat: 25, lng: 0, altitude: 1.2 }); // set globe angle, position, size
      }, []);

    // Gen random data
    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() / 3,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    return <Globe 
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointAltitude="size"
        pointColor="color"
    />;
    
}

export default GlobeBackground;