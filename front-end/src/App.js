import './App.css';
import NavBar from './navbar.js';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import About from './About.js';
import Privacy from './Privacy.js';

function App() {
  return (
    <Router>
      <div className="main">
        <NavBar />

        <Switch>
          <Route path='/byWeather/playlist'>
            <ByWeatherPlay />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/faq'>
            <FAQ />
          </Route>

          <Route path='/privacy'>
            <Privacy />
          </Route>
          <Route path='/contact'>
            <Contact />
          </Route>

          <Route path='/myTaste'>
            <MyTaste />
          </Route>

          <Route path='/byWeather'>
            <ByWeather />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>

        
      </div>
    </Router>
  );
}

function Home() {
  return <h2 className='home'>Home</h2>;
}

// function About() {
//   return <h2 className='home'>About</h2>;
// }

function FAQ() {
  return <h2 className='home'>faq</h2>;
}

// function Privacy() {
//   return <h2 className='home'>privacy</h2>;
// }

function Contact() {
  return <h2 className='home'>contact</h2>;
}

function MyTaste() {
  return <h2 className='home'>My Taste</h2>;
}

function ByWeather() {
  return <h2 className='home'>By Weather</h2>;
}

function ByWeatherPlay() {
  return <h2 className='home'>By Weather playlist</h2>;
}

export default App;

