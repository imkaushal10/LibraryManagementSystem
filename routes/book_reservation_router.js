const express = require('express');
const Book_Reservation = require('../models/Book_Reservation');
const User= require('../models/User');
const Book = require('../models/Book');


const book_reservation_router = express.Router();

book_reservation_router.route('/')
.post((req, res, next)=>{
    // Book_Reservation.create()
    // .populate('books')
    // .populate('users')
    // .then(reservations=>{
    //     res.json(reservations);
    // }).catch(err=>next(err)); 
})




module.exports = book_reservation_router;