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
        <div id="word-menu" className="container">
            <h1 className="title">{currentWord.toString()}</h1>
            {definitions}
            <BackButton setActivePage={setActivePage}/>
        </div>
    );
}

export default WordPage;