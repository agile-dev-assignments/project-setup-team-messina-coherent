import './App.css';
import Headers from'./About_Header.js'
import About from './About.js'

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

    </div>
  );
}

export default App;
