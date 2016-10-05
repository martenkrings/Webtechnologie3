/**
 * The index class
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

app.set('private-key', 'nobodyshouldknow');

//set up mongoose db connection
mongoose.connect('mongodb://localhost/chat');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

//import chat router
var chatResource = require("./resources/chatresource.js");
app.use('/api/chats', chatResource);

var authenticationresource = require("./resources/authenticationresource.js");
app.use("/api/authenticate", authenticationresource);

/**
 var db = {
    movies: [
        {
            ttNumber: "tt03877808",
            title: "Idiocracy",
            date: "2006/01/25",
            length: 84,
            director: "Mike Judge",
            desc: "Private Joe Bauers, the definition of \"average American\", is selected by the Pentagon to be the guinea pig for a top-secret hibernation program. Forgotten, he awakes five centuries in the future. He discovers a society so incredibly dumbed down that he's easily the most intelligent person alive."
        },
        {
            ttNumber: "tt0371724",
            title: "The Hitchhiker's Guide to the Galaxy",
            date: "2005/08/04",
            length: 109,
            director: "Garth Jennings",
            desc: "Mere seconds before the Earth is to be demolished by an alien construction crew, journeyman Arthur Dent is swept off the planet by his friend Ford Prefect, a researcher penning a new edition of \"The Hitchhiker's Guide to the Galaxy.\""
        },
        {
            ttNumber: "tt0119654",
            title: "Men in Black",
            date: "1997/07/24",
            length: 98,
            director: "Barry Sonnenfeld",
            desc: "A police officer joins a secret organization that polices and monitors extraterrestrial interactions on Earth."
        }],
    users: [
        {
            id: 1,
            lastName: "Groot Wesseldijk",
            insertion: "",
            firstName: "Sander",
            username: "heuker",
            password: "password1"
        },
        {id: 2, lastName: "Krings", insertion: "", firstname: "Marten", username: "zixue", password: "password2"}
    ],

    ratings: [
        {userId: 1, rating: 5, movieTtNumber: "tt0119654"},
        {userId: 2, rating: 3, movieTtNumber: "tt0119654"}
    ]
};
 */

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

/**
 * standard get to ensure setup went OK
 */
app.get('/', function (req, res) {
    res.send('Hello World!');
});