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


    //for task/:id
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

// //for notes
// taskrouter.route('/:taskid/notes')
//     .get((req, res, next)=>{
//         Task.findById(req.params.taskid)
//         .then(task=>{
//             res.json(task.notes);
//         }).catch(err => next(err));
//     })

//     .post((req, res, next) =>{
//         Task.findById(req.params.taskid)
//         .then(task =>{
//             task.notes.push(req.body);
//             task.save()
//             .then(updatedtask => {
//                 res.status(201).json(updatedtask.notes);
//             }).catch(next);
//         }).catch(next);       
//     })

//     .delete((req, res, next) => {
//         Task.findById(req.params.taskid)
//         .then(task=>{
//             task.notes = [];
//             task.save()
//             .then(updatedtask => {
//                 res.json(updatedtask.notes);
//             }).catch(next);
//         }).catch(next);
//     });

// //for noteid
// taskrouter.route('/:taskid/notes/:noteid')
//     .get((req, res, next)=>{
//         Task.findById(req.params.taskid)
//         .then(task=>{
//             res.json(task.notes.id(req.params.noteid));
//         }).catch(next);
//     })

//     .put((req, res, next)=>{
//         Task.findById(req.params.taskid)
//         .then(task =>{
//             let note = task.notes.id(req.params.noteid);
//             note.text = req.body.text;
//             task.save()
//             .then(updatedtask=>{
//                 res.json(task.notes.id(req.params.noteid));
//             }).catch(next);
//         }).catch(next);
//     })

//     .delete((req, res, next)=>{
//         Task.findById(req.params.taskid)
//         .then(task=>{
//            task.notes = task.notes.filter((note) =>{
//                return note.id !== req.params.noteid; 
//            });
//            task.save()
//            .then(updatedtask=>{
//                res.json(updatedtask.notes);
//            }).catch(next);
//         }).catch(next);
//     });

module.exports = bookrouter;

