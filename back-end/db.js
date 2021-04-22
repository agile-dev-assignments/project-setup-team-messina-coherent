const mongoose = require('mongoose');

//using mongoose models
//This is the schema or the model of the data entry objects 
//so each User will have a username, userid and an array of playlists 
const UserSchema = mongoose.Schema({
  username: String,
  userid: String,
  //Are arrays a valid type?
  playlists: Array
});

mongoose.model('User', UserSchema);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/hw08', (err, database) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('Connected to database'); 
    
  }
});