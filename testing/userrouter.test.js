const request = require('supertest');
const express = require ('express');
const testingsetup = require('./testing-setup');
require ('dotenv').config(); 
const userRouter = require('../routes/userrouter');

const app = express();
app.use(express.json());

app.use('/users', userRouter);



describe('Test of users', () =>{

    let userid;

    test('Able to Register', () =>{
        return request(app).post('/users/register')
        .send ({
            email: 'test12345@gmail.com',
            password: 'test12345',
            firstname: 'Harry',
            lastname: 'Prasad' 
        }).then((res)=>{
           console.log(res.body);
           userid = res.body._id; 
           expect(res.statusCode).toBe(200);  
        })  
    })

    test('registration with empty fields', () =>{
        return request(app).post('/users/register')
        .send({
            email: 'hdjahda',
            password: '112'
        }).then((res)=>{
            console.log(res.body);
            expect(res.statusCode).toBe(500);
        }) 
    })

    test('Able to Login', () =>{
        return request(app).post('/users/login')
        .send ({
            email: 'test12345@gmail.com',
            password: 'test12345', 
        }).then((res)=>{
           console.log(res.body);
           expect(res.statusCode).toBe(200); 
           expect(res.body.token).not.toBe(undefined);
        })  
    })

    test('must get users', () =>{
        return request(app).get('/users')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })

    test('must get user with id', () =>{
    
        return request(app).get('/users/5f12bc6886d412207cfdd584')
        .then((res)=>{
            console.log(res);
            expect(res.statusCode).toBe(200);
        }) 
    })


})
