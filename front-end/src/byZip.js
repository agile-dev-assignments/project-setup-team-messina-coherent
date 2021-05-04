import './byZip.css';
import React, { useEffect, useState } from 'react';
//import { Playlist } from 'react-spotify-api'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {useParams} from "react-router-dom";


function ByZip(props) {
    console.log("here")
    const {zipcode}=useParams();
    const [zip, setZip] = useState([]);
    const url = `http://159.65.190.215:3000/by-weather/${zipcode}`;
    console.log(zipcode)
    useEffect(() => {
      axios.get(url).then(response => {
        setZip(response.data);
        console.log(props);
        //setLoading(false);
      });
    }, []);
    //console.log(zip);

      return (
        <div>
        <h1> First Playlist</h1>
        <p>{JSON.stringify(zip[0]?.name)} </p>
        <img src={(zip[0]?.image)} style={{ height: 150 }}/>
        <a href={zip[0]?.link}> Click here to listen to this Playlist </a>
        <h1> Second Playlist</h1>
        <p>{JSON.stringify(zip[1]?.name)}</p>
        <img src={(zip[1]?.image)} style={{ height: 150 }}/>
        <a href={zip[1]?.link}> Click here to listen to this Playlist </a>
        <h1> Third Playlist</h1>
        <p>{JSON.stringify(zip[2]?.name)}</p>
        <img src={(zip[2]?.image)} style={{ height: 150 }}/>
        <a href={zip[2]?.link}> Click here to listen to this Playlist </a>
        <h1> Fourth Playlist</h1>
        <p>{JSON.stringify(zip[3]?.name)}</p>
        <img src={(zip[3]?.image)} style={{ height: 150 }}/>
        <a href={zip[3]?.link}> Click here to listen to this Playlist </a>
        <h1> Fifth Playlist</h1>
        <p>{JSON.stringify(zip[4]?.name)}</p>
        <img src={(zip[4]?.image)} style={{ height: 150 }}/>
        <a href={zip[4]?.link}> Click here to listen to this Playlist </a>
        </div>
      )
      };
export default ByZip;