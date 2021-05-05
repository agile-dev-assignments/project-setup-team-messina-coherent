# Project Repository

This repository will be used for team projects. Delete the contents of this file and replace with the contents of a proper README.md, as described in the [project setup instructions](./project-setup-instructions.md)

See the [Sprint Planning instructions](./sprint-planning-instructions.md) once the basic Project Kickoff tasks have been completed.

## How does your music taste compare?

### Description

Our project (MVP) is going to, via the Spotify API, determine a users music taste. This will be done by determining the genre percentages of this users library. That is the main feature of our project, the core of it all. Once that is implemented we will then use the users "taste", along with a weather API to recommend them playlists that are in tune with their "taste" and the current weather for their location, which we will request from them. We will also use the users "taste" to recommend them playlists based off of a variety of moods.

### Team Members

Ryan Schwarz -- [GitHub Account](https://github.com/ryan-schwarz)

Yuval Rubenstein --  [GitHub Account](https://github.com/RubyMamba)

Arif Howlander -- [GitHub Account](https://github.com/arifh331)

Aisha Manoj -- [GitHub Account](https://github.com/aishamanoj)

Gi Yoon Ohm -- [GitHub Account](https://github.com/gyo202)

### Project History

The project was built on the idea of giving the user a more personalized experience than just on Spotify itself. You can contribute to the project as it is defined in our [CONTRIBUTING.md](./CONTRIBUTING.md) document.

### Building and Testing

**Sprint 4 Update:**
1. You can view our app on Digital Ocean using this [link](http://159.65.190.215:3000/) 

**Sprint 3 Update:**
1. Clone our repository, open up two terminal windows and cd into the back-end and front-end folders
2. On each terminal write npm install, which installs all dependencies
3. On the back-end terminal write node app.js, and front-end npm start
4. Sign in to your Spotify account
5. Click on "My Taste" to view the taste of your library
6. Click on any of the mood playlists to view a recommended collection of playlists for that mood based off your library. Each playlist links to the actual Spotify playlist.

------------
To be updated when our project reaches that stage.

To see how to by-weather page works:
1. Clone our repository, cd into the back-end folder
2. On the terminal write npm install, which installs all dependencies
3. On the terminal write node app.js
4. In your browser, navigate to https://localhost:3000/by-weather/{zipcode}, inserting your desired zipcode
5. The page will display a json with weather data for the zipcode

### Additional Links
[UX-Design Repo](https://github.com/agile-dev-assignments/user-experience-design-team-messina-coherent)

[Prototype](https://projects.invisionapp.com/share/AH10C9MTTEJF#/screens)
