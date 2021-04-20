import './Login.css';

function Login() {
  return (
    <div className='Login'>
      <h1>Login</h1>
      <p>Click the button below to log in with your Spotify account.</p>
      <a href ='http://localhost:3001/login' className='homeButton'>Log In With Spotify</a>
    </div>
  );
}
export default Login;
