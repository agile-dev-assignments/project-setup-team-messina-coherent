const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
//Access token
const token='';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

function getMyData(){
    (async()=>{
        const me = await spotifyApi.getMe();
        console.log(me.body);
        // getUserPlaylists(me.body.id);
    })().catch(e=>{
        console.log(e);
    });
}

getMyData();