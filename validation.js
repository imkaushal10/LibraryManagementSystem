const validator = require('validator');

const registerinput = (data)=>{
    let errors = {};

    if (data.email){
        if(!validator.isEmail(data.email)){
            errors.email = 'Invalid Email';
        }
    }else errors.email = 'Email is required';

    if (data.password){
        if(!validator.isLength(data.password.trim(), {min: 5, max:15})){
            errors.password = 'Password must be between 5 and 15 characters';
        }
    }else errors.password = 'Password is required';

    if (data.firstname){
        if(!validator.isLength(data.firstname,{max: 20})){
            errors.firstname = 'FirstName is too long';
        }
    }else errors.firstname = 'FirstName is required';

    if (data.lastname){
        if(!validator.isLength(data.lastname,{max: 20})){
            errors.lastname = 'LastName is too long';
        }
    }else errors.lastname = 'LastName is required';


    return{
        errors,
        isValid: Object.keys(errors).length == 0 
    }
}



module.exports = {
    registerinput
}