import React, {useEffect} from 'react'
import Description from '../components/Description'
import { Word } from '../Merriam Webster/Word'
import BackButton from '../components/BackButton'

interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    currentWord: Word;
}

const WordPage = ({setActivePage, currentWord}: Props) => {

    let definitions: React.JSX.Element[] = [];
    for (let i = 0; i < currentWord.getDefinitions().length; i++) {
        definitions.push(<Description text={currentWord.getDefinitions()[i]} />)
    }

    return (
        <>
            {definitions}
            <BackButton setActivePage={setActivePage}/>
        </>
    );
}

export default WordPage;