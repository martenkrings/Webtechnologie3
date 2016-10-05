/**
 * Created by Sander on 5-10-2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/', function (req, res) {
    //get the given username from the body
    var username = req.body.username;

    //TODO here comes the code that checks if the provided credentails are correct!

    var token = jwt.sign({username: req.body.username}, req.app.get('private-key'), {
        expiresIn: 1440
    });

    //send the token back
    res.status(201).json({token: token});

});

module.exports = router;