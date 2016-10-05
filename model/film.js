/**
 * Created by Marten on 10/5/2016.
 */
var mongoose = require('mongoose');

var filmSchema = new mongoose.Schema({
    ttNumber: {type: String, require: true, unique: true},
    title: {type: String, require: true},
    date: {type: String, require: true},
    length: {type: Number, min: 0, require: true},
    director: {type: String, require: true},
    description: {type: String, require: true}
});

module.exports = mongoose.model('Film', filmSchema);