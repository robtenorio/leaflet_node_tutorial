const express = require('express');
const router = express.Router();

// Mongoose Import
const mongoose = require('mongoose');
const dbUri = 'mongodb://localhost:27017/leaflet_node_tutorial'
mongoose.connect(dbUri, {useNewUrlParser: true}, function (error) {
  if (error) {
    console.log(error);
  }
});

// Mongoose Schema Definition
const Schema = mongoose.Schema;
const JsonSchema = new Schema({
  name: String,
  type: Schema.Types.Mixed
});

// Mongoose Model Definition
const Json = mongoose.model('JString', JsonSchema, 'layercollection');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET json data */
router.get('/mapjson/:name', function (req, res) {
  if (req.params.name) {
  Json.findOne({ name: req.params.name }, {}, function (err, docs) {
      res.json(docs);
    });
  }
});

/* GET layers json data. */
router.get('/maplayers', function (req, res) {
  Json.find({},{'name': 1}, function(err, docs) {
    res.json(docs);
  });
});

/* GET Map page. */
router.get('/map', function (req, res) {
  Json.find({},{}, function(e, docs) {
    res.render('map', {
      "jmap" : docs,
      lat : 40.78854,
      lng : -73.96374
    });
  });
});

module.exports = router;
