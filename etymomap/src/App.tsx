// Serve application

import React from 'react';
import GlobeBackground from './GlobeBackground.js'
import {GlobeBackgroundProvider} from './GlobeBackgroundProvider.js'
import SearchMenu from './SearchMenu.js';

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
