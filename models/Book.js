const mongoose = require('mongoose');


const ReservationStatus = ['Pending', 'Completed'];

const bookingSchema = mongoose.Schema({
    book:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    booked_by:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required : true
    }],
    status:{
        type: String,
        enum: ReservationStatus,
        default: "Pending"
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
    numberofpages:{
        type: String,
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
    
    },
    image:{
        type:String
    }
},{timestamps: true});

module.exports = mongoose.model('Book', bookSchema);