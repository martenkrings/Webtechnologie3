/**
 * The index class
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

app.set('private-key', 'nobodyshouldknow');

var dbinit = require('./dbinit');

mongoose.connect('mongodb://localhost/notflix');

//import film router
var filmResource = require("./resources/filmresource.js");
app.use('/api/films', filmResource);

//import user router
var userResource = require("./resources/userresource.js");
app.use("/api/users", userResource);

//import autentication router
var authenticationResource = require("./resources/authenticationresource.js");
app.use("/api/authenticate", authenticationResource);


app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

/**
 * standard get to ensure setup went OK
 */
app.get('/', function (req, res) {
    res.send('Hello World!');
});
