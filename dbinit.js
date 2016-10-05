/**
 * Created by Marten on 10/5/2016.
 */
var Film = require('./model/film.js');
var User = require('./model/user.js');

Film.remove({}, function(err) {
    console.log('films removed')
});

User.remove({}, function(err) {
   console.log('users removed')
});

var f1 = Film({
    ttNumber: "tt03877808",
    title: "Idiocracy",
    date: "2006/01/25",
    length: 84,
    director: "Mike Judge",
    description: "Private Joe Bauers, the definition of \"average American\", is selected by the Pentagon to be the guinea pig for a top-secret hibernation program. Forgotten, he awakes five centuries in the future. He discovers a society so incredibly dumbed down that he's easily the most intelligent person alive."
});

f1.save(function(err) {
    if (err) throw err;

    console.log('film1 created');
});

var f2 = Film({
    ttNumber: "tt0371724",
    title: "The Hitchhiker's Guide to the Galaxy",
    date: "2005/08/04",
    length: 109,
    director: "Garth Jennings",
    description: "Mere seconds before the Earth is to be demolished by an alien construction crew, journeyman Arthur Dent is swept off the planet by his friend Ford Prefect, a researcher penning a new edition of \"The Hitchhiker's Guide to the Galaxy.\""
});

f2.save(function(err) {
    if (err) throw err;

    console.log('film2 created');
});

var f3 = Film({
    ttNumber: "tt0119654",
    title: "Men in Black",
    date: "1997/07/24",
    length: 98,
    director: "Barry Sonnenfeld",
    description: "A police officer joins a secret organization that polices and monitors extraterrestrial interactions on Earth."
});

f3.save(function(err) {
    if (err) throw err;

    console.log('film3 created');
});

module.exports = this;