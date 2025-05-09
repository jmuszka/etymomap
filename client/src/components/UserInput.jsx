// User can search for country and choose to hover over it

import React, {useContext, useEffect, useState} from 'react';
import { ctx } from './GlobeBackgroundProvider';
import ReactSearchBox from "react-search-box";
// import Button from '@mui/material/Button';

function UserInput() {
    const {setCurrentCountryName} = useContext(ctx); // Current country that is selected
    const {toggleFocus} = useContext(ctx); // Toggle hovering
    const [data, setData] = useState([]) // Country searching
    const [inputValue, updateInputValue] = useState(""); // Country name that user input

    // Load data for country searching
    useEffect(() => {
        fetch('countrySearch.json').then(res => res.json()).then(setData);
    }, []);


    // What to do upon clicking the SELECT button
    const selectBtnClick = () => {

        // Get button and button text
        let btn = document.getElementById('selectBtn');
        let label = btn.innerText;

        // If no country was entered, do nothing
        if (!inputValue) return;

        // Select country
        if (label === 'SELECT') {
            btn.innerText = 'DESELECT'; // Toggle button text
            setCurrentCountryName(inputValue); // Select country
        }
        // De-select country
        else {
            btn.innerText = 'SELECT'; // Toggle button text

            // Unselect country
            setCurrentCountryName("");
            updateInputValue("");
        }

        toggleFocus(inputValue); // Hover or stop hovering on selected country
    }

    return(
    <div id='container'>
        <h1>EtymoMap</h1><br/>
        <div className="search-box">
            <ReactSearchBox
                placeholder = "Enter country" // Default text
                value=""
                data = {data} // Country search data
                onSelect={(record) => updateInputValue(record.item.value)}
                style={{display: 'block-inline'}}
                disabled="true"/>
        </div>
        {/* <div className="button"><Button
            id='selectBtn'
            variant="contained"
            onClick={selectBtnClick}
        >Select</Button></div> */}
        <p>This website is currently in development. However, in the meantime you can play around with this widget that will be a core feature of the finished application.</p>
    </div>
    )
}

export default UserInput;