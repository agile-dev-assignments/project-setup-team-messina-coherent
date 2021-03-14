import logo from './logo.svg';
import './App.css';
import NavBar from './navbar.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
