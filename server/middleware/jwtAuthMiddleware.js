const jwt = require('jsonwebtoken');


//after successful register of user and then calling the login endpoint with the already registered user, it will create and return JWT token
const generateJwtToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:400000});
}


//after login we are getting the token and for validating the jwt token that it is coreect or not we will proceed with secure routes to GET/POST/UPDATE/DELETE.
const validateJwtToken=(req,res,next)=>{
    //we are checking that token is available or not in request header.
    const tokenCheck=req.headers.authorization;
    //OPTION 1:req header token, authorization not sent
    if(!tokenCheck) return res.status(401).json({err:'TOKEN NOT AVAILABLE'});

    //OPTION 2: req header is getting token but not in a right format:
    //Authorization: Basic/Bearer
    //BASIC btoa(USERNAME:PASSWORD)->BASIC hfskjdhfsdldg
    //BEARER jdlfdngvnoisidk

    const token=req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({err:'Invalid Token'});
    }

    try{
        const validateToken=jwt.verify(token,process.env.JWT_SECRET);
        req.user=validateToken;
        next();

    }catch(err){
        return res.status(401).json(err.message);
    }
}


module.exports={generateJwtToken,validateJwtToken}