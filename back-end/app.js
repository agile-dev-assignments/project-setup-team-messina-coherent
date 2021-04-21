const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
require("dotenv").config({ silent: true })


const User= require('./db');

const mongoose = require('mongoose');

const axios = require('axios'); // middleware for making requests to APIs

const morgan = require('morgan'); // middleware for nice logging of incoming HTTP requests
// use the morgan middleware to log all incoming http requests
//app.use(morgan('dev')); // morgan has a few logging default styles - dev is a nice concise color-coded style


//Getting the express validator
const { body, validationResult } = require('express-validator');


var cors = require('cors');

app.use(cors());

const querystring = require('querystring');
const cookieParser = require('cookie-parser');


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
var scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private'];

var spotifyApi = new SpotifyWebApi({
  clientId: '0aa3357a8ce94adf8571ed29f3d59e33',
  clientSecret: 'c085945032cb470c97081d505ee53786',
  redirectUri : 'http://localhost:3001/callback'
});
app.get('/login', (req,res)=>{
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
  // console.log(html);
  // res.redirect(html+"&show_dialog=true");
});

app.get('/callback', async(req,res)=>{
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;
  if(error){
    console.log(error);
    res.send('Callback Error: '+error);
  }
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data =>{
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token', access_token);
      console.log('refresh_token', refresh_token);

      console.log('Successful!');
      
      // res.send('Success!');
      res.redirect('http://localhost:3000/');
      setInterval(async ()=>{
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in/2 *1000);
    })
    .catch(error =>{
      console.log('Error getting Tokens: ', error);
      res.send('Error getting tokens: '+ error);
    });
    

});
// var credentials = {
//   clientId: '5d968e8774bb44b38bb0a26b8ec1104a',
//   clientSecret: 'ef94a00d195c462ea765c26987930804',
// };

// var spotifyApi = new SpotifyWebApi(credentials);

// spotifyApi.clientCredentialsGrant().then(
//   function (data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   },
//   function (err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );

// var spotifyApi = new SpotifyWebApi();

/**
 * Get metadata of tracks, albums, artists, shows, and episodes
 */

