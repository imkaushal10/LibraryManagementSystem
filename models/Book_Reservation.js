const mongoose = require('mongoose');

const ReservationStatus = ['Pending', 'Completed'];

const book_reservationSchema = mongoose.Schema({
    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        enum: ReservationStatus
    }
}, {timestamps: true});

module.exports = mongoose.model('Book_Reservation', book_reservationSchema);