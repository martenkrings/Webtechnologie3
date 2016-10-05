/**
 * Created by Sander on 3-10-2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var chatSchema = new schema({
    username: {type: String, require: true},
    message: {type:String, require: true},
    date: {type: Date, default: Date.now, require: true}
});

module.exports = mongoose.model('Chat', chatSchema);