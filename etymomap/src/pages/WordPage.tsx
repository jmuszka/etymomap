import React, {useState, useEffect} from 'react'
import { WordOption } from '../WordOption'
import BackButton from '../components/BackButton'

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

            <h1 className="font-bold text-2xl">{word}</h1>
            {definition}          
                                                      
        </>
    );
}

export default WordPage;