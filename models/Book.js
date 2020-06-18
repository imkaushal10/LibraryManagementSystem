const mongoose = require('mongoose');

const bookStatus = ['Available', 'Reserved'];
const bookFormat = ['Hardcover', 'Journal', 'Magazine'];

const bookSchema = new mongoose.Schema({
     title:{
        type: String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    numberofpages:{
        type: String,
        required: true
    },
    format:{
        type: String,
        emun: bookFormat,
        default: "Hardcover",
        required: true
    },
    status:{
        type: String,
        enum: bookStatus,
        default: "Available",
        required: true
    },
    published_year:{
        type: String,
        required: true 
    },
    image:{
        type:String
    }
},{timestamps: true});

module.exports = mongoose.model('Book', bookSchema);