import './App.css';
import GlobeBackground from './GlobeBackground.js'
import {GlobeBackgroundProvider} from './GlobeBackgroundProvider.js'
import UserInput from './UserInput.js';


function App() {

  let g = <GlobeBackgroundProvider style="position: relative;">
    <GlobeBackground style="position: absolute; top: 0;">
      <div id='bg-tint'>
        <UserInput/>
      </div>
    </GlobeBackground>
  </GlobeBackgroundProvider>
  
  return g;
}

export default App;
