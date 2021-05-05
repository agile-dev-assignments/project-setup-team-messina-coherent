import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';
import './Accordion.css';
import Accordions from './Accordions.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sidebar() {
  const [logged, setLogin] = useState(false);


  const [data, setData] = useState('');

  const [isLoading, setLoading] = useState(true);
  const url = 'http://localhost:3001/test';
  console.log(url)
  useEffect(() => {
    axios.get(url).then(response => {
      console.log(Object.keys(response.data).length)
        setData(response.data);
        setLoading(false);
        setLogin(true)
    });
  }, []);





  const accordionData2 = [
    {
      question: 'By Mood',
      answer: (
        <>
          <a className='menu-item' href='/mood-boosters'>
            Mood Boosters
          </a>
          <br></br>
          <a className='menu-item' href='/in-my-feels'>
            In My Feels
          </a>
          <br></br>
          <a className='menu-item' href='/romantic'>
            Romantic
          </a>
          <br></br>
          <a className='menu-item' href='/on-my-grind'>
            On My Grind
          </a>
          <br></br>
          <a className='menu-item' href='/getting-gains'>
            Getting Gains
          </a>
          <br></br>
          <a className='menu-item' href='/party'>
            Party
          </a>
          <br></br>
        </>
      ),
    },
  ];

  const accordionData = [
    {
      question: 'Playlists',
      answer: (
        <>
          <a className='menu-item' href='/byWeather'>
            By Weather
          </a>
          <br style={{ height: '10px' }}></br>
          <Accordions data={accordionData2} duration={400} closeOthers opened={1} />
        </>
      ),
    },
  ];

  if ( logged == true ) {
    return (
      <Menu>
        <a className='menu-item' href='/'>
          Home
        </a>
        <a className='menu-item' href='/myTaste'>
          My Taste
        </a>
        <Accordions data={accordionData} duration={400} closeOthers opened={1} />
        <a id='login' className='menu-item' href='/aboutMe'>
          About Me
        </a>
      </Menu>
    );
  }
  return (
    <Menu>
      <a className='menu-item' href='/'>
        Home
      </a>
      <a id='login' className='menu-item' href='/login'>
          Login
      </a>
    </Menu>
  );
}
export default Sidebar;
