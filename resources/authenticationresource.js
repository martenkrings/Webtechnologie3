/**
 * Created by Sander on 5-10-2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require("../model/user.js");

/**
 * Gives a token after checking user credentials
 */
router.post('/', function (req, res) {
    //get the given username from the body
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({'username': username }, function (err, user) {
        if (err) {
            res.status(500).json({'error': 'Could not load user from database.'});
        } else {
            if (user.password == password) {
                var token = jwt.sign({username: req.body.username}, req.app.get('private-key'), {
                    expiresIn: 1440
                });
                res.status(201).json({token: token});
            } else {
                res.status(401).json({'error': 'Invalid Credentials'});
            }
        }
    });
});

module.exports = router;