/**
 * Created by Sander on 5-10-2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require("../model/user.js");

/**
 * Get a user by giving an id, requires authorization
 */
router.get("/:id", function (req, res) {
    //check authorization
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: 'invalide authentication'});
        } else {
            //get the id parameter
            var id = req.params.id;

            //find the user with the matching id
            User.find({'_id': id }, function (err, user) {
                if (err) {
                    req.status(500).json({'error': 'Could not load user from database.'});
                } else {
                    res.status(200).json(user);
                }
            });
        }
    })
});

/**
 * Register a new user, by adding it to the database using the information provided in the body of the request.
 */
router.post("/register", function (req, res) {
    var newUser = User({
        name: {
            first: req.body.firstname,
            insertion: req.body.insertion,
            last: req.body.lastname
        },
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function (err, result) {
        if (err) {
            res.status(400).json({'error': err.message});
            return
        }

        res.status(201).json({'userid': result._id});
    });
});

/**
 * Get all users, requires authorization
 */
router.get("/", function (req, res) {
    //check authorization
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "invalide authentication"});
        } else {
            //find all users and send them
            User.find(function (err, users) {
                if (err) {
                    res.status(500).json({error: "Could not load users from database"});
                } else {
                    res.status(200).json(users);
                }
            })
        }
    });
});

module.exports = router;