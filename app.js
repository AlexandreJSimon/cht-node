var app = require('./config/express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);

require('./config/passport')(app);
require('./config/chat')(io,app);

var port = process.env.PORT || 3000;

http.listen(port, function(){
    console.log('listening on *:3000');
});