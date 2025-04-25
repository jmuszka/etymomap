import React, {useState, useEffect} from 'react'
import { WordOption } from '../WordOption'
import BackButton from '../components/BackButton'
import Description from '../components/Description'

// Function to change the page, and reference to current selected word
interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    currentWordOption: WordOption;
}

const WordPage = ({setActivePage, currentWordOption}: Props) => {

    // Store the word and its definition as strings for quick reference
    const [word, _0]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.word) // Store word for quick access
    const [definition, _1]: [string, React.Dispatch<React.SetStateAction<string>>] = useState(currentWordOption.definition);

    return (
        <>
            <BackButton setActivePage={setActivePage}/>

            <h1 className="font-bold text-2xl">{word}</h1><br/>
            <Description text={`Definition: ${definition}`}/>
            <Description text={`First use: ${currentWordOption.ref[currentWordOption.wordIndex].getFirstUse()}`}/>
            <Description text={`${currentWordOption.ref[currentWordOption.wordIndex].getPartOfSpeech()}`}/>
            <Description text={`Origin: ${currentWordOption.ref[currentWordOption.wordIndex].getEtymology()}`}/>
            
                                                      
        </>
    );
}

export default WordPage;