const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const Review = require('../models/Review');
const auth = require('../auth');


const reviewrouter = express.Router();


reviewrouter.route('/')

    .get((req, res, next) =>{
        Review.find() //user: req.user.id
        .then ((reviews)=>{
            res.json(reviews);
        }).catch(next);
    })

    // .post((req, res, next)=>{
    //     let{name , done} = req.body;
    //     let owner = req.user.id;
    //     Task.create({name, done, owner})
    //     .then ((tasks)=>{
    //         res.status(201).json(tasks);
    //     }).catch(next);
    // })
    .post((req, res, next)=>{
        let {description} = req.body;
        // let book_id = req.book.id;
        let user_id = req.User.id;
        Review.create({description})
        .then ((reviews)=>{
            res.status(201).json(reviews);
        }).catch(next);
    })

    .put((req, res)=>{
        let message = req.user.id;
        res.send(message);
    })

    .delete((req, res, next)=>{
        Review.deleteMany()
        .then((reply)=>{
            res.json(reply);
        }).catch(next);
    });


//     //for task/:id
//  taskrouter.route('/:id')
//     .get((req,res, next) =>{
//         Task.findById(req.params.id)
//         .then((tasks)=>{
//             res.json(tasks);
//         }).catch(next);
//     })

//     .post((req, res)=>{
//     res.status(401).send('Not Allowed');
//     })

//     .put((req, res, next)=>{
//         // res.send(`Will update task: ${req.params.id}`); //paramiterized string (`)=> (tille)
//         Task.findById(req.params.id)
//     .then((task)=>{
//         if(req.body.name) task.name = req.body.name;
//         if(req.body.done) task.done = req.body.done;

//         task.save()
//         .then((updatedtask)=>{
//             res.json(updatedtask);  
//         })  
//     }).catch(next);
//     })

//     .delete((req, res, next)=>{
//         Task.findByIdAndRemove(req.params.id)
//         .then((reply) =>{
//             res.json(reply);
//         }).catch(next);
//     });


module.exports = reviewrouter;

