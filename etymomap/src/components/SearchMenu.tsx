// User can search for a word in the Merriam-Webster dictionary

import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {Dictionary} from '../Merriam Webster/Dictionary';
import {Word} from '../Merriam Webster/Word'
import AsyncSelect from 'react-select/async';
import type { GroupBase, OptionsOrGroups } from 'react-select';

interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    setCurrentWord: React.Dispatch<React.SetStateAction<Word>>;
}

interface ClickOption {
    value: string;
    label: string;
}

interface SearchOption {
    key: string;
    word: Word;
}

function SearchMenu({setActivePage, setCurrentWord}: Props) {

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
                label: m[i].toString() + " - " + m[i].getDefinitions()[0].substring(0, 21 - m[i].toString().length)
            });
            searchResults.push({
                key: m[i].toString()+i,
                word: m[i]
            });
        }

        setSearchOptions(searchResults);
        return options
    }

    const selectNewWord = (selection) => {
        for (let i = 0; i < searchOptions.length; i++) {
            if (selection && searchOptions[i].key === selection.value) {
                setCurrentWord(searchOptions[i].word);
                break;
            }
        }
    }

    return(
    <>
        <div className="space-x-1">
            <div className="w-[240px] inline-block">
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
                    onChange={(selection) => {selectNewWord(selection)}}
                />
            </div>

        <div className="inline-block relative">
            <Button
                    id='selectBtn'
                    variant="contained"
                    style={{position: "relative", top: "-1.5px"}}
                    onClick={() => {setActivePage("word")}}>
                Search
            </Button>
        </div>
        </div>
    </>
    )
}

export default SearchMenu;