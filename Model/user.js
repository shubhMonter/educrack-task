const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

},{timestamps:true}); 

const User = mongoose.model('user',UserSchema);
module.exports = User;