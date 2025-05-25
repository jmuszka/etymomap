import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { ctx } from '../components/GlobeBackgroundProvider.jsx'
import { WordOption } from '../WordOption.tsx'
// import {EtymologyBot} from '../OpenAI/EtymologyBot.ts';
import BackButton from '../components/BackButton.tsx'
import Description from '../components/Description.tsx'

// Function to change the page, and reference to current selected word
interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    currentWordOption: WordOption;
    countries: {};
}

const WordPage = ({ setActivePage, currentWordOption }: Props) => {

    // Store the word and its definition as strings for quick reference
    const [word, _]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.word) // Store word for quick access
    const [definition, setDefinition]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.definition);
    const [etymology, setEtymology]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.ref[currentWordOption.wordIndex].getEtymology());

    const { toggleFocus } = useContext(ctx); // Toggle hovering

    const countries = {
        "English": [
            "United Kingdom"
        ],
        "Middle French": [
            "France"
        ],
        "Latin": [
            "Italy",
            "France",
            "Spain",
            "Portugal",
            "Romania"
        ],
        "Medieval Latin": [
            "Italy",
            "France",
            "Spain",
            "Portugal",
            "Romania"
        ],
        "Middle English": [
            "United Kingdom"
        ],
        "Old English": [
            "United Kingdom"
        ],
        "Greek": [
            "Greece"
        ],
        "Late Greek": [
            "Greece"
        ],
        "Anglo-French": [
            "France"
        ],
        "Old Dutch": [
            "Netherlands"
        ],
        "Old High German": [
            "Germany"
        ],
        "Middle High German": [
            "Germany"
        ],
        "Sanskrit": [
            "Syria"
        ],
        "Gothic": [
            "Sweden",
            "Denmark",
            "Germany",
            "Poland"
        ],
        "Old Norse": [
            "Sweden",
            "Norway",
            "Denmark",
            "Iceland"
        ],
        "Avestan": [
            "Iran"
        ],
        "Italian": [
            "Italy"
        ],
        "Old French": [
            "France"
        ],
        "Old Irish": [
            "Ireland"
        ],
        "Old Church Slavic": [
            "Poland",
            "Russia",
            "Belarus",
            "Ukraine",
            "Serbia",
            "Bosnia and Herzegovina",
            "Croatia",
            "Bulgaria"
        ],
        "Old Frisian": [
            "Netherlands"
        ],
        "Arabic": [
            "Saudi Arabia",
            "Iraq",
            "Qatar",
            "United Arab Emirates",
            "Oman",
            "Yemen"
        ],
        "German": [
            "Germany",
            "Austria",
            "Switzerland"
        ],
        "Spanish": [
            "Spain"
        ],
        "French": [
            "France",
            "Switzerland",
            "Belgium"
        ],
        "Czech": [
            "Czechia"
        ]
    }

    useEffect(() => {
        runGptModel()
    }, []);

    const convertLang = (language) => {
        return countries[language];
    }

    const runGptModel = async () => {
        // const client = new EtymologyBot(process.env.REACT_APP_OPENAI_API_KEY);

        // Get LLM to process languages into neat, comma-separated list
        // let gptList = await client.processEtymologyIntoList(etymology);

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/openai/etymology`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'etymologyList': etymology
            })
        })
            .then(res => res.json())
            .then(data => data.list)
            .then(async (gptList) => {

                setEtymology(gptList);

                // Get corresponding countries of origin from the languages
                let languages = gptList.replace(/(, )/g, ",").split(",")
                let countriesOfOrigin: string[] = [];
                for (let i = 0; i < languages.length; i++) {
                    console.log(languages[i])
                    let results = convertLang(languages[i]);

                    if (results) {
                        for (let j = 0; j < results.length; j++)
                            countriesOfOrigin.push(results[j]);
                    } else {
                        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/openai/countries`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "language": `"${languages[i]}"`
                            })
                        })
                        .then(res => res.json())
                        .then(data => data.countries.split(","))
                        .then((countries) => {
                            countriesOfOrigin = countriesOfOrigin.concat(countries)
                        })
                    }
                }

                // Hover over those countries
                toggleFocus(Array.from(new Set(countriesOfOrigin)));

            })

        // Make sure string starts with a capital letter and ends in a period
        if (!definition!.match(/\.$/)) setDefinition(definition.substring(0, 1).toUpperCase() + definition.substring(1, definition.length) + ".")
        else setDefinition(definition.substring(0, 1).toUpperCase() + definition.substring(1, definition.length))

        // If there is weird punctuation in the definition, semantically clean it
        if (definition!.match(/[\/#!$%\^&\*;:{}=\-_`~—]/)) {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/openai/definition`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "definition": definition })
            })
                .then(res => res.json())
                .then(data => data.definition)
                .then((definition) => { setDefinition(definition) })
        }
    }

    return (
        <div className="flex flex-col text-center">
            <BackButton setActivePage={setActivePage} toggleFocus={toggleFocus}/>

            <h1 className="font-bold text-2xl">{word}</h1><br/>
            <Description text={`Definition: ${definition}`}/>
            <Description text={`First use: ${currentWordOption.ref[currentWordOption.wordIndex].getFirstUse().replace(/{(.*?)}/, "").replace(/circa/, "")}`}/>
            <Description text={`${currentWordOption.ref[currentWordOption.wordIndex].getPartOfSpeech()}`}/>
            <Description text={`Origin: ${etymology}`}/>

        </div>
    );
}

export default WordPage;