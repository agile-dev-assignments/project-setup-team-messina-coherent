import './playlist.css';

function Playlist(props) {
  return (
    <div className='playlist'>
      <hr></hr>
      <div className='row'>
      <div className='column-1'>
      <img src={props.details.images} />
      </div>
      <div className='column-2'>
      <h2>{props.details.name}</h2>

      <p>Number of Tracks: {props.details.tracks}</p>
      </div>
      </div>
    </div>
  );
}

export default Playlist;
