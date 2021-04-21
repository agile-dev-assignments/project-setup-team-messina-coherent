import './About.css';
import Headers from './About_Header.js'
function About(){
    return (
        <div className="about">
            <Headers />
            <p className="aboutP">Our project, How Does Your Music Taste Compare?, is going to, via the Spotify API, determine a users music taste. 
            This will be done by determining the genre percentages of this users library. That is the 
            main feature of our project, the core of it all. Once that is implemented we will then use the users "taste",
             along with a weather API to recommend them playlists that are in tune with their "taste" and the current 
             weather for their location, which we will request from them. We will also use the users "taste" to recommend 
             them playlists based off of a variety of moods.</p>
        </div>
    )
}


export default About;