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
            <BackButton setActivePage={setActivePage}/>

            <h1 className="font-bold text-2xl">{currentWord.toString()}</h1>
            {definitions}

            <Description text={"From the viking invasions to the Norman-French \
                            conquest in 1066, and from post-Renaissance \
                            neologisms to its status as a global lingua \
                            franca, the English language boasts a \
                            fascinating history and development. Despite \
                            its origins as a West Germanic language, over \
                            two-thirds of the English lexicon consists of \
                            Romance vocabulary, mainly from French and \
                            Latin, with significiant influence from Old \
                            Norse, Greek, and many others as well."} />

<Description text={"From the viking invasions to the Norman-French \
                            conquest in 1066, and from post-Renaissance \
                            neologisms to its status as a global lingua \
                            franca, the English language boasts a \
                            fascinating history and development. Despite \
                            its origins as a West Germanic language, over \
                            two-thirds of the English lexicon consists of \
                            Romance vocabulary, mainly from French and \
                            Latin, with significiant influence from Old \
                            Norse, Greek, and many others as well."} />

        <Description text={"From the viking invasions to the Norman-French \
                            conquest in 1066, and from post-Renaissance \
                            neologisms to its status as a global lingua \
                            franca, the English language boasts a \
                            fascinating history and development. Despite \
                            its origins as a West Germanic language, over \
                            two-thirds of the English lexicon consists of \
                            Romance vocabulary, mainly from French and \
                            Latin, with significiant influence from Old \
                            Norse, Greek, and many others as well."} />  
                            
                                                      
        </>
    );
}

export default WordPage;