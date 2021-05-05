import './byWeather.css';
import React, { useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";




function ByWeather(props) {
    const [zip, setZip] = useState("");
    // const [hasError, setErrors] = useState(false);
    const [data, setData]=useState({});
    const url='http://localhost:3001/by-weather'

    const handleZip=(e)=>{
      e.preventDefault();
      const value=e.target.value;
      setZip(value);
    }
    
    let history=useHistory();

    const handleSubmit= async (e) => {
      e.preventDefault();
      const value=e.target.value;
      const apiResponse = await axios
        .get(
      `http://localhost:3001/by-weather/${zip}`)
      .catch()
      setData(apiResponse);
      history.push(`by-weather/${zip}`);
      //history.push({pathname:"./by-weather/${zip}"})
      
    }
    
    return (
    <form >
      <label>
        Zipcode:
        <input type="text" onChange={handleZip} />
      </label>
      <button type="button" onClick = {handleSubmit} > Submit</button>
    </form>);

   

     
};
  

  
//function ByWeather(props) {
  //console.log(props)
    //const [data, setData] = useState('');

    //const [isLoading, setLoading] = useState(true);
    //const url = 'http://localhost:3001/' + props.url;
    //console.log(url)
    //useEffect(() => {
      //axios.get(url).then(response => {
        //setData(response.data);
        //setLoading(false);
      //});
    //}, []);

    //console.log(data)
    //if(isLoading == false){
      //data.map(function(item){
        //console.log(item.body.images[0].url)
        //})

      //}

  //return (
    
    //<>
    //<h1 id="weather">{props.name}</h1>
    //{isLoading ? (<p style={{padding:'20px'}}>Loading your playlists...</p>) :
     //(data.map((item) => <Playlist id={item.body.id} name={item.body.name} tracks={item.sum} 
     //images={item.body.images[0].url}></Playlist>))})
    //</>
      
  //);
//}

export default ByWeather;
