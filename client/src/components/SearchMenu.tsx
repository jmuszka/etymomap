// User can search for a word in the Merriam-Webster dictionary

import React from 'react';
import Button from '@mui/material/Button';
import {Dictionary} from '../Merriam Webster/Dictionary';
import { WordOption } from '../WordOption';
import AsyncSelect from 'react-select/async';
import type { GroupBase, OptionsOrGroups } from 'react-select';

// Functions to change the page and select a new word
interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    setCurrentWordOption: React.Dispatch<React.SetStateAction<WordOption>>;
}

function SearchMenu({setActivePage, setCurrentWordOption}: Props) {

    // To search words in the merriam webster dictionary
    const d = new Dictionary(process.env.REACT_APP_MERRIAM_WEBSTER_API_KEY);

    // Query the Merriam-Webster API for matching words
    // Dictionary returns multiple Word objects if that word is used in multiple parts of speech
    // Each word object can contain multiple possible definitions
    // Goal here is to separate each definition and display all of them to the user
    const searchDictionary = async (query) => {
        let m; // Store word object

        try {
            m = await d.search(query); // Search dictionary for word
        } catch (err) {
            console.log("No such word");
            return;
        }

        // Separate search results into 1:1 pair for word:definition
        let results: WordOption[] = [];
        m.map((item, i) => {
            item.getDefinitions().map((def, j) => {
                results.push({
                    word: item.toString(),
                    definition: def,
                    wordIndex: i, // position of word in list of word objects
                    definitionIndex: j, // position of definition in word object
                    ref: m, // reference to the list of word objects
                });
        })})
    
        // Convert data into format for search bar
        results.map((result, i) => {
            result.value = result.word+i; // key to search for (append index to make unique)
            result.label = result.definition; //TODO: truncate
        });

        return results;
    }

    // Change the current word when user clicks an option from search menu
    const selectNewWord = (selection) => {
        setCurrentWordOption(selection);
    }

    return(
    <>
        <div className="space-x-1">
            <div className="w-[240px] inline-block">
                <AsyncSelect 
                    loadOptions={searchDictionary as (
                        inputValue: string
                    ) => Promise<OptionsOrGroups<WordOption, GroupBase<WordOption>>>}
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