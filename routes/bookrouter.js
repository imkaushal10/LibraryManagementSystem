const express = require('express');
const Book = require('../models/Book');
// const auth = require('../auth');


const bookrouter = express.Router();


bookrouter.route('/')

    .get((req, res, next) =>{
        Book.find()
        .then ((books)=>{
            res.json(books);
        }).catch(next);
    })

    .post((req, res, next)=>{
        // let owner = req.user.id;
        Book.create(req.body)
        .then ((books)=>{
            res.status(201).json(books);
        }).catch(next);
    })

    .put((req, res)=>{
        res.send('Put operation is not supported to /book');
    })

    .delete((req, res, next)=>{  //auth.verifyAdmin
        Book.deleteMany()
        .then((reply)=>{
            res.json(reply);
        }).catch(next);
    });


    //for book/:id
 taskrouter.route('/:id')
    .get((req,res, next) =>{
        Book.findById(req.params.id)
        .then((bookss)=>{
            res.json(books);
        }).catch(next);
    })

    .post((req, res)=>{
    res.status(401).send('Not Allowed');
    })

    .put((req, res, next)=>{
        // res.send(`Will update book: ${req.params.id}`); //paramiterized string (`)=> (tille)
        Book.findById(req.params.id)
    .then((book)=>{
        if(req.body.name) book.name = req.body.name;
          book.save()
        .then((updatedbook)=>{
            res.json(updatedbook);  
        })  
    }).catch(next);
    })

    .delete((req, res, next)=>{
        Book.findByIdAndRemove(req.params.id)
        .then((reply) =>{
            res.json(reply);
        }).catch(next);
    });

module.exports = bookrouter;

