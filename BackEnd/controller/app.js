/*
Name: tan jing wen
Class: DIT/1B/03
Admission Number: P2037084
*/
console.log("------------------------------------------");
console.log("CA2 > BackEnd > controller > app.js");
console.log("------------------------------------------");

// imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");

var users = require('../model/user');
var category = require('../model/category');
var game = require('../model/game');
var review = require('../model/review');


// middleware functions
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

function printDebugInfo(req, res, next) {
    console.log("..............[ debug info  ]...........................");
    console.log("Servicing $(urlPattern)..");
    console.log("Servicing " + req.url + "..");
    console.log(("> req.params;") + JSON.stringify(req.params));
    console.log("> req.body: " + JSON.stringify(req.body));
    // console.log("> req.myOwnDebugInfo:" + JSON.stringify(req.myOwnDebugInfo));
    console.log("..............[ debug info  ]...........................");
    next();
}

// MF configurations
app.use(jsonParser);
app.use(urlEncodedParser);
app.options('*', cors());
app.use(cors());

// basic check endpoint
app.get('/', (req, res) => {
    console.log("GET > '/' > I'm here !");

    res.statusCode = 200;
    res.send("I'm all good");
    res.end();
});

// endpoints

// LOGIN
app.post("/api/login", (req, res) => {

    var username = req.body.username;
    var password = req.body.password;

    users.verify(username, password, (error, user) => {
        // this is matched callback(error,null)
        if (error) {
            res.status(500).send();
            return;
        }
        // this is matched callback(null,null)
        if (user === null) {
            res.status(401).send();
            return;
        } else {
            // this is matched callback(null,result)
            const result = {
                userid: JSON.stringify(user.userid),
                username: user.username,
                role: user.type,
            };

            jwt.sign(result, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
                if (error) {
                    console.log(error);
                    res.status(401).send();
                    return;
                } else {

                    if (result.role == "admin") {
                        res.status(200).send({
                            token: token,
                            UserData: result,
                            isAdmin: true,
                        });
                    } else {
                        res.status(200).send({
                            token: token,
                            UserData: result,
                            isAdmin: false,
                        });
                    }
                }
            })
        }
    });
});

