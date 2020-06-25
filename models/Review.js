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
    description: {
        type: string
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);

