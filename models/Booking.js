const mongoose = require('mongoose');

const ReservationStatus = ['Pending', 'Completed'];

const bookingSchema = mongoose.Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        enum: ReservationStatus
    }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);