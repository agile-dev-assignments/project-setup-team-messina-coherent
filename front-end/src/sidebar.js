import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';
import './Accordion.css';
import Accordions from './Accordions.js';

function Sidebar() {
  const [logged, setLogin] = useState(true);
  var arr1 = ['Home', 'My Taste', 'Playlists'];
  var arr2 = ['Home'];
  const accordionData2 = [
    {
      question: 'By Mood',
      answer: <><a className='menu-item'href='/byMood/playlist'>Mood Boosters</a><br></br>
      <a className='menu-item'href='/byMood/playlist'>In My Feels</a><br></br>
      <a className='menu-item'href='/byMood/playlist'>Romantic</a><br></br>
      <a className='menu-item'href='/byMood/playlist'>On My Grind</a><br></br>
      <a className='menu-item'href='/byMood/playlist'>Plotting My Revenge</a><br></br>
      <a className='menu-item'href='/byMood/playlist'>Party</a><br></br></>
    }
  ]

  const accordionData = [
    {
      question: 'Playlists',
      answer: <><a className='menu-item' href='/byWeather'>By Weather</a><br style={{height:
      "10px"}}></br>
      <Accordions data={accordionData2} duration={400} closeOthers opened={1} /></>
    }
  ]


  if ({ logged }) {
    return (
      <Menu>
        <a className='menu-item' href='/'>
          Home
        </a>
        <a className='menu-item' href='/myTaste'>
          My Taste
        </a>
        <Accordions data={accordionData} duration={400} closeOthers opened={1} />
        <a id='login' className='menu-item' href='/login'>
          Login
        </a>

      </Menu>
    );
  }
  <Menu>
    <a className='menu-item' href='/'>
      Home
    </a>
    <a className='menu-item' href='/logout'>
          Logout
    </a>
  </Menu>;
}
export default Sidebar;
