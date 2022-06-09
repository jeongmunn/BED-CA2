/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/

console.log("------------------------------------------");
console.log("model > users.js");
console.log("------------------------------------------");

// imports
var db = require('../controller/databaseConfig');


// functions
var users = {

    // LOGIN
    verify: function (username, password, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            // conn.connect(function (err) { 
            if (err) {//database connection got issue!

                console.log(err);
                return callback(err, null);
            } else {

                const query = `
                        SELECT 
                            userid , username , type  
                        FROM 
                            sp_user
                        WHERE 
                            username = ? && password = ?
            `;

                dbConn.query(query, [username, password], (error, results) => {
                    // conn.end(); 
                    if (error) {
                        callback(error, null);
                        return;
                    }

                    if (results.length === 0) {
                        return callback(null, null);

                    } else {
                        const user = results[0];
                        return callback(null, user);
                    }
                });
            }
        });
    },

    // SIGNUP
    signup: function (user, callback) {
        var username = user.username;
        var email = user.email;
        var type = user.type;
        var password = user.password;
        var profile_pic_url = user.profile_pic_url;

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
                        sp_user
                            (username,
                                email,
                                 type,
                              password,
                            profile_pic_url)
                        VALUES
                            (?,?,?,?,?);
                        `;

                conn.query(sql, [username, email, type, password, profile_pic_url], function (err, result) {
                    conn.end();
                    if (!err) {
                        result.status = 204;
                        return callback(null, result);
                    } else if (err.errno == 1062) {
                        err.status = 422;
                        err.message = 'unprocessable entry';
                        return callback(null, null);
                    } else {
                        err.status = 500;
                        err.message = 'Internal server error';
                        return callback(err, null);
                    }
                });
            }
        });
    },

    // CHECK TYPE OF USER
    check: function (userid, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            // conn.connect(function (err) { 
            if (err) {//database connection got issue!

                console.log(err);
                return callback(err, null);
            } else {

                const query = `
                        SELECT 
                            type  
                        FROM 
                            sp_user
                        WHERE 
                            userid = ?
            `;

                dbConn.query(query, [userid], (error, results) => {
                    // conn.end(); 
                    if (error) {
                        callback(error, null);
                        return;
                    } else {
                        const user = results[0];
                        return callback(null, user);
                    }
                });
            }
        });
    },


    // QUESTION 1 
    findAll: function (callback) {
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
                            * 
                        FROM 
                            sp_user ;
                        `;

                conn.query(sql, [], function (err, result) {
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

    // QUESTION 2 
    insert: function (user, callback) {
        var username = user.username;
        var email = user.email;
        var type = user.type;
        var profile_pic_url = user.profile_pic_url;

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
                        sp_user
                            (username,
                                email,
                                 type,
                            profile_pic_url)
                        VALUES
                            (?,?,?,?);
                        `;

                conn.query(sql, [username, email, type, profile_pic_url], function (err, result) {

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        var sql = `
                        SELECT
                            userid
                        FROM
                            sp_user
                        WHERE
                            username = ?
                        `;
                        conn.query(sql, [username], function (err, result) {
                            conn.end();
                            return callback(null, result[0]);
                        });
                    }
                });
            }
        });
    },

    // QUESTION 3
    findByID: function (userid, callback) {
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
                        * 
                    FROM 
                        sp_user
                    WHERE 
                        userid = ?
                `;
                conn.query(sql, [userid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        if (result.length == 0) {
                            return callback(null, null);
                        } else {
                            return callback(null, result[0]);
                        }
                    }
                });
            }
        });
    },
}

// exports
module.exports = users;


















