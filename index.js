const express = require('express');
const mongoose = require('mongoose');
const bookrouter = require('./routes/bookrouter');
const reviewrouter = require('./routes/reviewrouter');
const userrouter = require('./routes/userrouter');
const bookingrouter = require('./routes/bookingrouter');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/LMS',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log('Server connected to database');
});

app.use(cors ('*'))
app.use(express.json()); //json data
app.use(express.urlencoded({extended: false})); //html form data 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
    res.send('Welcome to my app');
});

app.use('/books', bookrouter); //auth.verifyUser
app.use('/reviews', reviewrouter);
app.use('/users', userrouter); 
app.use('/bookings', bookingrouter);


app.use((req, res, next)=>{
    let err = new Error('Not found!!');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status (err.status || 500);
    res.json({
        status: 'error',
        message: err.message
    })
})

app.listen(process.env.Port,() =>{
    console.log(`Server is running at localhost:${process.env.Port}`);
});
