import React, {useState, useEffect} from 'react'
import { WordOption } from '../WordOption'
import {EtymologyBot} from '../OpenAI/EtymologyBot.ts';
import BackButton from '../components/BackButton'
import Description from '../components/Description'

// Function to change the page, and reference to current selected word
interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    currentWordOption: WordOption;
}

const WordPage = ({setActivePage, currentWordOption}: Props) => {

    // Store the word and its definition as strings for quick reference
    const [word, _]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.word) // Store word for quick access
    const [definition, setDefinition]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.definition);
    const [etymology, setEtymology]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.ref[currentWordOption.wordIndex].getEtymology());

    useEffect(() => {
        runGptModel();
    }, []);

    const runGptModel = async () => {
        console.log("here");
        const client = new EtymologyBot(process.env.REACT_APP_OPENAI_API_KEY);

        let gptList = await client.processEtymologyIntoList(etymology);
        setEtymology(gptList);

        // If there is weird punctuation in the definition, semantically clean it
        if (definition!.match(/[\/#!$%\^&\*;:{}=\-_`~—]/))
            setDefinition(await client.simplifyDefinition(definition));
    }

    return (
        <>
            <BackButton setActivePage={setActivePage}/>

            <h1 className="font-bold text-2xl">{word}</h1><br/>
            <Description text={`Definition: ${definition}`}/>
            <Description text={`First use: ${currentWordOption.ref[currentWordOption.wordIndex].getFirstUse().replace(/{(.*?)}/, "").replace(/circa/, "")}`}/>
            <Description text={`${currentWordOption.ref[currentWordOption.wordIndex].getPartOfSpeech()}`}/>
            <Description text={`Origin: ${etymology}`}/>
            
                                                      
        </>
    );
}

export default WordPage;