// Taste object from playlist
async function getTaste(id) {
  try {
    if (id != undefined || id != null) {
      const playlist = await getPlaylistWithTracks(id);
      if (playlist != null || playlist != undefined) {
        let tracksIds = playlist.tracks.items.map((item) => {
          if (item != null || item.track.id != null || item.track.id != undefined) {
            return item.track.id;
          }
          else{
              return;
          }
        });

        //console.log(tracksIds);
        //console.log(tracksIds.length);
        const tracksInfo = [];
        for (let i = 1; i < tracksIds.length; i++) {
          if (tracksIds.length >= 50 && i % 50 == 0) {
            let info = await spotifyApi.getTracks(tracksIds.slice(i - 50, i));
            //tracksInfo.push(info.body)
            info.body.tracks.forEach((track) => tracksInfo.push(track.artists[0].id));
            //console.log(info.body)
          } else if (tracksIds.length >= 50 && i >= 50 && tracksIds.length - i < 50) {
            let info = await spotifyApi.getTracks(tracksIds.slice(i - 1, tracksIds.length));
            info.body.tracks.forEach((track) => tracksInfo.push(track.artists[0].id));
            break;
          }
        }

        //console.log(tracksInfo);

        let genres = [];

        for (let i = 1; i < tracksInfo.length; i++) {
          if (tracksInfo.length >= 50 && i % 50 == 0) {
            let info = await spotifyApi.getArtists(tracksInfo.slice(i - 50, i));
            //tracksInfo.push(info.body)
            info.body.artists.forEach((track) => genres.push(track.genres.pop()));
            //console.log(info.body.artists)
          } else if (tracksIds.length >= 50 && i >= 50 && tracksIds.length - i < 50) {
            let info = await spotifyApi.getArtists(tracksInfo.slice(i - 1, tracksInfo.length));
            info.body.artists.forEach((track) => genres.push(track.genres.pop()));
            break;
          }
        }

        //console.log(genres.length);

        let counts = {};

        for (var i = 0; i < genres.length; i++) {
          var num = genres[i];
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

        var sum = 0;
        for (var el in counts) {
          if (counts.hasOwnProperty(el)) {
            sum += parseFloat(counts[el]);
          }
        }

        //console.log('sum: ' + sum);

        const sortable = Object.entries(counts)
          .sort(([, a], [, b]) => b - a)
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

        if (sortable.undefined) {
          delete sortable.undefined;
        }

        for (const [key, value] of Object.entries(sortable)) {
          let words = key.split(' ');
          let upper;
          upper = words
            .map((word) => {
              if (word == 'uk') {
                return word.toUpperCase();
              }
              return word[0].toUpperCase() + word.substring(1);
            })
            .join(' ');

          delete sortable[key];
          sortable[upper] = value;
        }
        sortable['sum'] = sum;
        console.log(sortable);

        if (sortable != null || sortable != undefined) {
          return sortable;
        }
      }
    }
  } catch (err) {
    console.log('Something went wrong!', err);
  }
}

async function getPlaylistWithTracks(id) {
  const playlist = (await spotifyApi.getPlaylist(id)).body;
  // if there is more tracks than the limit (100 by default)
  if (playlist.tracks.total > playlist.tracks.limit) {
    // Divide the total number of track by the limit to get the number of API calls
    for (let i = 1; i < Math.ceil(playlist.tracks.total / playlist.tracks.limit); i++) {
      const trackToAdd = (
        await spotifyApi.getPlaylistTracks(id, {
          offset: playlist.tracks.limit * i, // Offset each call by the limit * the call's index
        })
      ).body;
      // Push the retreived tracks into the array
      trackToAdd.items.forEach((item) => playlist.tracks.items.push(item));
    }
  }
  return playlist;
}

async function playlistFinder(filter, offset) {
  try {
    mainData = [];
    artists = [];

    let playlistData = await spotifyApi.searchPlaylists(filter, {
      country: 'US',
      limit: 1,
      offset: offset,
    });

    //console.log('playlistData', playlistData);
    console.log(playlistData.body.playlists.items);
    console.log(playlistData.body.playlists.items[0].id);
    if (
      playlistData.body.playlists.items[0].id != undefined ||
      playlistData.body.playlists.items[0].id != 'undefined' ||
      playlistData.body.playlists.items[0].id != null ||
      playlistData.body.playlists.items[0] != undefined ||
      playlistData.body.playlists.items[0] != null
    ) {
      //console.log(playlistData.body.playlists)

      const playlist = await getTaste(playlistData.body.playlists.items[0].id);
      if (playlist == null || playlist == undefined) {
        console.log('UNDEFINED UNDEFINED');
      } else {
        playlist['id'] = playlistData.body.playlists.items[0].id;
        return playlist;
      }

      //console.log(playlist)
    }
    //   playlistData.body.playlists.items.map(async function (item) {
    //     // mainData.push(item);
    //     // mainData.push('\n');
    //     //console.log(item.id);
    //     const playlist = await getTaste(item.id);
    //     playlist['id'] = item.id
    //     console.log('FINAL PLAYLIST' + JSON.stringify(playlist));
    //     return playlist;
    //   }),
  } catch (err) {
    console.log('Something went wrong!', err);
  }
  // });
}

//async function playlistArray(filter, offset) {}

// scopes = ['user-read-private', 'user-read-email'];


/*
Write a component to get a user's saved tracks
*/
// function getSavedTracks(){
//   spotifyApi.getMySavedTracks({
//     limit : 2,
//     offset: 1
//   })
//   .then(function(data){
//     data.map((node)=>{
//       console.log(node.body);
//     });
//     console.log('Done!');
//   }, function(err){
//     console.log('Something went wrong!', err);
//   });
// }

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
});


// scopes = ['user-read-private', 'user-read-email'];
  
  
//route for HTTP GET request to get user ID and username


//   async function getUserID(AccessToken)
//   {
//     const headers = {
//         Authorization: 'Bearer ${myToken}'
//     };
  
