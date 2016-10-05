/**
 * Created by Marten on 10/5/2016.
 */
var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    userId: {type: Number, require: true},
    ttNumber: {type: String, require: true},
    rating: {type: Number, min: 0.5, max: 5, require: true}
});

module.exports = mongoose.model('Rating', ratingSchema);