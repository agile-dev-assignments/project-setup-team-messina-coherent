import './byWeather.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './playlist';


function ByWeather(props) {
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
    if(isLoading == false){
      data.map(function(item){
        console.log(item.body.images[0].url)
        })
      }


  return (
    
    <>
    <h1 id="weather">{props.name}</h1>
    {isLoading ? (<p style={{padding:'20px'}}>Loading your playlists...</p>) : (data.map((item) => <Playlist id={item.body.id} name={item.body.name} tracks={item.sum} images={item.body.images[0].url}></Playlist>))}
    


    
   

    </>
      
  );
}

export default ByWeather;
