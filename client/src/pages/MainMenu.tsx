import React from 'react'
import SearchMenu from '../components/SearchMenu'
import Description from '../components/Description'
import { WordOption } from '../WordOption'

// Functions to change the page and select a new word
interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    setCurrentWordOption: React.Dispatch<React.SetStateAction<WordOption>>;
}

const MainMenu = ({setActivePage, setCurrentWordOption}: Props) => {

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl font-bold my-5 select-none text-shadow text-shadow-gray-500">
                EtymoMap
            </div>

            <SearchMenu 
                setActivePage={setActivePage} 
                setCurrentWordOption={setCurrentWordOption}
            />

            <Description text={"From the viking invasions to the Norman-French \
                            conquest in 1066, and from post-Renaissance \
                            neologisms to its status as a global lingua \
                            franca, the English language boasts a \
                            fascinating history and development. Despite \
                            its origins as a West Germanic language, over \
                            two-thirds of the English lexicon consists of \
                            Romance vocabulary, mainly from French and \
                            Latin, with significiant influence from Old \
                            Norse, Greek, and many others as well."} 
            />

            <Description text={"Search for any word in the English language \
                                and view a visualization of various \
                                linguistic data surrounding its etymology \
                                and other attributes."}
            />

        </div>
    );
}

export default MainMenu;