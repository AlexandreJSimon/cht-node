module.exports = function (io,app) {
    var users = [];
    io.use(app.get('sharedsession')(app.get('session')));

    io.on("connection", function(socket) {
        console.log("Usuario Conectado");

        var userdata = socket.handshake.session.passport;
        if(typeof userdata !== 'undefined' && typeof userdata.user !== 'undefined' && userdata.user){
            users[userdata.user.id] = socket.id;
            io.emit('connected', userdata.user.id);
            var connection = app.infra.connectionFactory();
            var ChatDAO = new app.infra.ChatDAO(connection);
            ChatDAO.updateStatus(1, userdata.user.id);
            connection.end();
        }else{
            io.emit('redirect','/');
        }
        // console.log(users);

        socket.on('chat message', function(data){
            var userdata = socket.handshake.session.passport.user;
            var msg = userdata.name+' : '+ data.msg;
            socket.to(users[data.to]).emit('chat message', {'msg':msg,'from':userdata.id});
            var connection = app.infra.connectionFactory();
            var ChatDAO = new app.infra.ChatDAO(connection);
            ChatDAO.salvaMsg(userdata.id,data.to,data.msg);
            connection.end();
        });

        socket.on('typing',function (data) {
            socket.to(users[data.id]).emit('typing',data.typing);
        });

        socket.on("disconnect", function(){
            if(users){
                var connection = app.infra.connectionFactory();
                var ChatDAO = new app.infra.ChatDAO(connection);
                for(var key in users){
                    if(users[key] == socket.id){
                        ChatDAO.updateStatus(0, key);
                        var userDisconected = key;
                    }
                }
                connection.end();
                io.emit('disconnected', userDisconected);
                console.log("Usuario Desconectado");

            }
        });

    });
};
