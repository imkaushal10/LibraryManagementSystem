const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: number
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Rating', ratingSchema);

