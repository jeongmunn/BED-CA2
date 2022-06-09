/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/
console.log("------------------------------------------");
console.log("CA2 > BackEnd > auth > isLoggedinMiddleware.js");
console.log("------------------------------------------");

// imports
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// object / functions
var check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // first check , cannot be null , cannot be undefined , and must have a Bearer
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    var output = "Unauthorised.You are not logged in as user."
    res.status(401).send(output);
    return;
  }

  // wrap it with Bearer
  const token = authHeader.replace("Bearer ", "");

  // decode
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      res.status(401).send();
      return;
    }

    console.log("-----------------------------------------------------------");
    console.log(decodedToken);
    
    // just saved it in the request decodedToken
    req.decodedToken = decodedToken;
    next();
  });
};

// exports
module.exports=check;
