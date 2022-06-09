/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/
console.log("----------------------------");
console.log("FrontEnd > server.js");
console.log("----------------------------");

// imports 
const express = require('express');
const serveStatic = require('serve-static');

var hostname = "localhost";
var port = 8008;

var app = express();

// endpoints

app.get("/", (req, res) => {
    res.sendFile("/public/Home.html", { root: __dirname });
});

app.get("/Login", (req,res) => {
    res.sendFile("/public/Login.html", { root: __dirname });
})



app.get("/Signup", (req,res) => {
    res.sendFile("/public/Signup.html",{ root: __dirname});
})

app.get("/Games", (req, res) => {
    res.sendFile("/public/Games.html", { root: __dirname });
});

app.get("/New", (req,res) => {
    res.sendFile("/public/New.html", { root: __dirname});
})

// exports
app.use(serveStatic(__dirname + "/public"));

app.listen(port, hostname, function () {
    console.log(`Server hosted at http://${hostname}:${port}`);
});