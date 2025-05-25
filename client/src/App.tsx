// Serve application

import React, { useState, useEffect } from 'react';
import GlobeBackground from './components/GlobeBackground'
import {GlobeBackgroundProvider} from './components/GlobeBackgroundProvider'
import MainMenu from './pages/MainMenu'
import WordPage from './pages/WordPage'
import {Word} from './Merriam Webster/Word'
import {WordOption} from './WordOption'
import preval from 'preval.macro'

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

    fetch("http://localhost:5000")
  }, [])

  // Store all the available pages to switch from
  const PAGES: Dictionary  = {
    "main": <MainMenu setActivePage={setActivePage} setCurrentWordOption={setCurrentWordOption}/>,
    "word": <WordPage setActivePage={setActivePage} currentWordOption={currentWordOption} countries={languages}/>
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
      <div className="fixed w-full h-full p-2 lg:px-[18vw] py-12 overflow-scroll">
        <div className="
            bg-[#88888844]
            rounded-2xl
            p-5
            lg:p-10

            text-center
            text-[#223333]
            font-['Trebuchet MS', sans-serif]

            min-h-full
            relative
            ">
          {PAGES[activePage]}

          {/* Version/build number */}
          <div className="absolute left-0 bottom-0 w-full text-center lg:text-right text-sm opacity-50 px-4">{`v${process.env.REACT_APP_VERSION}.${preval`module.exports = new Date().toLocaleString("en-CA").substring(0,10).replaceAll("-", ".");`}`}</div>
        </div>
      </div>
      </GlobeBackgroundProvider>

    

    </>
  );
}

export default App;
