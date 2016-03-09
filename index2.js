var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var models = require('./sightings2.js');
var Sighting = models.Sighting;
var User = models.User;
var port = 8000;
var app = express();
mongoose.connect('mongodb://localhost/birds3');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});
mongoose.set('debug', true);
var ObjectId = mongoose.Schema.ObjectId;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/users', function (req, res) {
  User.create(req.body, function(err, resp){
    return err ? res.status(500).json(err) : res.json(resp);
  });
});

//here is a userid
//56e07138f5658733e5d0b545
//some junk to push to database is in the sightings2 file

app.post('/api/sighting', function (req, res) {
  Sighting.create(req.body, function(err, resp){
    return err ? res.status(500).json(err) : res.json(resp);
  });
});

app.get('/api/sighting', function (req, res) {
    Sighting
      .find()
      .populate('user', 'username')
      .exec(function (err, resp) {
        return  err ? res.status(500).json(err) : res.status(200).json(resp);
      });
});

app.get('/api/sighting/:id', function (req, res) {
  var id = req.params.id;
    Sighting
      .find({user: id})
      .populate('user', 'username')
      .exec(function (err, resp) {
        return  err ? res.status(500).json(err) : res.status(200).json(resp);
      });
});

app.put('/api/sighting', function (req, res) {
    var id = req.query.id;
    collection.update({'_id' : ObjectID(id)}, {
        name: req.body.name,
        order: req.body.order,
        status: req.body.status
    }, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
    });

});

app.delete('/api/sighting', function (req, res) {
    var id = req.query.id;
    Sighting.remove({_id: id}, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
    });

});

app.listen(port, function () {
    console.log('Listening on port: ' + port);
});
