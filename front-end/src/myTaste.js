import './myTaste.css';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';



function MyTaste() {
  const [taste, setTaste] = useState('');
  const url = 'http://localhost:3001/my-taste';
  useEffect(() => {
    axios.get(url).then(response => {
      setTaste(response.data);
      //setLoading(false);
    });
  }, []);

  let other = (((taste.sum - (Object.values(taste)[0] + Object.values(taste)[1] + Object.values(taste)[2] + Object.values(taste)[3] + Object.values(taste)[4]))/taste.sum) * 100).toFixed(2)
  const state = {
    labels: [Object.keys(taste)[0],Object.keys(taste)[1],Object.keys(taste)[2],Object.keys(taste)[3],Object.keys(taste)[4], "Other"],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4', '#D8D8D8'],
        hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F', '#888888'],
        data: [((Object.values(taste)[0]/taste.sum) * 100).toFixed(2), ((Object.values(taste)[1]/taste.sum) * 100).toFixed(2)
        , ((Object.values(taste)[2]/taste.sum) * 100).toFixed(2), ((Object.values(taste)[3]/taste.sum) * 100).toFixed(2)
        , ((Object.values(taste)[4]/taste.sum) * 100).toFixed(2), other],
      },
    ],
  };

    return (
      <div className='taste'>
        <h1>My Taste</h1>

        {console.log(taste)}

        <div>
          <Pie
            data={state}
            options={{
              title: {
                display: true,
                text: 'Genre Breakdown',
                fontSize: 20,
                fontColor: 'white',
              },
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontColor: 'white',
                },
              },
            }}
          />
        </div>
        <br />

        <p>Your Library Breakdown by Top 5 Genres:</p>

        <p>{Object.keys(taste)[0]} : {((Object.values(taste)[0]/taste.sum) * 100).toFixed(2)}%</p>

        <p>{Object.keys(taste)[1]} : {((Object.values(taste)[1]/taste.sum) * 100).toFixed(2)}%</p>

        <p>{Object.keys(taste)[2]} : {((Object.values(taste)[2]/taste.sum) * 100).toFixed(2)}%</p>

        <p>{Object.keys(taste)[3]} : {((Object.values(taste)[3]/taste.sum) * 100).toFixed(2)}%</p>

        <p>{Object.keys(taste)[4]} : {((Object.values(taste)[4]/taste.sum) * 100).toFixed(2)}%</p>
        <p>Other : {other}%</p>
      </div>
    );
}

export default MyTaste;
