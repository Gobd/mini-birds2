var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var sightingSchema = mongoose.Schema({
    user: ObjectId,
    bird: [{
        name: {type: String, lowercase: true},
        order: {type: String, lowercase: true, maxlength: 20},
        status: {type: String,
                lowercase: true,
                 enum: [
                    "extinct",
                    "near threatened",
                    "least concern"
                  ]}
      }],
    confirmed: {type: Boolean, default: false},
    numberSeen: {type: Number, min: 1}
  });

module.exports = mongoose.model('Sighting', sightingSchema);

// {
//     "user": "56df248f9c738482cf7f3172",
//     "bird": [{
//         "name": "hello",
//         "order": "birdy",
//         "status": "extinct"
//       }],
//     "confirmed": "true",
//     "numberSeen": 1
//   }
