/**
 * Created by Marten on 10/5/2016.
 */
var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    ttNumber: {type: String, required: true},
    rating: {type: Number, min: 0.5, max: 5, required: true}
});

module.exports = mongoose.model('Rating', ratingSchema);