import './App.css';

import Headers from'./About_Header.js'
import About from './About.js'

import Privacy from './Privacy.js'
import Headers from './Privacy_Header.js'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
      <Headers />
      <About />

      <Privacy />
    
    </div>
  );
}

export default App;