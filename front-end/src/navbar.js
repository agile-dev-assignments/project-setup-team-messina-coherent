import './navbar.css';
import Sidebar from './sidebar.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
  


function NavBar(){

  const [data, setData] = useState('');

  const [isLoading, setLoading] = useState(true);
  const url = 'http://localhost:3001/test';
  console.log(url)
  useEffect(() => {
    axios.get(url).then(response => {
      console.log(Object.keys(response.data).length)
        setData(response.data);
        setLoading(false);
    });
  }, []);



    return (
        <div id="navbar">
              <Sidebar />
              <ul id="nav">
                <li><a class="logo" href="/"><img src="/logo.png"/></a></li>
              </ul>
              {isLoading ? (<p></p>) : <p id="nameNav">{"Hi, " + data.display_name.split(" ")[0]}</p>}
              
        </div>
    );
}

export default NavBar;