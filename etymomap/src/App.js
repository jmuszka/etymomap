// Serve application

import GlobeBackground from './GlobeBackground.js'
import {GlobeBackgroundProvider} from './GlobeBackgroundProvider.js'
import UserInput from './UserInput.js';

function App() {

  let g = <GlobeBackgroundProvider>
    <GlobeBackground>
      <div id="bg-tint">
        <UserInput/>
      </div>
    </GlobeBackground>
  </GlobeBackgroundProvider>
  
  return g;
}

export default App;
