const express = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validation = require('../validation');

const userrouter = express.Router();

userrouter.post('/register',(req, res, next)=>{
    const {errors, isValid} = validation.registerinput(req.body);

    if(!isValid){
        res.status(400).json(
            {
            status: 'error',
            message: errors
        })
    }
    
    let {email, password, firstname, lastname, role} = req.body;
    User.findOne({ email })
    .then(user=>{
        if(user){
          throw new Error('User already exists'); 
        }
        bcryptjs.hash(password, 5, (err,hash)=>{
            if(err) next(err);
            User.create({email, password: hash, firstname, lastname, role}) //npm install bcryptjs --save
            .then(user=>{
                res.json({status: user.email+ "" +'Registered successfully'}); //jwt sign can also be used to prevent users for login agfter successfull registration
            }).catch(next);
        })
    }).catch(next);
});

userrouter.post('/login', (req, res, next)=>{
   const {email, password} = req.body;
    User.findOne({email})
    .then(user=>{  
      if(!user){
          let err = new Error ('email doesnot exist'); 
          err.status = 400;
          return next(err);
        }
    bcryptjs.compare(password, user.password)
      .then(isMatched=>{
            if(!isMatched){
                let err = new Error('email/Password doesnot match');
                err.status = 400;
                return next(err);
                } 
            const payload = {
                id: user._id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role:user.role
            } 
            jwt.sign(payload, process.env.SECRET, {expiresIn: "4hr"}, (err, token)=>{
                if(err){throw new Error ('Token couldnot be created')};
                res.json({message: 'Login Successfull', token});
            });      
       })
    }).catch(next);
})

userrouter.route('/')
    .get((req, res, next)=>{
        User.find()
        .then(users=>{
            res.json(users);
        }).catch(err=>next(err));
    })
    .delete((req, res, next)=>{
        User.deleteMany()
        .then(reply=>{
        res.json(reply);  
        }).catch(err=>next(err));
    })

//for /users/:id

userrouter.route('/:userid')
    .get((req, res, next)=>{
        User.findById(req.params.userid)
        .then(user=>{
            res.json(user);
        }).catch(err=>next(err));
    })
    .put((req, res, next)=>{
        User.findByIdAndUpdate(req.params.userid,{$set: req.body}, {new: true})
        .then(updateduser=>{
            res.json(updateduser);
        }).catch(err=>next(err));
    })
    .delete((req, res, next)=>{
        User.deleteOne({_id: req.params.userid})
        .then(reply=>{
            res.json(reply);
        }).catch(err=>next(err));
    })


module.exports =userrouter;
