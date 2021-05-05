import './App.css';
import NavBar from './navbar.js';
import Footer from './footer.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './About.js';
import Privacy from './Privacy.js';
import Home from './home.js';
import Contact from './contact.js';
import FAQ from './faq.js';
import Login from './Login.js';
import MyTaste from './myTaste.js';
import ByWeather from './byWeather.js';
import AboutMe from './aboutMe.js';
import ByZip from './byZip.js';
import ByMood from './byMood.js';


function App() {
  return (
    <Router>
      <div className="main">
        <NavBar />
        <div id="marginer">
        <Switch>
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

          <Route path='/aboutMe'>
            <AboutMe />
          </Route>

          <Route path='/byWeather'>
            <ByWeather name="By Weather" />
          </Route>

          <Route path='/party'>
            <ByMood url="party" name={"Party"} />
          </Route>

          <Route path='/mood-boosters'>
            <ByMood url={"mood-boosters"} name={"Mood Boosters"} />
          </Route>

          <Route path='/in-my-feels'>
            <ByMood url={"in-my-feels"} name={"In My Feels"} />
          </Route>

          <Route path='/romantic'>
            <ByMood url="romantic" name={"Romantic"} />
          </Route>

          <Route path='/getting-gains'>
            <ByMood url="getting-gains" name={"Getting Gains"} />
          </Route>

          <Route path='/on-my-grind'>
            <ByMood url="on-my-grind" name={"On My Grind"} />
          </Route>

          <Route exact path='/by-weather/:zipcode'>
            <ByZip url="by-weather" name={"Playlists by Weather"} />
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

export default App;

