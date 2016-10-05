/**
 * Created by Sander on 3-10-2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Chat = require('../model/chat.js');

router.get("/", function (reg, res) {
    console.log("chatresource")
    //find alles gesorteerd op date
    Chat.find({}, {username: 1, message: 1, data: 1}).sort({date: -1}).exec(function (err, chats) {
        if (err) {
            res.status(500).json({'error': 'Could not load chat messages from database'});
            return
        }

        res.status(200).json(chats)
    })
});

router.post("/", function (req, res) {
    var token = req.headers('authorization');
    jwt.verify(token, req.app.get('private-key')), function (err, decoded) {
        if (err) {
            req.status(401).json({error: 'invalide autentication'});
        } else {
            console.log(decoded.username);
            res.sendStatus(201);

            var newPost = new Chat({username: decoded.username, message: req.body.message});
            newPost.save(function (err, result) {
                if (err) {
                    res.status(400).json({'error': err.message});
                    return
                }

                res.status(201).json({'postid': result._id});
            });

        }
    }
});

module.exports = router;