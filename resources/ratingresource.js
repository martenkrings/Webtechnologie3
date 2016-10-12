/**
 * Created by Sander on 6-10-2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../model/user');
var Film = require('../model/film.js');
var Rating = require('../model/rating');

/**
 * Get request that gets all movies with their average rating
 */
router.get("/", function (req, res) {
    //check authorization
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "invalide authentication"});
        } else {

            //find all films
            Film.find({}).exec(function (err, filmResult) {
                if (err) {
                    res.status(400).json({error: "Could not find films in databse"})
                } else {
                    var result = [];
                    var filmsProgressed = 0;
                    var numberOfFilms = filmResult.length;

                    //callback function so we are sure this code is executed last
                    var myCallBack = function (err, data) {
                        if (err) throw err;

                        //add data to result
                        result.push(data);

                        //number of fils progressed + 1
                        filmsProgressed++;

                        //if we have had all films than send the collected data
                        if (filmsProgressed == numberOfFilms) {
                            //send the result
                            res.contentType('application/json');
                            res.status(200).send(JSON.stringify(result));
                        }
                    };

                    //function that puts together a film and its average rating, calls a callback
                    var calculate = function (callback, i) {
                        Rating.find({ttNumber: filmResult[i].ttNumber}, function (err, ratings) {
                            if (err) {
                                res.status(400).json({error: "Could not find ratings"})
                            } else {
                                var average = 0;

                                //get the total rating
                                for (var j = 0; j < ratings.length; j++) {
                                    average = average + ratings[j].rating;
                                }

                                //calculate the average
                                average = average / j;

                                //put together film and average
                                var filmWithAverage = {film: filmResult[i], averageRating: average};

                                //send data to callback
                                callback(null, filmWithAverage, numberOfFilms, res);
                            }
                        });
                    };

                    for (var i = 0; i < numberOfFilms; i++) {
                        //start a function with a callback, als gives i for reliability
                        calculate(myCallBack, i);
                    }
                }
            })

        }
    });
});

router.post('/addRating', function (req, res) {
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "Forbidden"})
        } else if (req.body.rating > 5 || req.body.rating < 0.5 || !(req.body.rating % .5) == 0) {
            res.status(400).json({error: "Bad Request"});
        } else {
            User.findOne({username: decoded.username}, function (dbUserErr, user) {
                if (dbUserErr) {
                    res.status(400).json({error: "Bad Request"})
                } else {
                    var newRating = Rating({
                        userId: user._id,
                        ttNumber: req.body.ttNumber,
                        rating: req.body.rating
                    })

                    newRating.save(function (err, result) {
                        if (err) {
                            res.status(400).json({'error': err.message});
                            return
                        }
                        res.status(201).json({'id': newRating._id});
                    })
                }
            })
        }
    });
});

/**
 * Get request that gets all the users ratings
 */
router.get("/myRatings", function (req, res) {
    //check authorization
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "invalide authentication"})
        } else {
            User.find({username: decoded.username}, function (userErr, user) {
                if (userErr) {
                    res.status(400).json({error: "No such user found"})
                } else {
                    Rating.find({userId: user._id}, function (err, result) {
                        if (err) {
                            res.status(400).json({error: "error finding ratings"})
                        } else {
                            res.status(200).json(result);
                        }
                    })
                }
            })
        }
    })
});

/**
 * post request to change a rating, get the new rating and film from the body
 */
router.put("/change", function (req, res) {
    //check authorization
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "invalide authentication"});
        } else {
            //find the user
            User.findOne({username: decoded.username}, function (err, user) {
                if (err) {
                    res.status(400).json({'error': err.message});
                } else {
                    Rating.update({
                        userId: user._id,
                        ttNumber: req.body.ttNumber
                    }, {'$set': {rating: req.body.rating}}, function (err) {
                        if (err) {
                            res.status(400).json({'error': err.message});
                        } else {
                            res.status(200).send("Data changed");
                        }
                    });
                }
            });
        }
    });
});

/**
 * Delete request to delete a rating, gets the movie ttNumber from the body
 */
router.delete('/delete', function (req, res) {
    //check authorization
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "invalide authentication"});
        } else {
            User.find({username: decoded.username}, function (err, user) {
                if (err) {
                    res.status(400).json({error: "Could not find user in the database"});
                } else {
                    Rating.find({userId: user._id, ttNumber: req.body.ttNumber}, function (err, rating) {
                        Rating.remove({_id: rating._id}, function (err) {
                            if (err) {
                                res.status(422).json({error: "Could not delete rating"})
                            } else {
                                res.status(200).json({result: "Rating removed"})
                            }
                        })
                    })
                }
            });
        }
    });
});

router.get('/all', function (req, res) {
    console.log('films');
    Rating.find({}).exec(function (err, films) {
        if (err) {
            res.status(500).json({'error': 'Could not load films from database'});
            return
        }
        res.status(200).json(films)
    });
});

module.exports = router;