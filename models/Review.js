const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);

