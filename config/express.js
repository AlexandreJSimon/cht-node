var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

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

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    //session
    app.use(session);
    app.set('session', session);
    app.set('sharedsession', sharedsession);

    // app.get('io').use(sharedsession(session));

    load('routes',{cwd: 'app'})
        .then('infra')
        .into(app);

    return app;
};