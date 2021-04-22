import './Login.css';
import React from 'react'
import ReactDom from "react-dom";



function Login() {
  const client_id = '0aa3357a8ce94adf8571ed29f3d59e33'; // Your client id
  const client_secret = 'c085945032cb470c97081d505ee53786'; // Your secret
  const redirect_uri = 'http://localhost:3000/'; // Your redirect uri

  const stateKey = 'spotify_auth_state';

  
    const scopes = 'user-read-private user-read-email';

    const url ='https://accounts.spotify.com/authorize' +
    '?client_id=' + client_id+
    '&response_type=code'  +
    '&show_dialog=true'+
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri);
  
  return (
    <div className='Login'>
      <h1>Login</h1>
      <p>Click the button below to log in with your Spotify account.</p>
      <a href ='http://localhost:3001/login' className='homeButton'>Log In With Spotify</a>
    </div>
  );
}
export default Login;
