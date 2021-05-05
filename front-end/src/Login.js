import './Login.css';
import React from 'react'




function Login() {
  return (
    <div className='Login'>
      <h1>Login</h1>
      <p>Click the button below to log in with your Spotify account.</p>
      <a href ='http://localhost:3001/login'><button className='homeButton'>Log In With Spotify</button></a>
    </div>
  );
}
export default Login;
