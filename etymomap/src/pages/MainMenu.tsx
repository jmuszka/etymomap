import React from 'react'
import SearchMenu from '../components/SearchMenu'
import {Word} from '../Merriam Webster/Word'

interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    setCurrentWord: React.Dispatch<React.SetStateAction<Word>>;
}

const MainMenu = ({setActivePage, setCurrentWord}: Props) => {

    return (
        <div id="main-menu" className="container">
            <SearchMenu setActivePage={setActivePage} setCurrentWord={setCurrentWord}/>
        </div>
    );
}

export default MainMenu;