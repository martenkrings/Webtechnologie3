/**
 * Created by Marten on 10/5/2016.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        first: {type: String, required: true},
        insertion: {type: String, required: false},
        last: {type: String, required: true}
    },
    username: {type: String, required: true, unique :true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);