const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
require("dotenv").config({ silent: true })

const axios = require('axios'); // middleware for making requests to APIs

const morgan = require('morgan'); // middleware for nice logging of incoming HTTP requests
// use the morgan middleware to log all incoming http requests
//app.use(morgan('dev')); // morgan has a few logging default styles - dev is a nice concise color-coded style

const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// use the bodyparser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.set('view engine', 'html');
// make 'public' directory publicly readable with static content
app.use('/static', express.static('public'));

app.use(express.static(__dirname + '/public')).use(cors()).use(cookieParser());

/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

var SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');

var credentials = {
  clientId: '5d968e8774bb44b38bb0a26b8ec1104a',
  clientSecret: 'ef94a00d195c462ea765c26987930804',
};

var spotifyApi = new SpotifyWebApi(credentials);

spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

// var spotifyApi = new SpotifyWebApi();

/**
 * Get metadata of tracks, albums, artists, shows, and episodes
 */

// Get genre from track
function getTrackGenre(id, callback) {
    //console.log("Track ID: " + id)
  spotifyApi
    .getTrack(id)
    .then(function (data) {
        //console.log("Artist ID: " + data.body.artists[0].id)
        return spotifyApi.getArtist(data.body.artists[0].id);
    })
    .then(function (data) {
      //console.log(data.body.genres.pop());
      callback(data.body.genres.pop());
    })
    
    .catch(function (err) {
      console.error(err);
    });
    
}



function playlistFinder(filter, callback){

    // spotifyApi.searchPlaylists('rap', {
    //     country: 'US',
    //     limit : 2,
    //     offset : 0
    //   })
    // .then(function(data) {
    //   console.log(data.body);
    // }, function(err) {
    //   console.log("Something went wrong!", err);
    // });

    mainData = [];

    spotifyApi.searchPlaylists(filter, {
        country: 'US',
        limit : 6,
        offset : 0
      })
    .then(function(data) {
        //console.log(data)
        data.body.playlists.items.map(function(item){
            mainData.push(item);
            mainData.push('\n')
            
            spotifyApi.getPlaylistTracks(item.id).then(function(data){
                //console.log(data.body.items);
            })
            
        })
        callback(mainData)
    }
    // .then(function(playlistID){
    //     console.log(playlistID)
    //     return spotifyApi.getPlaylistTracks(playlistID);
    // })
    // .then(function(data){
    //     data.body.items.map(function(values){
    //         console.log(getTrackGenre(values.track.id))
    //     })
    // })
    , function(err) {
      console.log("Something went wrong!", err);
    });
}

//function to tally up the genre of a users playlist 

function playlistally(playl){
  let ar = new Array();

  spotifyApi.getPlaylist(playl)
  .then(function(data) {
    console.log('Some information about this playlist', data.body);

    //iterate through the json of tracks


    for (let key in data.body) {
      //Does this return back?
      let tr = getTrackGenre(key);

      //now adding the track to the array

      //if it already exists increment 
      for (let art in ar ) {
        if (tr.name === art.name) {
          art.count++;
        }
         
        else{
          let obj = {name : tr.name, count : 1};

          ar.push(obj);

        }

      }

    }
    //Returns array of objects with properties of name of genre and the tallies associated with it 
    return ar;
    

  }, function(err) {
    console.log('Something went wrong!', err);
  });


}

/*
Write a component to get a user's saved tracks
*/
function getSavedTracks(){
  spotifyApi.getMySavedTracks({
    limit : 2,
    offset: 1
  })
  .then(function(data){
    data.map((node)=>{
      console.log(node.body);
    });
    console.log('Done!');
  }, function(err){
    console.log('Something went wrong!', err);
  });
}

/*
Components to do the login for the site thru Spotify 
*/

// const client_id = '0aa3357a8ce94adf8571ed29f3d59e33'; // Your client id
// const client_secret = 'c085945032cb470c97081d505ee53786'; // Your secret
// const redirect_uri = 'http://localhost:3000/'; // Your redirect uri

// const stateKey = 'spotify_auth_state';

// app.get('/login', function(req, res) {
//   const scopes = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize' +
//     '?client_id=' + client_id+
//     '&response_type=code'  +
//     '&show_dialog=true'+
//     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//     '&redirect_uri=' + encodeURIComponent(redirect_uri));
//   });
  
// route for HTTP GET requests to the root document
app.get('/', (req, res) => {
  res.render('index');

// 

// scopes = ['user-read-private', 'user-read-email'];
  
  
//route for HTTP GET request to get user ID and username
  async getUserID(AccessToken)
  {
    const headers = {
        Authorization: 'Bearer ${myToken}'
    };
  
  let userID = '';
  let username = '';
  const response = await fetch(app.get('https://api.spotify.com/v1/me',
                                       {
                                       headers : headers
                                       }
                                       ));
  const jsonResponse = await response.json();
  if(jsonResponse)
  {
    userID = jsonResponse.id;
    username = jsonResponse.display_name;
  }
    return userID, username;
  }



// route for HTTP GET to see the genre of random song of choice
app.get('/genre-getter', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  getTrackGenre('4DuUwzP4ALMqpquHU0ltAB', function(result){
    console.log(result)
    res.send(result);
  });
  
});

app.get('/party', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('party', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/in-my-feels', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('feels', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/on-my-grind', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('workout', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});



app.get("/by-weather", (req, res, next) => {
  // insert the environmental variable into the URL we're requesting
  axios
    .get(`${process.env.API_BASE_URL}?zip=08824&appid=${process.env.API_SECRET_KEY}`)
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
})

app.get("/by-weather/:zipcode", async (req, res) => {
  // use axios to make a request to an API to fetch a single animal's data
  // we use a Mock API here, but imagine we passed the animalId to a real API and received back data about that animal
  const apiResponse = await axios
    .get(
      `${process.env.API_BASE_URL}?zip=${req.params.zipcode}&appid=${process.env.API_SECRET_KEY}`
    )
    .catch(err => next(err)) // pass any errors to express

  // express places parameters into the req.params object
  const responseData = {
    status: "wonderful",
    message: `Imagine we got the data from the API for animal #${req.params.zipcode}`,
    zipcode: req.params.zipcode,
    weather_data: apiResponse.data,
  }

  // send the data in the response
  res.json(responseData)
})

app.get('/plotting-my-revenge', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('motivated', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/romantic', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('romantic', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/mood-boosters', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('happy', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});


app.listen(3000);

// export the express app we created to make it available to other modules
// module.exports = app

