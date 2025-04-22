// Serve application

import React from 'react';
import GlobeBackground from './GlobeBackground.jsx'
import {GlobeBackgroundProvider} from './GlobeBackgroundProvider.jsx'
import SearchMenu from './SearchMenu.jsx';

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
