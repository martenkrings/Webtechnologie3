/**
 * Created by Sander on 6-10-2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../model/user');
var Film = require('../model/film.js');
var Rating = require('../model/rating');

var result = [];
var filmsProgressed = 0;

// var myCallBack = function (err, data, numberOfFilms, res) {
//     if (err) throw err;
//     result.push(data);
//     filmsProgressed++;
//     if (filmsProgressed == numberOfFilms) {
//         //send the result
//         console.log("RESULT = " + result);
//         res.contentType('application/json');
//         res.status(200).send(JSON.stringify(result));
//     }
// };
//
// var calculate = function (callback, i, filmProgressed, numberOfFilms, res) {
//     Rating.find({ttNumber: filmProgressed.ttNumber}, function (err, ratings) {
//         if (err) {
//             res.status(400).json({error: "Could not find ratings"})
//         } else {
//             //calculate the average
//             var average = 0;
//
//             for (var j = 0; j < ratings.length; j++) {
//                 average = average + ratings[j].rating;
//             }
//
//             average = average / j;
//             console.log("average: " + average);
//
//             var filmWithAverage = {film: filmProgressed, averageRating: average};
//             console.log("filmWithAverage: " + filmWithAverage);
//             // result[i] = filmWithAverage;
//             console.log(result[i]);
//             callback(null, filmWithAverage, numberOfFilms, res);
//         }
//     });
// };

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
                    var numberOfFilms = filmResult.length;

                    var myCallBack = function (err, data, numberOfFilms, res) {
                        if (err) throw err;
                        result.push(data);
                        filmsProgressed++;
                        if (filmsProgressed == numberOfFilms) {
                            //send the result
                            console.log("RESULT = " + result);
                            res.contentType('application/json');
                            res.status(200).send(JSON.stringify(result));
                        }
                    };

                    var calculate = function (callback, i, filmProgressed, numberOfFilms, res) {
                        Rating.find({ttNumber: filmProgressed.ttNumber}, function (err, ratings) {
                            if (err) {
                                res.status(400).json({error: "Could not find ratings"})
                            } else {
                                //calculate the average
                                var average = 0;

                                for (var j = 0; j < ratings.length; j++) {
                                    average = average + ratings[j].rating;
                                }

                                average = average / j;
                                console.log("average: " + average);

                                var filmWithAverage = {film: filmProgressed, averageRating: average};
                                console.log("filmWithAverage: " + filmWithAverage);
                                // result[i] = filmWithAverage;
                                console.log(result[i]);
                                callback(null, filmWithAverage, numberOfFilms, res);
                            }
                        });
                    };

                    console.log("axafaf");
                    for (var i = 0; i < numberOfFilms; i++) {
                        calculate(myCallBack, i, filmResult[i], numberOfFilms, res);
                    }
                }
            })

        }
    });
});

// function getGemiddeldeRating(callback, film, foundTtNumber) {
//     Rating.find({ttNumber: foundTtNumber}, function (err, ratings) {
//         if (err) {
//             res.status(400).json({error: "Could not find ratings"})
//         } else {
//             //calculate the average
//             var average = 0;
//             var numberOfRatings = 0;
//
//             for (var j = 0; j < ratings.length; j++) {
//                 average = average + ratings[j].rating;
//             }
//
//             average = average / j;
//             console.log("average: " +
//                 "" + average);
//             console.log("film: " + film);
//
//             var filmWithAverage = {film: film, averageRating: average};
//             // var filmWithAverage = {ttNumber: film.ttNumber, title: film.title, date: film.date, length: film.length, director: film.director, description: film.description, averageRating: average};
//             console.log("filmWithAverage: " + filmWithAverage);
//             callback();
//             return filmWithAverage;
//         }
//     });
// }

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