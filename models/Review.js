const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);

