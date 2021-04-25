const mongoose = require('mongoose');
require('dotenv').config();

//using mongoose models
//This is the schema or the model of the data entry objects 
//so each User will have a username, userid and an array of playlists 
const UserSchema = mongoose.Schema({
  username: String,
  userid: String,
  //Are arrays a valid type?
  playlists: Array
});

module.exports=mongoose.model('User', UserSchema);


// let urlm =`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.jubh3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

// mongoose.connect(urlm, (err, database) => {
//   if (err) {
//     return console.log(err);
//   } else {
//     console.log('Connected to database'); 
    
//   }
// });

/*
Stuff for adding playlist
*/
// db.Post.findByIdAndUpdate(req.params["id"], {
//   "$push": {
//      comments: req.body["comment"]
//   }
// }, {
//   "new": true
// },
// (err, docs) => {
//   if (err) {
//      res.json({
//         "error": "The comment was not successfully added."
//      });
//   } else {
//      res.json({
//         "message": "Change was successful",
//         "docs": docs
//      });
//   }
// }
// );
