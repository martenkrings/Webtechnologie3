/**
 * Created by Sander on 6-10-2016.
 */
var express = require('express');
var router = express.router;
var jwt = require('jsonwebtoken');
var User = require('../model/user');
var Film = require('../model/film.js');
var Rating = require('../model/rating');

/**
 * post request to change a rating, get the new rating and film from the body
 */
router.post("/change", function (req, res) {
    //check authorization
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "invalide authentication"})
        } else {
            //find the given film
            var filmFound;
            Film.find({title: req.body.title}, function (err, film) {
                if (err) {
                    res.status(400).json({error: "No such film found"})
                } else {
                    filmFound = film;
                }
            });

            //find the user
            User.find({username: decoded.username}, function (err, user) {
                if (err) {
                    res.status(400).json({'error': err.message});
                } else {
                    //find the rating
                    Rating.find({userid: user._id, ttNumber: filmFound.ttNumber}, function (req, rating) {

                        //change the rating
                        rating.setAttribute('rating', req.body.rating);
                        //save the new rating
                        rating.save(function (err, result) {
                            if (err) {
                                res.status(400).json({error: "Could not save new rating"});
                            } else {
                                res.status(201).json({result: "New rating saved"});
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;