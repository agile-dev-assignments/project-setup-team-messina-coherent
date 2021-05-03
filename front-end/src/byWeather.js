import './byWeather.css';
import React, { useState, } from 'react';
import axios from 'axios';
import Playlist from './playlist';
import { useHistory } from "react-router-dom";




// async function fetchData() {
//     // axios is a 3rd-party module for fetching data from servers
//     const result = await axios.get(
//       // retrieving some mock data about animals for sale
//       "https://my.api.mockaroo.com/mock_api.json?key=5efe2840"
//     );
//     // set the state variable
//     // this will cause a re-render of this component
//     console.log("," + result.data);
//     // setData(result.data);
//     return result.data;
//   }

function ByWeather(props) {
    const [zip, setZip] = useState("");
    const [hasError, setErrors] = useState(false);
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
      
    }
    
    return (
    <form >
      <label>
        Zipcode:
        <input type="text" onChange={handleZip} />
      </label>
      <button type="button" onClick = {handleSubmit} > Submit</button>
    </form>);

    //async function fetchData() {
      //const res = await fetch('https://my.api.mockaroo.com/mock_api.json?key=5efe2840');
      //res
      //.json()
      //.then((res) =>  setData(res))
      //.catch((err) => setErrors(err));

     
};
  //console.log(data)
  
  //useEffect(() => {
    //fetchData();
    
  //}, []);

// useEffect(() => {
//     // a nested function that fetches the data
//     console.log("Line 28")
    


//     // fetch the data!
//     let myResult = fetchData();
//     setData(myResult);

//     // the blank array below causes this callback to be executed only once on component load
//   }, []);

  //return (
    
    //<>
    //{console.log(data)}
    //<h1 id='weather'>{props.name} </h1>
     // {data && data.playlists.map((item) => (
       // <Playlist details={item}></Playlist>
      //))}

    //</>
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
