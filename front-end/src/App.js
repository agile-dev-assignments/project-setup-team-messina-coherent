import logo from './logo.svg';
import './App.css';
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
      <Privacy />
    
    </div>
  );
}

export default App;