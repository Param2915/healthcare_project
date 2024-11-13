// const jwt = require('jsonwebtoken');


// //after successful register of user and then calling the login endpoint with the already registered user, it will create and return JWT token
// const generateJwtToken=(userData)=>{
//     return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:400000});
// }


// //after login we are getting the token and for validating the jwt token that it is coreect or not we will proceed with secure routes to GET/POST/UPDATE/DELETE.
// const validateJwtToken=(req,res,next)=>{
//     //we are checking that token is available or not in request header.
//     const tokenCheck=req.headers.authorization;
//     //OPTION 1:req header token, authorization not sent
//     if(!tokenCheck) return res.status(401).json({err:'TOKEN NOT AVAILABLE'});

//     //OPTION 2: req header is getting token but not in a right format:
//     //Authorization: Basic/Bearer
//     //BASIC btoa(USERNAME:PASSWORD)->BASIC hfskjdhfsdldg
//     //BEARER jdlfdngvnoisidk

//     const token=req.headers.authorization.split(' ')[1];

//     if(!token){
//         return res.status(401).json({err:'Invalid Token'});
//     }

//     try{
//         const validateToken=jwt.verify(token,process.env.JWT_SECRET);
//         req.user=validateToken;
//         next();

//     }catch(err){
//         return res.status(401).json(err.message);
//     }
// }


// module.exports={generateJwtToken,validateJwtToken}





const jwt = require("jsonwebtoken");
require("dotenv").config();
//After successful regester of user, and then calling the login endpoint with the already regestered user, It will create and return JWT Token
const generateJwtToken = (userData) => {

  return jwt.sign(userData, process.env.PRIVATE_KEY, {expiresIn:"7d"});
}

//After login, we are getting the token, and for validating the JWT Token, that it is correct or not,, we will proceed with secure routes, to GET/POST/UPDATE/DELETE.
const validateJwtToken = (req, res, next) => {
  console.log("validateJwtToken middleware reached");
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log("Token decoded successfully:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token validation error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


module.exports = {generateJwtToken, validateJwtToken};