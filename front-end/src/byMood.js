import React, { useEffect, useState } from 'react';
import Playlist from './playlist.js'
import axios from 'axios';
import './byWeather.css';

function ByMood(props) {
    console.log(props)
      const [data, setData] = useState('');
  
      const [isLoading, setLoading] = useState(true);
      const url = 'http://localhost:3001/' + props.url;
      console.log(url)
      useEffect(() => {
        axios.get(url).then(response => {
          setData(response.data);
          setLoading(false);
        });
      }, []);
  
      console.log(data)

  
    return (
      
      <>
      <h1 id="weather">{props.name}</h1>
      {isLoading ? (<p style={{padding:'20px'}}>Loading your playlists...</p>) :
       (data.map((item) => <Playlist id={item.body.id} name={item.body.name} tracks={item.body.tracks.total} 
       images={item.body.images[0].url}></Playlist>))}
      </>
        
    );
  }

  export default ByMood;