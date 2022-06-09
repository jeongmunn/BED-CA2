/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/
console.log("------------------------------------------");
console.log("model > category.js");
console.log("------------------------------------------");

// imports
var db = require('../controller/databaseConfig');

// functions
var category = {

    // ADD CATEGORY
    insert: function (category, callback) {
        var catname = category.catname;
        var description = category.description;

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
                        sp_category
                            (catname,
                                description)
                        VALUE
                            (?,?);
                        `;

                conn.query(sql, [catname, description], function (err, result) {
                    conn.end();
                    if (!err) {
                        result.status = 204;
                        return callback(null, result);
                    } else if (err.errno == 1062) {
                        err.status = 422;
                        err.message = 'unprocessable entry';
                        return callback(err, null);
                    } else {
                        err.status = 500;
                        err.message = 'Internal server error';
                        return callback(err, null);
                    }
                });
            }
        });
    },

    // GET CATEGORIES
    getAll: function (callback) {
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
                            catname
                        FROM 
                            sp_category
                        `;

                conn.query(sql, function (err, result) {
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

    // // QUESTION 4
    // insert: function (category, callback) {
    //     var catname = category.catname;
    //     var description = category.description;

    //     var conn = db.getConnection();

    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             console.log("Connected!");

    //             var sql = `
    //                     INSERT INTO
    //                     sp_category
    //                         (catname,
    //                             description)
    //                     VALUE
    //                         (?,?);
    //                     `;

    //             conn.query(sql, [catname, description], function (err, result) {

    //                 if (err) {
    //                     console.log(err);
    //                     var sql = `
    //                         SELECT
    //                         catname
    //                         FROM
    //                         sp_category
    //                     `;
    //                     conn.query(sql, [], function (err, result) {
    //                         conn.end();
    //                         var i = 0;
    //                         do {
    //                             if (catname == result[i]) {
    //                                 return callback(null, null)
    //                             }
    //                             i++;
    //                             break;
    //                         } while (i < result.length);
    //                         return callback(err, null);
    //                     });
    //                 } else {
    //                     return callback(null, result);
    //                 }
    //             });
    //         }
    //     });
    // },

    // QUESTION 5
    update: function (catid, category, callback) {
        var catname = category.catname;
        var description = category.description;

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");

                var sql = `
                    UPDATE
                        sp_category
                    SET
                        catname = ?,
                        description = ?
                    WHERE
                        catid = ?;
                    `;

                conn.query(sql, [catname, description, catid], function (err, result) {
                    conn.end();
                    if (!err) {
                        result.status = 204;
                        return callback(null, result);
                    } else if (err.errno == 1062) {
                        err.status = 422;
                        err.message = 'unprocessable entry';
                        return callback(err, null);
                    } else {
                        err.status = 500;
                        err.message = 'Internal server error';
                        return callback(err, null);
                    }
                });
            }
        });
    },

}

// exports
module.exports = category;

