/**
 * The index class
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var dbinit = require('./dbinit');

mongoose.connect('mongodb://localhost/notflix');

//import film router
var filmResource = require("./resources/filmresource.js");
app.use('/api/films', filmResource);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

/**
 * standard get to ensure setup went OK
 */
app.get('/', function (req, res) {
    res.send('Hello World!');
});