//   let userID = '';
//   let userName = '';
//   const response = await fetch(app.get('https://api.spotify.com/v1/me',
//                                        {
//                                        headers : headers
//                                        }
//                                        ));
//   const jsonResponse = await response.json();
//   if(jsonResponse)
//   {
//     userID = jsonResponse.id;
//     userName = jsonResponse.display_name;
//   }

//   // Check if database already has this user
//   User.find({username:userName,userid:userID}, function(err,result){
//     if (err){
//       console.log(err);
//     }else {

//       //check if the result is empty or not 
//       if (result == " "){

//         //create the new user 
//         let newus = User({username:userName,userid:userID,playlists:[]});

//         //After creating,save it 
//         newus.save(function(err,doc){
//           if (err){
//             console.log(err);
//           }else {console.log("Entered database")};
          
//         })
//       }


//     }
//   })
  
//     return userID, userName;
//   }




// route for HTTP GET to see the genre of random song of choice
// app.get('/genre-getter', async (req, res) => {
//   //var result = await spotifyApi.getUserPlaylists();
//   getTrackGenre('4DuUwzP4ALMqpquHU0ltAB', function (result) {
//     console.log(result);
//     res.send(result);
//   });
// });

app.get('/my-taste', async (req, res) => {
  const myTaste = await getTaste('37i9dQZF1DXaXB8fQg7xif');
  res.send(myTaste);
});

app.get('/party', async (req, res) => {
  try {
    let playlistArray = [];
    const myTaste = await getTaste('37i9dQZF1DXaXB8fQg7xif');
    // const playlist = await playlistFinder('party',0);
    if (Object.keys(myTaste)[0] != undefined) {
      console.log(Object.keys(myTaste)[0]);
    }

    let i = 0;
    while (playlistArray.length < 5) {
      const playlist = await playlistFinder('party', i);
      console.log('PLAYLIST' + playlist);
      if (Object.keys(myTaste)[0] === Object.keys(playlist)[0]) {
        console.log('MATCH');
        const newP = await spotifyApi.getPlaylist(playlist.id);
        newP['sum'] = playlist.sum;
        playlistArray.push(newP);
        //     //playlistArray.push((await spotifyApi.getPlaylist(Object.keys(playlist)['id'])).body);
      }
      i++;
      //console.log(Object.keys(myTaste)[0]);
      //console.log("PLAYLIST" + Object.keys(playlist)[0]);
    }
    res.send(playlistArray);
  } catch (err) {
    console.log('error' + err);
  }
});

app.get('/in-my-feels', async (req, res) => {
  try {
    let playlistArray = [];
    const myTaste = await getTaste('6aPPck00Cxswo5A6kibFVU');
    // const playlist = await playlistFinder('party',0);
    if (Object.keys(myTaste)[0] != undefined) {
      console.log(Object.keys(myTaste)[0]);
    }

    let i = 0;
    while (playlistArray.length < 5) {
      const playlist = await playlistFinder('sad', i);
      console.log('PLAYLIST' + playlist);
      if (Object.keys(myTaste)[0] === Object.keys(playlist)[0] && playlist != undefined) {
        console.log('MATCH');
        const newP = await spotifyApi.getPlaylist(playlist.id);
        newP['sum'] = playlist.sum;
        playlistArray.push(newP);
        //     //playlistArray.push((await spotifyApi.getPlaylist(Object.keys(playlist)['id'])).body);
      }
      i++;
      //console.log(Object.keys(myTaste)[0]);
      //console.log("PLAYLIST" + Object.keys(playlist)[0]);
    }
    res.send(playlistArray);
  } catch (err) {
    console.log('error' + err);
  }
});

