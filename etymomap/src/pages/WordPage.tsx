import React, {useEffect} from 'react'
import Description from '../components/Description'
import { Word } from '../Merriam Webster/Word'

interface Props {
    currentWord: Word;
}

const WordPage = ({currentWord}: Props) => {

    let definitions: React.JSX.Element[] = [];
    for (let i = 0; i < currentWord.getDefinitions().length; i++) {
        definitions.push(<Description text={currentWord.getDefinitions()[i]} />)
    }

    return (
        <>
            {definitions}
        </>
    );
}

export default WordPage;