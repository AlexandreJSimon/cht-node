module.exports = function (app) {
    app.get('/chat',function (req,res) {
        if(!req.isAuthenticated()){
            res.redirect('/');
        } else{
            var connection = app.infra.connectionFactory();
            var ChatDAO = new app.infra.ChatDAO(connection);
            ChatDAO.lista(function (err, result) {

                var str = JSON.stringify(result);
                result = JSON.parse(str);

                res.format({
                    html : function () {
                        res.render('chat/index',{users : result, user : req.user, app: app});
                    },
                    json: function () {
                        res.json(result);
                    }
                });
            });
            connection.end();
        }
    });

    app.get('/editar/user',function (req,res) {
        if(!req.isAuthenticated()){
            res.redirect('/');
        } else{
            var connection = app.infra.connectionFactory();
            var ChatDAO = new app.infra.ChatDAO(connection);
            ChatDAO.lista(function (err, result) {

                var str = JSON.stringify(result);
                result = JSON.parse(str);

                res.format({
                    html : function () {
                        res.render('user/form-edit',{user : req.user});
                    }
                });
            });
            connection.end();
        }
    });

    app.post('/editar/user',function (req,res) {
        var bcrypt = app.get('bcrypt');

        if(!req.isAuthenticated()){
            res.redirect('/');
        } else{
            var data = req.body;

            req.assert('name', 'Nome Não inserido').notEmpty();
            req.assert('email', 'E-mail Não inserido').notEmpty();

            if(data.password){
                data.password = bcrypt.hashSync(data.password);
            }

            var erros = req.validationErrors();
            if(erros){
                res.format({
                    json: function () {
                        res.json(erros);
                        console.log('erro');
                    }
                });
                return;
            }

            var connection = app.infra.connectionFactory();
            var ChatDAO = new app.infra.ChatDAO(connection);

            ChatDAO.updateUser(data,req.query.idUser);
        }
    });

    app.get('/get-msg',function (req,res) {
        if(!req.isAuthenticated()){
            res.redirect('/');
        } else{
            var connection = app.infra.connectionFactory();
            var ChatDAO = new app.infra.ChatDAO(connection);
            ChatDAO.getMsg(req.query.idFrom,req.query.idTo,function (err, result) {
                var str = JSON.stringify(result);
                result = JSON.parse(str);
                res.format({
                    json: function () {
                        res.json(result);
                    }
                });
            });
            connection.end();
        }
    });
};