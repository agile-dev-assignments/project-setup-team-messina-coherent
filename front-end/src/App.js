import './App.css';
import NavBar from './navbar.js';
import Footer from './footer.js';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import About from './About.js';
import Privacy from './Privacy.js';
import Home from './home.js';
import Contact from './contact.js';
import FAQ from './faq.js';
import Login from './Login.js';
import MyTaste from './myTaste.js';
import ByWeather from './byWeather.js';
import Playlist from './playlist.js';

function App() {
  return (
    <Router>
      <div className="main">
        <NavBar />
        <div id="marginer">
        <Switch>
          <Route path='/mood-boosters'>
            <ByWeather name="Mood Boosters" />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/faq'>
            <FAQ />
          </Route>

          <Route path='/login'>
            <Login />
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
            <ByWeather name="By Weather" />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
        </div>

        <Footer/>
      </div>
    </Router>
  );
}

// function Home() {
//   return <h2 className='home'>Home</h2>;
// }

// function About() {
//   return <h2 className='home'>About</h2>;
// }

// function FAQ() {
//   return <h2 className='home'>faq</h2>;
// }

// function Privacy() {
//   return <h2 className='home'>privacy</h2>;
// }

// function Contact() {
//   return <h2 className='home'>contact</h2>;
// }

// function MyTaste() {
//   return <h2 className='home'>My Taste</h2>;
// }

// function ByWeather() {
//   return <h2 className='home'>By Weather</h2>;
// }

function ByWeatherPlay() {
  return <h2 className='home'>By Weather playlist</h2>;
}

export default App;

