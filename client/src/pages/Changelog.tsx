import React, { useState, useEffect, useContext } from 'react'
import { ctx } from '../components/GlobeBackgroundProvider.jsx'
import BackButton from '../components/BackButton.tsx'
import Description from '../components/Description.tsx'


const WordPage = ({ setActivePage }) => {

    // Store the word and its definition as strings for quick reference

    const { toggleFocus } = useContext(ctx); // Toggle hovering

    return (
        <div className="flex flex-col text-center">
            <BackButton setActivePage={setActivePage} toggleFocus={toggleFocus}/>

            <h1 className="font-bold text-2xl">Changelog</h1><br/>
            <Description text={"(Last updated: May 27, 2025)"}/>

            <hr className="h-px my-8 bg-gray-600 border-0"/>

            <Description text={"Version 0.5.1 - Added changelog page. (2025/05/27)"}/>

            <Description text={"Version 0.4.1 - Beta release. (2025/05/25)"}/>
        </div>
    );
}

export default WordPage;