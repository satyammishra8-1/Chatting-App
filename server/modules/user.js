const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    },
    securePin: {
    type: String,
    default: "1234"
    },
    pinPopupShown: {
    type: Boolean,
    default: false
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true,
        select:true,
        minlength: 8
    },
    profilePic: {
    type: String,
    default: ""
    },
    preferredLanguage: {
    type: String,
    default: "en"
    },
    },
    {
     timestamps: true
     }
);

module.exports = mongoose.model('users', userSchema);