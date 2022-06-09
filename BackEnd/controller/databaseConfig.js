/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/
console.log("------------------------------------------");
console.log("CA2 > BackEnd > controller > databaseConfig.js");
console.log("------------------------------------------");

// imports
var mysql = require('mysql');

// functions / objects
var dbconnect = {
    getConnection: function(){
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Jw021221.",
            database: "sp_games"
        });
        return conn;
    }
};

// exports
module.exports = dbconnect ;