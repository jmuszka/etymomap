// Serve application

import React, { useState, useEffect } from 'react';
import GlobeBackground from './components/GlobeBackground.jsx'
import {GlobeBackgroundProvider} from './components/GlobeBackgroundProvider.jsx'
import MainMenu from './pages/MainMenu'
import WordPage from './pages/WordPage'
import {Word} from './Merriam Webster/Word'

// Dictionary data structure
interface Dictionary {
  [key: string]: React.JSX.Element;
}

const App: React.FC = () => { 
  
  // Toggle between displaying different pages
  const [activePage, setActivePage]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("");
  
  // Keep track of currently-selected word
  const [currentWord, setCurrentWord]: [Word, React.Dispatch<React.SetStateAction<Word>>] = useState(new Word({}));

  // Store all the available pages to switch from
  const PAGES: Dictionary  = {
    "main": <MainMenu setActivePage={setActivePage} setCurrentWord={setCurrentWord}/>,
    "word": <WordPage currentWord={currentWord}/>
  };

  // On app load
  useEffect(() => {
    setActivePage("main");
  }, [])

  return(
    <GlobeBackgroundProvider>
      <GlobeBackground>
        <div id="bg-tint">

          <div id='container'>
            {
            /* Current page content */
            PAGES[activePage]
            }
          </div>

        </div>
      </GlobeBackground>
    </GlobeBackgroundProvider>
  );
}

export default App;
