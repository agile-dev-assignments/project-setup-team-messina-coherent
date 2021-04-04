import './byWeather.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './playlist';


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
    const [data, setData] = useState({});

  const [hasError, setErrors] = useState(false);

  async function fetchData() {
    const res = await fetch('https://my.api.mockaroo.com/mock_api.json?key=5efe2840');
    res
      .json()
      .then((res) =>  setData(res))
      .catch((err) => setErrors(err));

     
  }
  console.log(data)
  
  useEffect(() => {
    fetchData();
    
  }, []);

// useEffect(() => {
//     // a nested function that fetches the data
//     console.log("Line 28")
    


//     // fetch the data!
//     let myResult = fetchData();
//     setData(myResult);

//     // the blank array below causes this callback to be executed only once on component load
//   }, []);

  return (
    
    <>
    {console.log(data)}
    <h1 id='weather'>{props.name} </h1>
      {data && data.map((item) => (
        <Playlist details={item}></Playlist>
      ))}

    </>
      
  );
}

export default ByWeather;
