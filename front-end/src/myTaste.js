import './myTaste.css';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

const state = {
  labels: ['Hip Hop/Rap', 'Rock', 'Pop', 'R&B', 'Country'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
      hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
      data: [43, 23, 20, 13, 1],
    },
  ],
};

function MyTaste() {
  return (
    <div className='taste'>
      <h1>My Taste</h1>

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
              labels:{
                  fontColor:'white',
              }
            },
          }}
        />
      </div>
      <br/>

      <p>Your Library Breakdown by Genre:</p>

      <p>Hip Hop/Rap: 43%</p>

      <p>Rock: 23%</p>

      <p>Pop: 20%</p>

      <p>R&B: 13%</p>

      <p>Country: 1%</p>
    </div>

    
  );
}

export default MyTaste;
