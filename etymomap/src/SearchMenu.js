// User can search for a word in the Merriam-Webster dictionary

import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Dictionary} from './Merriam Webster/Dictionary';
import AsyncSelect from 'react-select/async';


function SearchMenu() {

    const [searchOptions, setSearchOptions] = useState([]);

    // To search words in the merriam webster dictionary
    const d = new Dictionary(process.env.REACT_APP_MERRIAM_WEBSTER_API_KEY);


    // Use useEffect to re render


    const searchDictionary = async (query) => {
        let m;

        try {
            m = await d.search(query);
        } catch (err) {
            console.log("No such word");
            return;
        }

        let options = [];
        let searchResults = [];
        for (let i = 0; i < m.length; i++) {
            options.push({
                value: m[i].toString()+i,
                label: m[i].toString()
            });
            searchResults.push({
                key: m[i].toString()+i,
                word: m[i]
            });
        }

        setSearchOptions(searchResults);
        return options
    }

    return(
    <div id='container'>
        <div class="title">EtymoMap</div><br/>
        <div style={{display: 'inline-block', marginRight: '10px'}}>
                <AsyncSelect 
                    loadOptions={searchDictionary}
                    components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                    }}
                    isClearable
                    placeholder="Enter a word"
                    styles={{
                        container: (base) => ({
                            ...base,
                            width: "200px",
                            textAlign: "left"
                        })
                    }}
                    onChange={(selection) => {
                        for (let i = 0; i < searchOptions.length; i++) {
                            if (searchOptions[i].key === selection.value) {
                                console.log(searchOptions[i].word)
                                break;
                            }
                        }
                    }}
                />
        </div>

         <div className="button"><Button
                id='selectBtn'
                variant="contained"
                // onClick={setText}
        >Search</Button></div>
    

        <p class="description">From the viking invasions to the Norman-French conquest in 1066, and from post-Renaissance neologisms to its status as a global lingua franca, the English language boasts a fascinating history and development. Despite its origins as a West Germanic language, over two-thirds of the English lexicon consists of Romance vocabulary, mainly from French and Latin, with signiciant influence from Old Norse, Greek, and many others as well.</p>
        <p class="description">Search for any word in the English language and view a visualization of various linguistic data surrounding its etymology and other attributes.</p>
    </div>
    )
}

export default SearchMenu;