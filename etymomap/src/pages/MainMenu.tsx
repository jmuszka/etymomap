import React from 'react'
import SearchMenu from '../components/SearchMenu'

interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const MainMenu = ({setActivePage}: Props) => {

    return (
        <>
            <SearchMenu setActivePage={setActivePage}/>
        </>
    );
}

export default MainMenu;