var express = require('express');
var load = require('express-load');
var expressValidator = require('express-validator');

var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

var crypto = require('crypto');

var session = require("express-session")({
    secret: "wlqkleqw920t",
    resave: true,
    saveUninitialized: true
});

var sharedsession = require("express-socket.io-session");

module.exports = function () {
    var app = express();

    app.use(express.static('./app/assets'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(cookieparser());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    //session
    app.use(session);
    app.set('session', session);
    app.set('sharedsession', sharedsession);

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    //login
    app.set('passport',passport);
    app.set('bcrypt',bcrypt);
    app.set('LocalStrategy',LocalStrategy);

    app.set('crypto',crypto);

    load('routes',{cwd: 'app'})
        .then('infra')
        .into(app);

    return app;
};