app.get('/on-my-grind', async (req, res) => {
  //var result = await spotifyApi.getUserPlaylists();
  try {
    let playlistArray = [];
    const myTaste = await getTaste('37i9dQZF1DXaXB8fQg7xif');
    // const playlist = await playlistFinder('party',0);
    if (Object.keys(myTaste)[0] != undefined) {
      console.log(Object.keys(myTaste)[0]);
    }

    let i = 0;
    while (playlistArray.length < 5) {
      const playlist = await playlistFinder('grind', i);
      console.log('PLAYLIST' + playlist);
      if (Object.keys(myTaste)[0] === Object.keys(playlist)[0]) {
        console.log('MATCH');
        const newP = await spotifyApi.getPlaylist(playlist.id);
        newP['sum'] = playlist.sum;
        playlistArray.push(newP);
        //     //playlistArray.push((await spotifyApi.getPlaylist(Object.keys(playlist)['id'])).body);
      }
      i++;
      //console.log(Object.keys(myTaste)[0]);
      //console.log("PLAYLIST" + Object.keys(playlist)[0]);
    }
    res.send(playlistArray);
  } catch (err) {
    console.log('error' + err);
  }
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
  try {
    let playlistArray = [];
    const myTaste = await getTaste('37i9dQZF1DXaXB8fQg7xif');
    // const playlist = await playlistFinder('party',0);
    if (Object.keys(myTaste)[0] != undefined) {
      console.log(Object.keys(myTaste)[0]);
    }

    let i = 0;
    while (playlistArray.length < 6) {
      const playlist = await playlistFinder('motivated', i);
      console.log('PLAYLIST' + playlist);
      if (Object.keys(myTaste)[0] === Object.keys(playlist)[0]) {
        console.log('MATCH');
        const newP = await spotifyApi.getPlaylist(playlist.id);
        newP['sum'] = playlist.sum;
        playlistArray.push(newP);
        //     //playlistArray.push((await spotifyApi.getPlaylist(Object.keys(playlist)['id'])).body);
      }
      i++;
      //console.log(Object.keys(myTaste)[0]);
      //console.log("PLAYLIST" + Object.keys(playlist)[0]);
    }
    res.send(playlistArray);
  } catch (err) {
    console.log('error' + err);
  }
});

app.get('/romantic', async (req, res) => {
  //var result = await spotifyApi.getUserPlaylists();
  try {
    let playlistArray = [];
    const myTaste = await getTaste('37i9dQZF1DXaXB8fQg7xif');
    // const playlist = await playlistFinder('party',0);
    if (Object.keys(myTaste)[0] != undefined) {
      console.log(Object.keys(myTaste)[0]);
    }

    let i = 0;
    while (playlistArray.length < 6) {
      const playlist = await playlistFinder('romantic', i);
      console.log('PLAYLIST' + playlist);
      if (Object.keys(myTaste)[0] === Object.keys(playlist)[0]) {
        console.log('MATCH');
        const newP = await spotifyApi.getPlaylist(playlist.id);
        newP['sum'] = playlist.sum;
        playlistArray.push(newP);
        //     //playlistArray.push((await spotifyApi.getPlaylist(Object.keys(playlist)['id'])).body);
      }
      i++;
      //console.log(Object.keys(myTaste)[0]);
      //console.log("PLAYLIST" + Object.keys(playlist)[0]);
    }
    res.send(playlistArray);
  } catch (err) {
    console.log('error' + err);
  }
});

app.get('/mood-boosters', async (req, res) => {
  //var result = await spotifyApi.getUserPlaylists();
  try {
    let playlistArray = [];
    const myTaste = await getTaste('37i9dQZF1DXaXB8fQg7xif');
    // const playlist = await playlistFinder('party',0);
    if (Object.keys(myTaste)[0] != undefined) {
      console.log(Object.keys(myTaste)[0]);
    }

    let i = 0;
    while (playlistArray.length < 6) {
      const playlist = await playlistFinder('happy', i);
      console.log('PLAYLIST' + playlist);
      if (Object.keys(myTaste)[0] === Object.keys(playlist)[0]) {
        console.log('MATCH');
        const newP = await spotifyApi.getPlaylist(playlist.id);
        newP['sum'] = playlist.sum;
        playlistArray.push(newP);
        //     //playlistArray.push((await spotifyApi.getPlaylist(Object.keys(playlist)['id'])).body);
      }
      i++;
      //console.log(Object.keys(myTaste)[0]);
      //console.log("PLAYLIST" + Object.keys(playlist)[0]);
    }
    res.send(playlistArray);
  } catch (err) {
    console.log('error' + err);
  }
});

app.listen(3001);

// export the express app we created to make it available to other modules
// module.exports = app

