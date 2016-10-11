/**
 * Created by Marten on 10/5/2016.
 */
var mongoose = require('mongoose');

var filmSchema = new mongoose.Schema({
    ttNumber: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    date: {type: String, required: true},
    length: {type: Number, min: 0, required: true},
    director: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Film', filmSchema);