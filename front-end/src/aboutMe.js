import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './aboutMe.css'


function AboutMe(){

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
        <div id="aboutMe">
              {isLoading ? (<p>Loading your info...</p>) 
              : 
              <div class="aboutMe2">
                <center><div style={{backgroundImage: "url(" + data.images[0].url + ")", height: '220px', width: '220px', borderRadius:'50%', backgroundPosition: 'center'}}></div></center>
                <h2>{data.display_name}</h2>
              <div style={{textAlign: 'left'}}>
              <p>Email: {data.email}</p>
              <p>Followers: {data.followers.total}</p>
              </div>
              
              </div>
              
              }
              
        </div>
    );
}

export default AboutMe;