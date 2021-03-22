import './home.css';
import React, { useState } from 'react';



function Home(){
    const [logged, setLogin] = useState(true);
    if ({ logged }) { 
    return (
        <div id="home">
            <h2>What is Your Music Taste?</h2>
            <img src="/home.jpg"/>
            <p>Want to know more about your Spotify library?</p>
            <p>If your answer if yes, you've come to the right place! If not, still give it shot! Our mission is to provide you, 
                the user, with a more custom and tailored experience than you would recieve from Spotify alone. 
            </p>
            <a href="/login"><button className="homeButton">Login With Your Spotify Account</button></a>
            <p>If you haave any questions or would like to know more, please visit our <a className="homeLink" href="/about">About Us</a> and <a className="homeLink" href="/faq">FAQ</a> pages.</p>
            
        </div>
    );
    }
    return (
        <div id="home">
            <h2>What is Your Music Taste?</h2>
            <img src="/home.jpg"/>
            <p>Want to know more about your Spotify library?</p>
            <p>If your answer if yes, you've come to the right place! If not, still give it shot! Our mission is to provide you, 
                the user, with a more custom and tailored experience than you would recieve from Spotify alone. 
            </p>
            <a href="/myTaste"><button className="homeButton">View Your Taste</button></a>
            <p>If you haave any questions or would like to know more, please visit our <a className="homeLink" href="/about">About Us</a> and <a className="homeLink" href="/faq">FAQ</a> pages.</p>
            
        </div>
    );

}

export default Home;