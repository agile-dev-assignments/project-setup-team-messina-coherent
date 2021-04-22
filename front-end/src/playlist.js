import './playlist.css';

function Playlist(props) {
  console.log(props)
  const url = "https://open.spotify.com/playlist/"+ props.id;
  console.log(url)
  return (


    <div className='playlist'>
      <hr></hr>
      <div className='row'>
      <div className='column-1'>
      <img src={props.images} />
      </div>
      <div className='column-2'>
      <a href={url} target="_blank"><h2>{props.name}</h2></a>

      <p>Number of Tracks: {props.tracks}</p>
      </div>
      </div>
    </div>

  );
}

export default Playlist;
