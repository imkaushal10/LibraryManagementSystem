const jwt = require('jsonwebtoken');

const verifyUser = ((req, res, next)=>{
  console.log(req.headers.authorization)
  let authHeader = req.headers.authorization;
    if(!authHeader){
        let err = new Error('No authentication information');
        err.status = 400;
        return next(err);
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if(err) return next(err);
        req.user = payload;
        next();
    })

})

const verifyManager = ((req,res,next)=>{
    if(!req.user){
        let err = new Error ("No authentication inforamtion");
        err.status= 400;
        next(err);
    }
    if(req.user.role == 'manager'){
        return next();
    }
        let err = new Error ("Forbidden");
        err.status= 400;
        next(err);
})

const verifyAdmin = (req,res,next)=>{
    if(!req.user){
        let err = new Error ("No authentication inforamtion");
        err.status= 400;
        return next(err);
    }
    if(req.user.role !== 'admin'){
        let err = new Error ("Forbidden");
        err.status= 400;
        return next(err);
    }
    next();   
}

module.exports = {

    verifyUser,
    verifyAdmin};
