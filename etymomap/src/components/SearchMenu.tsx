// User can search for a word in the Merriam-Webster dictionary

import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {Dictionary} from '../Merriam Webster/Dictionary';
import {Word} from '../Merriam Webster/Word'
import AsyncSelect from 'react-select/async';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import Description from './Description'

interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

interface ClickOption {
    value: string;
    label: string;
}

interface SearchOption {
    key: string;
    word: Word;
}

function SearchMenu({setActivePage}: Props) {

    const [searchOptions, setSearchOptions]: [SearchOption[], React.Dispatch<React.SetStateAction<SearchOption[]>>] = useState([]);

    // To search words in the merriam webster dictionary
    const d = new Dictionary(process.env.REACT_APP_MERRIAM_WEBSTER_API_KEY);


    const searchDictionary = async (query) => {
        let m;

        try {
            m = await d.search(query);
        } catch (err) {
            console.log("No such word");
            return;
        }

        let options: ClickOption[] = [];
        let searchResults: SearchOption[] = [];
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
        <div className="title">EtymoMap</div><br/>
        <div style={{display: 'inline-block', marginRight: '10px'}}>
                <AsyncSelect 
                    loadOptions={searchDictionary as (
                        inputValue: string
                    ) => Promise<OptionsOrGroups<ClickOption, GroupBase<ClickOption>>>}
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
                            if (selection && searchOptions[i].key === selection.value) {
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
                onClick={() => setActivePage("blank")}
        >Search</Button></div>
    
        <Description text={"From the viking invasions to the Norman-French \
                            conquest in 1066, and from post-Renaissance \
                            neologisms to its status as a global lingua \
                            franca, the English language boasts a \
                            fascinating history and development. Despite \
                            its origins as a West Germanic language, over \
                            two-thirds of the English lexicon consists of \
                            Romance vocabulary, mainly from French and \
                            Latin, with signiciant influence from Old \
                            Norse, Greek, and many others as well."} />

        <Description text={"Search for any word in the English language \
                            and view a visualization of various \
                            linguistic data surrounding its etymology \
                            and other attributes."}/>
    </div>
    )
}

export default SearchMenu;