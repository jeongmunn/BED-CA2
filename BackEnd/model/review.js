/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/

console.log("------------------------------------------");
console.log("model > review.js");
console.log("------------------------------------------");

// imports
var db = require('../controller/databaseConfig');

// functions
var review = {

    // GAMES BY ID
    getByID: function (gameid, callback) {
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                SELECT 
                    r.gameid, r.content, r.rating, u.username  
                FROM 
                    sp_review AS r, sp_user AS u 
                WHERE 
                    u.userid = r.userid && r.gameid = ? ;
                `;
                conn.query(sql, [gameid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    // ADD NEW REVIEW
    add: function (userid, gameid, review, callback) {
        var content = review.content;
        var rating = review.rating;

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = `
                        INSERT INTO
                        sp_review(
                            userid,
                            gameid,
                            content,
                            rating)
                    VALUES
                            (?,?,?,?);
                            `;

                conn.query(sql, [userid, gameid, content, rating], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    // QUESTION 11
    findByID: function (gameid, callback) {
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                SELECT 
                    r.gameid, r.content, r.rating, u.username ,  
                FROM 
                    sp_review AS r, sp_user AS u 
                WHERE 
                    u.userid = r.userid && r.gameid = ? ;
                `;
                conn.query(sql, [gameid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

}

// exports
module.exports = review;