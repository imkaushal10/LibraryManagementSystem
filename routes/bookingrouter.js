const express = require('express');
const Booking = require('../models/Booking');
const User= require('../models/User');
const Book = require('../models/Book');
const auth = require('../auth');
const { verifyUser } = require('../auth');


const bookingrouter = express.Router();

bookingrouter.route('/')

.get(verifyUser, (req, res, next)=>{
    Booking.find()
    .then(booking=>{
        res.json(booking);
    }).catch(err=>next(err));
})

.post (auth.verifyUser, (req, res, next)=>{
    let{status} = req.body;
    // let book = req.books.id;
    let user = req.user.id;
    // let book = req.book.id;
    Booking.create({user, status})
    .then(bookings=>{
        res.json(bookings);
    }).catch(err=>next(err));
})

//    .get ((req, res, next)=> {
//       const user = req.user;

//       Booking.where({user})
//       .populate('books')
//       .then (foundBookings=>{
//           return res.json(foundBookings)
//       }).catch(err=>next(err));
//     })
   
    // .post((req, res)=> {
    //     const { status, book } = req.body;
    //     const user = res.locals.user;
      
    //     const booking = new Booking({ status});
      
    //     Book.findById(req.params.id)
    //           .populate('bookings')
    //           .populate('user')
    //           .exec(function(err, foundRental) {
      
    //       if (err) {
    //         return res.status(422).send({errors: normalizeErrors(err.errors)});
    //       }
      
    //       if (foundRental.user.id === user.id) {
    //         return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
    //       }
      
    //       if (isValidBooking(booking, foundRental)) {
    //         booking.user = user;
    //         booking.book = foundRental;
    //         // foundRental.bookings.push(booking);
      
    //         booking.save(function(err) {
    //           if (err) {
    //             return res.status(422).send({errors: normalizeErrors(err.errors)});
    //           }
      
    //           foundRental.save()
    //         //   User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});
      
    //           return res.json({status});
    //         });
    //       } else {
      
    //          return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen books are already taken!'}]});
    //       }
    //     })
    // })
      






module.exports = bookingrouter;