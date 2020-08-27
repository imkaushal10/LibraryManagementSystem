const mongoose = require('mongoose');


const ReservationStatus = ['Pending', 'Completed'];

const bookingSchema = mongoose.Schema({
    booked_by:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required : true
    }],
    booking_date:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true});



const bookStatus = ['Available', 'Reserved'];
const bookFormat = ['Hardcover', 'Journal', 'Magazine'];

const bookSchema = new mongoose.Schema({
    bookings: [bookingSchema],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review' 
    }],
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
    format:{
        type: String,
        emun: bookFormat,
        default: "Hardcover"
    
    },
    status:{
        type: String,
        enum: bookStatus,
        default: "Available",

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