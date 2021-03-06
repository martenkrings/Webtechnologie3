/**
 * Created by Marten on 10/5/2016.
 */
var express = require('express');
var router = express.Router();
var Film = require('../model/film.js');

/**
 * Get request that gets all films from the database
 */
router.get('/', function(req, res){
    //find all fils in the database
    Film.find({}).exec(function(err, films){
        if (err) {
            res.status(400).json({'error': 'Could not load films from database'});
            return
        }
        res.status(200).json(films)
    });
});

module.exports = router;