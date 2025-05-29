// Serve application

import React, { useState, useEffect } from 'react';
import GlobeBackground from './components/GlobeBackground'
import {GlobeBackgroundProvider} from './components/GlobeBackgroundProvider'
import MainMenu from './pages/MainMenu'
import WordPage from './pages/WordPage'
import Changelog from './pages/Changelog'
import BuildVersion from './components/BuildVersion'
import {Word} from './Merriam Webster/Word'
import {WordOption} from './WordOption'

// Dictionary data structure
interface Dictionary {
  [key: string]: React.JSX.Element;
}

const App: React.FC = () => { 
  
  // Toggle between displaying different pages
  const [activePage, setActivePage]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("");
  
  // Keep track of currently-selected word
  const [currentWordOption, setCurrentWordOption]: [WordOption, React.Dispatch<React.SetStateAction<WordOption>>] = useState({word: "", definition: "", wordIndex: -1, definitionIndex: -1, ref: new Word({}), value: "", label: ""});

  const [languages, setLanguages] = useState({});

  useEffect(() => {
    fetch("languages.json")
    .then(res => res.json())
    .then(setLanguages)

    fetch(process.env.REACT_APP_BACKEND_URL)
  }, [])

  // Store all the available pages to switch from
  const PAGES: Dictionary  = {
    "main": <MainMenu setActivePage={setActivePage} setCurrentWordOption={setCurrentWordOption}/>,
    "word": <WordPage setActivePage={setActivePage} currentWordOption={currentWordOption} countries={languages}/>,
    "changelog": <Changelog setActivePage={setActivePage}/>
  };

  // On app load
  useEffect(() => {
    setActivePage("main");
  }, [])

  return(
    <>

    {/* Background */}
      <GlobeBackgroundProvider>
        <GlobeBackground/>

        {/* Content */}
      <div className="flex w-screen h-screen p-1 lg:py-[5%] lg:px-[20%]">
        <div className="
            bg-[#88888844]
            rounded-2xl

            text-[#223333]
            font-['Trebuchet MS', sans-serif]

            flex-1
            relative
            ">
              <div className="flex-1 w-full h-full md:p-[7%] 2xl:p-[4%] ">
              {PAGES[activePage]}
              </div>

          {/* Version/build number */}
          <BuildVersion setActivePage={setActivePage}/>
        </div>
      </div>
      </GlobeBackgroundProvider>

    

    </>
  );
}

export default App;