// SIGNUP
app.post("/api/signup", (req, res) => {

    var data = {
        username: req.body.username,
        email: req.body.email,
        type: req.body.type,
        password: req.body.pwd,
        profile_pic_url: req.body.profile_url
    }

    users.signup(data, (err, result) => {
        if (!err) {
            if (result == null) {
                var output = "Unprocessable Entity";
                res.status(422).json(output);
            } else {
                var output = { "success" : true};
                res.status(204).json(output);
            }
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// SEARCH
app.get('/search/', function (req, res) {
    var { title, price, platform } = req.query;
    console.log(title + "and" + price + "and" + platform);
    game.find(title, price, platform, function (err, result) {
        if (!err) {
            res.status(201).send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// GET ALL GAMES
app.get('/games/', function (req, res) {

    game.findAllByID(function (err, result) {
        if (!err) {
            // const test = {
            //     title : (games[0].title)
            // }
            // console.log(test);
            res.send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// GET GAME
app.get('/games/:id', function (req, res) {
    var gameid = req.params.id;
    game.findByID(gameid, function (err, result) {
        if (!err) {
            if (result == null) {
                res.status(200);
            }
            else {
                res.status(200).send(result);
            }
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// ADD NEW GAME { DONE }  { NEED TO ADD DIFFERENT OUTPUT FOR ERRORS}
app.post('/newgame/:uid', isLoggedInMiddleware, function (req, res) {
    var userid = req.params.uid;
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        category: req.body.category,
        year: req.body.year,
    }

    if (isNaN(userid)) {
        var output = "Unauthorised.You are not logged in as user."
        res.status(400).send(output);
        return;
    }

    console.log("Decoded");
    console.log(req.decodedToken);
    console.log("userid from token: " + req.decodedToken.userid);
    console.log("userid given: " + userid);

    if (userid !== req.decodedToken.userid) {
        var output = "Forbidden.You are not the user for this token.";
        res.status(403).send(output);
        return;
    }

    users.check(userid, function (err, result) {
        // this is matched callback(error,null)
        if (err) {
            var output = "There's an error when I check for userid in database.";
            res.status(500).send(output);
            return;
        } else {
            // this is matched callback(null,result)
            console.log(JSON.stringify(result.type));
            if (result.type == "admin") {
                console.log(data);
                game.insert(data, function (err, result) {
                    if (!err) {
                        var output = { "success": true };
                        res.status(201).json(output);
                    } else {
                        var output = "Internal Server Error";
                        res.status(500).json(output);
                    }
                });

            } else {
                var output = "Forbidden.You are not an admin."
                res.status(403).send(output);
            }
        }
    })
});

// ADD NEW CATEGORY
app.post('/newcategory/:uid', isLoggedInMiddleware, function (req, res) {
    var userid = req.params.uid;
    var data = {
        catname: req.body.catname,
        description: req.body.description
    }

    if (isNaN(userid)) {
        var output = "Unauthorised.You are not logged in as user."
        res.status(400).send(output);
        return;
    }

    console.log("Decoded");
    console.log(req.decodedToken);
    console.log("userid from token: " + req.decodedToken.userid);
    console.log("userid given: " + userid);

    if (userid !== req.decodedToken.userid) {
        var output = "Forbidden.You are not the user for this token.";
        res.status(403).send(output);
        return;
    }

    users.check(userid, function (err, result) {
        // this is matched callback(error,null)
        if (err) {
            var output = "There's an error when I check for userid in database.";
            res.status(500).send(output);
            return;
        } else {
            // this is matched callback(null,result)
            console.log(JSON.stringify(result.type));
            if (result.type == "admin") {
                category.insert(data, function (err, result) {
                    if (err) {
                        if (err.errno == 1062) {
                            var output = "Unprocessable Entity";
                            res.status(422).json(output);
                        } else {
                            var output = "Internal Server Error";
                            res.status(500).json(output);
                        }
                    } else {
                        var output = { "success": true };
                        res.status(201).json(output);
                    }
                });

            } else {
                var output = "Forbidden.You are not an admin."
                res.status(403).send(output);
            }
        }
    })
});

// GET ALL CATEGORIES
app.get('/categories/', function (req, res) {
    category.getAll(function (err, result) {
        if (!err) {
            res.json(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// GET GAME & REVIEW BY ID
app.get('/game/:id/review', function (req, res) {
    var gameid = req.params.id;

    review.getByID(gameid, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// ADD NEW REVIEW
app.post('/user/:uid/game/:gid/review/', isLoggedInMiddleware, function (req, res) {
    var userid = req.params.uid;
    var gameid = req.params.gid;
    var data = {
        content: req.body.content,
        rating: req.body.rating,
    };

    if (isNaN(userid)) {
        var output = "Unauthorised.You are not logged in as user."
        res.status(400).send(output);
        return;
    }

    console.log("Decoded");
    console.log(req.decodedToken);
    console.log("userid from token: " + req.decodedToken.userid);
    console.log("userid given: " + userid);

    if (userid !== req.decodedToken.userid) {
        var output = "Forbidden.You are not the user for this token.";
        res.status(403).send(output);
        return;
    }

    review.add(userid, gameid, data, function (err, result) {
        if (!err) {
            var output = { "success": true };
            res.status(201).send(output);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });


});

app.get('/games/:platform', function (req, res) {
    var platform = req.params.platform;
    game.findAll(platform, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// -------------------------------------------------------------------

// QUESTION 1
app.get('/users/', function (req, res) {
    users.findAll(function (err, result) {
        if (!err) {
            console.log(result)
            res.json(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 2 
app.post('/users/', function (req, res) {
    var data = {
        username: req.body.username,
        email: req.body.email,
        type: req.body.type,
        profile_pic_url: req.body.profile_pic_url
    };

    users.insert(data, function (err, result) {
        if (!err) {
            res.status(201).send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 3
app.get('/users/:id/', function (req, res) {
    var id = req.params.id;

    users.findByID(id, function (err, result) {
        if (!err) {
            if (result == null) {
                var output = "Internal Server Error";
                res.status(500).json(output);
            }
            else {
                res.status(200).send(result);
            }
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 4 
app.post('/category', function (req, res) {
    var data = {
        catname: req.body.catname,
        description: req.body.description,
    };

    category.insert(data, function (err, result) {
        if (!err) {
            if (result == null) {
                var output = "Unprocessable Entity";
                res.status(422).json(output);
            } else {
                res.status(204).send(result);
            }
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 5 
app.put('/category/:id', function (req, res) {
    var catid = req.params.id;
    var data = {
        catname: req.body.catname,
        description: req.body.description,
    }

    category.update(catid, data, function (err, result) {
        if (err) {
            if (err.errno == 1062) {
                var output = "Unprocessable Entity";
                res.status(422).json(output);
            } else {
                var output = "Internal Server Error";
                res.status(500).json(output);
            }
        } else {
            res.status(204).send(result);
        }
    });
});

// QUESTION 6
app.post('/game', function (req, res) {
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        categoryid: req.body.categoryid,
        year: req.body.year,
    };

    game.insert(data, function (err, result) {
        if (!err) {
            res.status(201).send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 7
app.get('/games/:platform', function (req, res) {
    var platform = req.params.platform;
    game.findAll(platform, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 8 
app.delete('/game/:id', function (req, res) {
    var gameid = req.params.id;

    game.delete(gameid, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 9
app.put('/game/:id', function (req, res) {
    var gameid = req.params.id;
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        categoryid: req.body.categoryid,
        year: req.body.year,
    }

    game.update(gameid, data, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 10
app.post('/user/:uid/game/:gid/review/', function (req, res) {
    var userid = req.params.uid;
    var gameid = req.params.gid;
    var data = {
        content: req.body.content,
        rating: req.body.rating,
    };

    review.add(userid, gameid, data, function (err, result) {
        if (!err) {
            res.status(201).send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// QUESTION 11
app.get('/game/:id/review', function (req, res) {
    var gameid = req.params.id;

    review.findByID(gameid, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            var output = "Internal Server Error";
            res.status(500).json(output);
        }
    });
});

// exports
module.exports = app;
