/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/
console.log("------------------------------------------");
console.log("CA2 > BackEnd > server.js");
console.log("------------------------------------------");

// imports
const app = require('./controller/app');

//configurations
const hostname = "localhost";
const port = 8888;


//standard for express
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});
