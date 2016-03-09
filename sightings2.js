var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var birdSchema = mongoose.Schema({
      name: {type: String, lowercase: true},
      order: {type: String, lowercase: true, maxlength: 20},
      status: {type: String,
              lowercase: true,
              enum: [
                  "extinct",
                  "near threatened",
                  "least concern"
                ]
              }
});

var userSchema = mongoose.Schema({
      email: {type: String},
      username: {type: String},
      level: {type: Number},
      location: {type: String},
      member: {type: Boolean, default: false}
});

var sightingSchema = mongoose.Schema({
      user: {type: ObjectId, ref: 'User'},
      birds: [birdSchema],
      confirmed: {type: Boolean, default: false},
      numberSeen: {type: Number, min: 1}
});

module.exports = {
  Sighting: mongoose.model('Sighting', sightingSchema),
  User: mongoose.model('User', userSchema)
};

// {
//   "email": "da.swamp@crocs.com",
//   "username": "ridnick1",
//   "level": 2,
//   "location": "Louisiana",
//   "member": false
// }

// {
//   "user": "56e07138f5658733e5d0b545",
//   "birds": {
//     "name": "bird",
//     "order": "crazyBird",
//     "status": "least concern"},
//   "confirmed": "true",
//   "numberSeen": "2"
// }

// {
//   "user": "56e07138f5658733e5d0b545",
//   "birds": [{
//     "name": "bird",
//     "order": "crazyBird",
//     "status": "least concern"},
//     {
//       "name": "22",
//       "order": "crazy22111Bird",
//       "status": "least concern"}],
//   "confirmed": "true",
//   "numberSeen": "2"
// }
