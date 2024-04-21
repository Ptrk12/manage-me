"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userType_1 = require("../types/userType");
var express = require("express");
var cors = require('cors');
var app = express();
var jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
var users = [new userType_1.default("patryk", "bajak", "haslo123"), new userType_1.default("test1", "test2", "haslo123")];
var refreshTokens = [];
app.post("/api/refresh", function (req, res) {
    var refreshToken = req.body.token;
    if (!refreshToken)
        return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", function (err, user) {
        err && console.log(err);
        refreshTokens = refreshTokens.filter(function (token) { return token !== refreshToken; });
        var newAccessToken = generateAccessToken(user);
        var newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
});
var generateAccessToken = function (user) {
    return jwt.sign({ username: user.username, role: user.role }, "mySecretKey", {
        expiresIn: "25s",
    });
};
var generateRefreshToken = function (user) {
    return jwt.sign({ username: user.username, role: user.role }, "myRefreshSecretKey");
};
app.post("/api/login", function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    var user = users.find(function (u) {
        return u.username === username && u.password === password;
    });
    if (user) {
        var accessToken = generateAccessToken(user);
        var refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.json({
            username: user.username,
            role: user.role,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }
    else {
        res.status(400).json("Username or password incorrect!");
    }
});
var verify = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(" ")[1];
        jwt.verify(token, "mySecretKey", function (err, user) {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json("You are not authenticated!");
    }
};
app.get("/api/projects", verify, function (req, res) {
    if (req.user.role !== null) {
        res.status(200).json("Success");
    }
    else {
        res.status(403).json("You are not allowed to do that");
    }
});
app.post("/api/logout", verify, function (req, res) {
    var refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(function (token) { return token !== refreshToken; });
    res.status(200).json("You logged out successfully.");
});
app.listen(5000, function () {
    console.log("Backend server running on port 5000");
});
