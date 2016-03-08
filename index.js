var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Sighting = require('./sightings.js');
var port = 8080;
var app = express();
mongoose.connect('mongodb://localhost/birds2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});
mongoose.set('debug', true);
var ObjectId = mongoose.Schema.ObjectId;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/sighting', function (req, res) {
  var sighting = new Sighting(req.body);
  sighting.save(function(err, resp){
    return err ? res.status(500).json(err) : res.json(resp);
  });
});

app.get('/api/sighting', function (req, res) {
    var confirmed = req.query.confirmed;
    var search = {};
    if (req.query) {
        search.confirmed = confirmed;
    }
    Sighting.find(search, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
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
