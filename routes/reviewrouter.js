const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const Review = require('../models/Review');
const auth = require('../auth');


const reviewrouter = express.Router();


reviewrouter.route('/')

    .get((req, res, next) =>{
        Review.find() //user: req.user.id
        .populate('user', '_id email')
        .then ((reviews)=>{
            res.json(reviews);
        }).catch(next);
    })

    .post(auth.verifyUser, (req, res, next)=>{
        let {description} = req.body;
        let user = req.user.id;
        
        Review.create({user, description})
        // .populate('users')
        .then ((reviews)=>{
            res.status(201).json(reviews);
        }).catch(next);
    })

    .delete((req, res, next)=>{
        Review.deleteMany()
        .then((reply)=>{
            res.json(reply);
        }).catch(next);
    });


    //for review/:id
 reviewrouter.route('/:id')
    .get((req,res, next) =>{
        Review.findById(req.params.id)
        .then((tasks)=>{
            res.json(tasks);
        }).catch(next);
    })

    .post((req, res)=>{
    res.status(401).send('Not Allowed');
    })

    .put((req, res, next)=>{
        // res.send(`Will update task: ${req.params.id}`); //paramiterized string (`)=> (tille)
        Review.findById(req.params.id)
    .then((review)=>{
        if(req.body.description) review.description = req.body.description;
        review.save()
        .then((updatedreview)=>{
            res.json(updatedreview);  
        })  
    }).catch(next);
    })

    .delete((req, res, next)=>{
        Review.findByIdAndRemove(req.params.id)
        .then((reply) =>{
            res.json(reply);
        }).catch(next);
    });


module.exports = reviewrouter;

