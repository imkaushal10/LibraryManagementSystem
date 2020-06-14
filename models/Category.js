const mongoose = require('mongoose');
const Book = require('./Book');

const bookFormat = ['Hardcover','Magazine', 'Journal'];

const categorySchema = mongoose.Schema({
    format:{
        type: String,
        enum: bookFormat,
        required: true
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
},{timestamps: true})

module.exports = mongoose.model('Category', categorySchema); 

