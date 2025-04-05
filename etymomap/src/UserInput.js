import React, {useContext, useEffect, useState} from 'react';
import { ctx } from './GlobeBackgroundProvider';
import ReactSearchBox from "react-search-box";
import Button from '@mui/material/Button';

function UserInput() {
    const { currentCountryName, setCurrentCountryName} = useContext(ctx);
    const {toggleFocus} = useContext(ctx);
    const [data, setData] = useState([])
    const [ inputValue, updateInputValue ] = useState("");

    useEffect(() => {
        fetch('countrySearch.json').then(res => res.json()).then(setData);
    }, []);

    const selectBtnClick = () => {

        let btn = document.getElementById('selectBtn');
        let label = btn.innerText;

        if (!inputValue) return;

        // Select country
        if (label === 'SELECT') {
            btn.innerText = 'DESELECT';
            console.log(inputValue)
            setCurrentCountryName(inputValue);
            console.log(currentCountryName)
            // todo: change the focus, disable search bar
        }
        // Deselect country
        else {
            btn.innerText = 'SELECT';
            // change the focus, re enable search bar
        }

        toggleFocus(inputValue);
    }

    //return(<form type="text" ><input type="text"></input> <button onClick={setFocusCountry()}>Change country</button></form>)
    return(
    <div id='container'>
        <h1>EtymoMap</h1><br/>
        <div className="search-box"><ReactSearchBox
                placeholder = "Enter country"
                value="Doe"
                data = {data}
                callback={(record) => console.log(record)}
                onSelect={(record) => updateInputValue(record.item.value)}
                style={{display: 'block-inline'}}
            /></div>
        <div className="button"><Button 
            id='selectBtn'
            variant="contained"
            onClick={selectBtnClick}
        >Select</Button></div>
        <p>This website is currently in development. However, in the meantime you can play around with this widget that will be a core feature of the finished application.</p>
    </div>
    )
}

export default UserInput;