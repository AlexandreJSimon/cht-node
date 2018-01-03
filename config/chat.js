module.exports = function (io,app) {
    io.use(app.get('sharedsession')(app.get('session')));

    io.on("connection", function(socket) {
        console.log("Usuario Conectado");

        socket.on('chat message', function(msg){
            var userdata = socket.handshake.session.userdata;
            msg = userdata.name+' : '+ msg;
            io.emit('chat message', msg);
        });

        socket.on("setName", function(name) {
            var msg = 'Usuario '+name+' Conectado';
            var userOnline = {'id':socket.id, 'name':name};
            io.emit('chat message', msg);
            io.emit('user online',userOnline);

            var connection = app.infra.connectionFactory();
            var ChatDAO = new app.infra.ChatDAO(connection);

            ChatDAO.salva([name,socket.id],function (erros,resultados) {});

            connection.close();

            socket.handshake.session.userdata = {'id': socket.id, 'name': name};
            socket.handshake.session.save();
        });

        socket.on("disconnect", function(){
            var userdata = socket.handshake.session.userdata;
            if(userdata){
                var msg = 'Usuario '+userdata.name+' Desconectado';
                io.emit('chat message', msg);
                io.emit('user offline', userdata.id);

                var connection = app.infra.connectionFactory();
                var ChatDAO = new app.infra.ChatDAO(connection);

                ChatDAO.deleta(socket.id,function (erros,resultados) {});

                connection.close();

                delete socket.handshake.session.userdata;
                socket.handshake.session.save();
            }
            console.log("Usuario Desconectado");

        });

        socket.on('send private message', function(data) {
            var userdata = socket.handshake.session.userdata;
            var msg = userdata.name+' : '+ data.msg;
            socket.to(data.socketId).emit('send private message',msg);
        });


    });
};
