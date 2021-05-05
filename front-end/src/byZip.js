import './byZip.css';
import './byWeather.css';
import React, { useEffect, useState } from 'react';
import Playlist from './playlist.js'
import axios from 'axios';
import {useParams} from "react-router-dom";


function ByZip(props) {
    console.log("here")
    const {zipcode}=useParams();
    const [zip, setZip] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const url = `http://localhost:3001/by-weather/${zipcode}`;
    console.log(zipcode)
    useEffect(() => {
      axios.get(url).then(response => {
        setZip(response.data);
        setLoading(false);
        //console.log(props);
        //setLoading(false);
      });
    }, []);
    console.log(zip);

      return (
        <div>
          <h2 id="weather">Your zipcode is: {zipcode}</h2>
    {isLoading ? (<p style={{padding:'20px'}}>Loading your playlists...</p>) :
     (zip.map((item) => <Playlist name={item.name}
     images={item.image} id={item.id} tracks={item.tracks}></Playlist>))})
        </div>
      )
      };
export default ByZip;