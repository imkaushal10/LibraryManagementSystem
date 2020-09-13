const request = require('supertest');
const express = require ('express');
const testingsetup = require('./testing-setup');
require ('dotenv').config(); 
const reviewRouter = require('../routes/reviewrouter');
const userRouter = require('../routes/userrouter');

const app = express();
app.use(express.json());

// app.use('/users', userRouter);
app.use('/reviews', reviewRouter);


describe('Test of reviews', () =>{


    let token;
    test('Must Get a new user token', ()=>{
        return request(app).post('/users/register')
        .send ({
            email: 'mp1234@gmail.com',
            password: 'mp1234',
            firstname: 'Ram',
            lastname: 'Baral'
        }).then((res)=>{
            console.log(res.body);
            return request(app).post('/users/login')
            .send({
                email: 'mp1234@gmail.com',
                password: 'mp1234'
            }).then((res)=>{
                console.log(res);
                expect(res.statusCode).toBe(404);
                token = res.body.token;
            })
        })
    })



    test('must be able to add reviews', () =>{
        return request(app).post('/reviews')
        .send({
            user: '5f34d604ef66383770f091fe',
            description: 'Fantabolous  Book'
        })
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(400);
        }) 
    })

    test('must get reviews', () =>{
        return request(app).get('/reviews')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })

    test('must not be able to update reviews', () =>{
        return request(app).put('/reviews')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(404);
        }) 
    })

    test('must get review with id', () =>{
    
        return request(app).get('/reviews/5f58742ff4871a2e745742e2')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })

    test('must delete review with id', () =>{
    
        return request(app).delete('/reviews/5f58742ff4871a2e745742e2')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })
})
