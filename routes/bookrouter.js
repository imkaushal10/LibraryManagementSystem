const express = require('express');
const Book = require('../models/Book');
const auth = require('../auth');
const multer = require('multer');
const path = require('path');
const Review = require('../models/Review');



const Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) =>{
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '_' + Date.now()+ ext);
    }
})

const imageFilter = ((req,file,cb)=>{
if(!file.originalname.match(/\.(JPG|jpg|jpeg|png)$/)){
    let err = new Error('Only jpeg|jpg and png image format are allowed');
    err.status= 400;
    return cb(err, false);
}
return cb(null, true);
})

const upload = multer({
storage: Storage,
fileFilter: imageFilter,
limits: {
    fileSize: 1024 * 1024
}
})


const bookrouter = express.Router();


bookrouter.route('/')

    .get((req, res, next) =>{
        Book.find()
        .then ((books)=>{
            res.json(books);
        }).catch(next);
    })

    .post(upload.single('image'), (req, res, next)=>{  //upload,
        // let {title, author, publisher, numberofpages, status, published_year} = req.body;
        // let owner = req.user.id;
        let title = req.body.title;
        let author = req.body.author;
        let publisher = req.body.publisher;
        let numberofpages = req.body.numberofpages;
        let status = req.body.status;
        let published_year = req.body.published_year;
        let image = req.file.filename;
        Book.create({title, author, publisher, numberofpages, status, published_year, image}) //{title, author, publisher, numberofpages, status, published_year, image}
        .then ((books)=>{
            res.status(201).json(books);
            console.log(req.file);
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


    //for books/:id
 bookrouter.route('/:id')
    .get((req,res, next) =>{
        Book.findById(req.params.id)
        .then((books)=>{
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
        if(req.body);
        book.title = req.body.title;
        book.author = req.body.author;
        book.publisher = req.body.publisher;
        book.numberofpages = req.body.numberofpages;
        book.status = req.body.status;
        book.published_year = req.body.published_year;
        book.image = req.body.image;
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

    //for book/:bookid/bookings
bookrouter.route('/:bookid/bookings')
    .get((req, res, next) =>{
        Book.findById(req.params.bookid)
        .then ((books)=>{
            res.json(books.bookings);
        }).catch(next);
    })
    
    .post(auth.verifyUser, (req, res, next)=>{
        Book.findById(req.params.bookid)
        .then(books =>{
            let book = req.params.bookid;
            let booked_by = req.user.id;
            let {status} = req.body;
            books.bookings.push({book, booked_by, status});
            books.save()
            .then(updatedbook => {
                res.status(201).json(updatedbook.bookings);
            }).catch(next);
        }).catch(next);  
    })

    .delete((req,res,next)=>{
        Book.findById(req.params.bookid)
        .then(books=>{
            books.bookings = [];
            books.save()
            .then(updatedbooks=>{
                res.json(updatedbooks.bookings);
            }).catch(err=>next(err));
        }).catch(err=>next(err));

    })

bookrouter.route('/:bookid/bookings/:bookingid')
    .get((req, res, next)=>{
        Book.findById(req.params.bookid)
        // .populate('books.image')
        .then(book=>{
            res.json(book.bookings.id(req.params.bookingid))
        }).catch(err=>next(err));
    })
       

    .put((req, res, next)=>{
        Book.findById(req.params.bookid)
        .then(book =>{
            let booking = book.bookings.id(req.params.bookingid);
            booking.status = req.body.status;
            book.save()
            .then(updatedbook=>{
                res.json(book.bookings.id(req.params.bookingid));
            }).catch(next);
        }).catch(next);
    })

    .delete((req, res, next)=>{
        Book.findById(req.params.bookid)
        .then(book=>{
           book.bookings = book.bookings.filter((bookings) =>{
               return booking.id !== req.params.bookingid; 
           });
           book.save()
           .then(updatedbook=>{
               res.json(updatedbook.bookings);
           }).catch(next);
        }).catch(next);
    });


    //for bookings/id/reviews


    bookrouter.route('/:bookid/reviews')
    .get((req, res, next)=>{
        Book.findById(req.params.bookid)
        .populate('reviews')
        .then(book =>{
            res.json(book.reviews);
        }).catch(next);
    })  
    .post(auth.verifyUser, (req, res, next)=>{
        Book.findById(req.params.booid)
        .then(book=>{
        //     let {description} = req.body;
        //    let user = req.user.id;
            Review.create(req.body)
            .then(review=>{
                // res.status(201).json(review);
                // console.log(review._id)
                book.reviews.push(review._id)
                book.save()
                .then(updatedbook=>{
                    res.json(review);
                }).catch(next);
            }).catch(next);
        }).catch(next);
    })
    .delete((req, res, next)=>{
        Book.findById(req.params.bookid)
        .then(book=>{
            Review.deleteMany({_id: {$in: book.reviews}})
            .then(reply=>{
                book.reviews = [];
                book.save()
                .then(updatedbook=>{
                    res.json(reply);
                })
            }).catch(next);
        }).catch(next);
    
    }) 
    

    //for /:bookid/reviews/reviewid
    bookrouter.route('/:bookid/reviews/:bookid')
    .get((req, res, next)=>{
    Book.findById(req.params.bookid)
    .then(book=>{
        if(book.reviews.includes(req.params.reviewid)){
            Review.findById(req.params.reviewid)
            .then(review=>{
                res.json(review);
            }).catch(next);
        }else{
            next('Not found');
        }
    }).catch(next);
    })
    .put((req, res, next)=>{
    Book.findById(req.params.bookid)
    .then(book=>{
        if(book.reviews.includes(req.params.bookid)){
        Review.findByIdAndUpdate(req.params.reviewid, {$set: req.body}, {new: true})
        .then(updatedreview=>{
            res.json(updatedreview);
        }).catch(next);  
        }else{
            next('Not found');
        }
    }).catch(next);
    })
    .delete((req, res, next)=>{
    book.findById(req.params.bookid)
    .then(book=>{
        if(book.reviews.includes(req.params.reviewid)){
        book.reviews =  book.reviews.filter(bookid=>{
            return bookid != req.params.bookid
        });
        book.save()
        .then(updatedbook=>{
            res.json(updatedbook);
        })
        }else{
            next('Not found');
        }
    }).catch(next);
    })

module.exports = bookrouter;

