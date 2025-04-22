// Serve application

import React from 'react';
import GlobeBackground from './components/GlobeBackground.jsx'
import {GlobeBackgroundProvider} from './components/GlobeBackgroundProvider.jsx'
import SearchMenu from './components/SearchMenu.jsx';

const App: React.FC = () => { 
  
  return(
    <GlobeBackgroundProvider>
      <GlobeBackground>
        <div id="bg-tint">
          <SearchMenu/>
        </div>
      </GlobeBackground>
    </GlobeBackgroundProvider>
  );
}

export default App;
