import GlobeBackground from './GlobeBackground.js'
import {GlobeBackgroundProvider} from './GlobeBackgroundProvider.js'
import UserInput from './UserInput.js';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://127.0.0.1:8081/countries')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }, [])

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
