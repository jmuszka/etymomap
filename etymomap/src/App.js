import './App.css';
import GlobeBackground from './GlobeBackground.js'
import {GlobeBackgroundProvider} from './GlobeBackgroundProvider.js'
import UserInput from './UserInput.js'


function App() {
  let g = <GlobeBackgroundProvider>
    <UserInput/>
    <GlobeBackground />
  </GlobeBackgroundProvider>
  
  return g;
}

export default App;
