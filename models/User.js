const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true  
    },
    role:{
        type: String,
        enum:['basic','admin'],
        default: 'basic'
    }
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);
