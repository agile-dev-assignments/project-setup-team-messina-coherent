const mongoose = require('mongoose');
require('dotenv').config();

//using mongoose models
//This is the schema or the model of the data entry objects 
//so each User will have a username, userid and an array of playlists 
const UserSchema = mongoose.Schema({
  username: String,
  userid: String,
  //Are arrays a valid type?
   
  //The playlists aren't needed inside the schema of the documents since we really only need the 
  //username and userid
  //playlists: Array
});

const user =mongoose.model('User', UserSchema);
module.exports= user;