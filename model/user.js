/**
 * Created by Marten on 10/5/2016.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: {type: Number, min: 0, require: true, unique: true},
    name: {
        first: {type: String, require: true},
        insertion: {type: String, require: false},
        last: {type: String, require: true}
    },
    username: {type: String, require: true, unique:true},
    password: {type: String, require: true}
});

module.exports = mongoose.model('User', userSchema);