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
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: 'invalide authentication'});
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

//////////////////////////Waarom moet je ingelogt zijn om je te kunnen registreren???
router.post("/adduser", function (req, res) {
    var token = req.header('authorization');
    jwt.verify(token, req.app.get('private-key')), function (err, decoded) {
        if (err) {
            req.status(401).json({error: 'invalide autentication'});
        } else {
            console.log(decoded.username);
            res.sendStatus(201);

            var newUser = User({name: {
                first: req.body.name.first,
                insertion: req.body.name.insertion,
                last:req.body.name.last} ,
                username: req.body.username,
                password: req.body.password});

            newUser.save(function (err, result) {
                if (err) {
                    res.status(400).json({'error': err.message});
                    return
                }

                res.status(201).json({'postid': result._id});
            });

        }
    }
});

router.get("/", function (req, res) {
    var token = req.header("authorization");
    jwt.verify(token, req.app.get('private-key'), function (err, decoded) {
        if (err) {
            res.status(401).json({error: "invalide authentication"});
        } else {
            User.find().exec(function (err, users) {
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