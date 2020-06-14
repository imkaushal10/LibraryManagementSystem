const express = require('express');
const Category = require('../models/Category');
const Book = require('../models/Book');

const categoryrouter = express.Router();

categoryrouter.route('/')

    .get((req, res, next)=>{
        Category.find()
        .then(categories=>{
            res.json(categories);
        }).catch(err=>next(err));
    })
    .post((req, res, next)=>{
        Category.create(req.body)
        .then(category=>{
            res.json(category);
        }).catch(err=>next(err));
    })
    .put((req, res, next)=>{
        res.status(403).json('PUT operation is not allowed for /categories');
    })
    .delete((req,res,next)=>{
        Category.deleteMany()
        .then(reply=>{
            res.json(reply);
        }).catch(err=>next(err));
    });

//for categories/:id
categoryrouter.route('/:catid')
    .get((req,res,next)=>{
        Category.findById(req.params.catid)
        .then(category=>{
            res.json(category);
        }).catch(err=>next(err));
    })
    .post((req, res, next)=>{
        res.status(403).json('POST operation is not allowed for /categories/:id');
    })
    .put((req, res, next)=>{
        Category.findByIdAndUpdate(req.params.catid,{$set: req.body}, {new: true})
        .then(updatedcategory=>{
            res.json(updatedcategory);
        }).catch(err=>next(err));
    })
    .delete((req, res, next)=>{
        Category.deleteOne({_id: req.params.catid})
        .then(reply=>{
            res.json(reply);
        }).catch(err=>next(err));
    })

//for categories/:id/books
categoryrouter.route('/:catid/books')
   .get((req, res, next)=>{
       Category.findById(req.params.catid)
       .populate('books')
       .then(category=>{
          res.json(category.books);
       }).catch(err=>next(err));
   })
   .post((req, res, next)=>{
    Category.findById(req.params.catid)
    .then(category=>{
        Book.create(req.body)
        .then(book=>{
            category.books.push(book._id)
            category.save()
            .then(updatedcategory=>{
                res.json(book);
             }).catch(next);
         }).catch(next);
     }).catch(next);
    })
    .delete((req, res, next)=>{
        Category.findById(req.params.catid)
        .then(category=>{
            Book.deleteMany({_id: {$in: category.books}})
            .then(reply=>{
                category.books = [];
                category.save()
                .then(updatedcategory=>{
                    res.json(reply);
                })
            }).catch(next);
        }).catch(next);
    }) 


//for /:catid/books/:bookid

categoryrouter.route('/:catid/books/:bookid')
.get((req, res, next)=>{
    Category.findById(req.params.catid)
    .then(category=>{
        if(category.books.includes(req.params.bookid)){
            Book.findById(req.params.bookid)
            .then(book=>{
                res.json(book);
            }).catch(next);
        }else{
            next('Not found');
        }
    }).catch(next);
 })
 .put((req, res, next)=>{
     Category.findById(req.params.catid)
     .then(category=>{
         if(category.books.includes(req.params.bookid)){
           Book.findByIdAndUpdate(req.params.bookid, {$set: req.body}, {new: true})
           .then(updatedbook=>{
               res.json(updatedbook);
           }).catch(next);  
         }else{
             next('Not found');
         }
     }).catch(next);
 })
 .delete((req, res, next)=>{
    Category.findById(req.params.catid)
    .then(category=>{
        if(category.books.includes(req.params.bookid)){
          category.books =  category.books.filter(bookid=>{
              return bookid != req.params.bookid
          });
          category.save()
          .then(updatedbook=>{
              res.json(updatedbook);
          })
        }else{
            next('Not found');
        }
    }).catch(next);
 })

module.exports = categoryrouter;