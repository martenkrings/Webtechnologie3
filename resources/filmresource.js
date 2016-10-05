/**
 * Created by Marten on 10/5/2016.
 */
var express = require('express');
var router = express.Router();
var Film = require('../model/film.js');

router.get('/', function(req, res){
    console.log('films');
    Film.find
});

module.exports = router;