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

app.use('/users', userRouter);
app.use('/books', auth.verifyUser, bookRouter);

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
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                token = res.body.token;
            })
        })
    })
    
    test('Books', ()=>{
        return request(app).post('/books')
        .set('authorization', token)
        .send({
            title: 'Ramayan',
            author: 'Kaushal',
            publilsher: 'Pragya publications',
            published_year: '2011',
            image: 'image.jpeg'
        })
        .then((res)=>{
           console.log(res);
           expect(res.statusCode).toBe(500);  
        })  
    })
})