var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type:String, required: true,unique: true},
    password: {type:String, required: true}
},
{collection:'users'})

var model = mongoose.model('userSchema',userSchema);
module.exports = model;