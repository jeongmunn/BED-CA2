/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/

console.log("------------------------------------------");
console.log("model > game.js");
console.log("------------------------------------------");

// imports
var db = require('../controller/databaseConfig');
const category = require('./category');

// functions
var game = {

    // ADD NEW GAME
    insert: function (game, callback) {
        var title = game.title;
        var description = game.description;
        var price = game.price;
        var platform = game.platform;
        var catname = game.category;
        var year = game.year;

        var conn = db.getConnection();
        console.log(game);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                        SELECT catid
                        FROM sp_category
                        WHERE catname = ? ;
                        `;

                conn.query(sql, [catname], function (err, result) {
                    var catid = result[0].catid;
                    console.log(catid);

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("before sql");
                        var sql = `
                            INSERT INTO
                            sp_game
                                (title,
                                 description,
                                 price,
                                 platform,
                                 categoryid,
                                 year)
                            VALUES
                                (?,?,?,?,?,?);
                            `;
                        console.log("after sql");
                        conn.query(sql, [title, description, price, platform, catid, year], function (err, result) {
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
            }
        });
    },

    // SEARCH GAME
    find: function (title, price, platform, callback) {
        var conn = db.getConnection();
        console.log("Price = " + price);
        conn.connect(function (err) {
            if (err) {
                console.log("Connection failed");
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                title = "%" + title + "%"
                platform = "%" + platform + "%"
                var sql = `
                SELECT gameid , title, price, platform , url
                FROM sp_game
                WHERE
                (title LIKE ? OR ? = NULL) && (price <= ? OR ? = 0) && (platform LIKE ? OR ? = NULL)
                `;
                conn.query(sql, [title, title, price, price, platform, platform], function (err, result) {
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

    // ALL BY ID 
    findAllByID: function (callback) {
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
                            g.gameid , g.title , g.description , g.price , g.platform , c.catname , g.year , g.url , g.created_at
                        FROM 
                            sp_game AS g JOIN sp_category AS c
                        WHERE 
                            catid = categoryid;
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

    // FIND BY ID
    findByID: function (gameid,callback) {
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
                            g.gameid , g.title , g.description , g.price , g.platform , c.catname , g.year , g.url , g.created_at
                        FROM 
                            sp_game AS g JOIN sp_category AS c
                        WHERE 
                            catid = categoryid && g.gameid = ?;
                        `;

                conn.query(sql,[gameid], function (err, result) {
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


    // // QUESTION 6
    // insert: function (game, callback) {
    //     var title = game.title;
    //     var description = game.description;
    //     var price = game.price;
    //     var platform = game.platform;
    //     var categoryid = game.categoryid;
    //     var year = game.year;

    //     var conn = db.getConnection();

    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             console.log("Connected!");

    //             var sql = `
    //                 INSERT INTO
    //                 sp_game
    //                     (title,
    //                      description,
    //                      price,
    //                      platform,
    //                      categoryid,
    //                      year)
    //                 VALUES
    //                     (?,?,?,?,?,?);
    //                 `;

    //             conn.query(sql, [title, description, price, platform, categoryid, year], function (err, result) {

    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     var sql = `
    //                 SELECT
    //                     gameid
    //                 FROM
    //                     sp_game
    //                 WHERE
    //                     title = ?;
    //                 `;
    //                     conn.query(sql, [title], function (err, result) {
    //                         conn.end();
    //                         return callback(null, result[0]);
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // },

    // QUESTION 7 
    findAll: function (platform, callback) {
        var platform = platform;
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
                        g.gameid , g.title , g.description , g.price , g.platform , c.catid , c.catname , g.year , g.created_at
                    FROM 
                        sp_game AS g JOIN sp_category AS c
                    WHERE 
                        g.platform = ? && catid = categoryid;
                    `;

                conn.query(sql, [platform], function (err, result) {
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

    // QUESTION 8
    delete: function (gameid, callback) {
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
            DELETE FROM  
                    sp_game 
            WHERE 
                    gameid = ?
            `;
                conn.query(sql, [gameid], function (err, result) {
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

    // QUESTION 9
    update: function (gameid, game, callback) {
        var title = game.title;
        var description = game.description;
        var price = game.price;
        var platform = game.platform;
        var categoryid = game.categoryid;
        var year = game.year;

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = `
                    UPDATE
                        sp_game
                    SET
                        title = ?,
                        description = ?,
                        price = ?,
                        platform = ?,
                        categoryid = ?,
                        year = ?
                    WHERE
                        gameid = ?;
                    `;

                conn.query(sql, [title, description, price, platform, categoryid, year, gameid], function (err, result) {

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
module.exports = game;

