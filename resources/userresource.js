/**
 * Created by Sander on 5-10-2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require("../model/user.js");

/**
 * Get a user by giving an id
 */
router.get("/:id", function (req, res) {
    var token = req.header("authorization");
    console.log(token);
    jwt.verify(token, req.app.get('private-key'), function(err, decoded) {
        if (err) {
            req.status(401).json({error: 'invalide autentication'});
        } else {
            var id = decoded.id;
            User.find(id, function (err, user) {
                if (err) {
                    req.status(500).json({'error': 'Could not load user from database. User might not exist!'});
                } else {
                    res.status(200).json(user);
                }
            });
        }
    })
});

module.exports = router;