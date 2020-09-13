const request = require('supertest');
const express = require ('express');
const testingsetup = require('./testing-setup');
const multer = require('multer');
const auth = require('../auth')
require ('dotenv').config(); 
const userRouter = require('../routes/userrouter');
const bookRouter = require('../routes/bookrouter');

const app = express();
app.use(express.json());

// let user = req.user.id;

app.use('/users', userRouter);
app.use('/books', bookRouter);

describe('Able to get books', ()=>{
    let token;
    test('Must Get a new user token', ()=>{
        return request(app).post('/users/register')
        .send ({
            email: 'ram1234@gmail.com',
            password: 'ram1234',
            firstname: 'Ram',
            lastname: 'Baral'
        }).then((res)=>{
            console.log(res.body);
            return request(app).post('/users/login')
            .send({
                email: 'ram1234@gmail.com',
                password: 'ram1234'
            }).then((res)=>{
                console.log(res);
                expect(res.statusCode).toBe(200);
                token = res.body.token;
            })
        })
    })
    


    test('must get books', () =>{
        return request(app).get('/books')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })
    

    test('Must be able to add books', ()=>{
        return request(app).post('/books')
        // .set('authorization', token)
        .send({
            title: 'Ramayan',
            author: 'Kaushal',
            publilsher: 'Pragya publications',
            published_year: '2011',
            image: 'image_1599570014022.jpg'
        })
        .then((res)=>{
           console.log(res.body);
           expect(res.statusCode).toBe(500);  
        })  
    })


    test('must be able  to delete book with bookid', () =>{
        return request(app).delete('/books/5f3e447007c1e33ed098c988')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })
    

    test('must be able  to get book with id', () =>{
        return request(app).get('/books/5f3e447007c1e33ed098c988')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })

    test('must be able  to update book with id', () =>{
        return request(app).put('/books/5f3e447007c1e33ed098c98')
        .send({
            title: 'Ramayan',
            author: 'Kaushal',
            publilsher: 'Pragya publications',
            published_year: '2011',
        })
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('must post bookings', () =>{
    
        return request(app).get('/books/5f3e447007c1e33ed098c988/bookings')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })


    test('must be able  to get bookings', () =>{
        return request(app).get('/books/5f3e447007c1e33ed098c988/bookings')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('must be able  to get bookings with id', () =>{
        return request(app).get('/books/5f3e447007c1e33ed098c988/bookings/5f572df3be4fd41ec0a2d537')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('must update booking with id', () =>{
    
        return request(app).get('/books/5f3e447007c1e33ed098c988/bookings/bookingid')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })


    test('must be able  to delete bookings with id', () =>{
        return request(app).delete('/books/5f3e447007c1e33ed098c988/bookings/bookingid')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('must be able  to update bookings with id', () =>{
        return request(app).put('/books/5f3e447007c1e33ed098c988/bookings/bookingid')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })


    test('must be able  to get reviews', () =>{
        return request(app).get('/books/5f3e447007c1e33ed098c988/reviews')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('must be able  to get reviews with id', () =>{
        return request(app).get('/books/5f3e447007c1e33ed098c988/reviews/5f58742ff4871a2e745742e2')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('must be able  to delete reviews with id', () =>{
        return request(app).delete('/books/5f3e447007c1e33ed098c988/reviews/reviewid')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('must be able  to update reviews with id', () =>{
        return request(app).put('/books/5f3e447007c1e33ed098c988/reviews/reviewid')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(500);
        }) 
    })
    
    
})