module.exports = function (app) {
    app.get('/chat',function (req,res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ChatDAO(connection);
        produtosDAO.lista(function (err, result) {
            // if(err){
            //     return next(err);
            // }
            res.format({
                html : function () {
                    res.render('chat/index',{users : result});
                },
                json: function () {
                    res.json(result);
                }
            });
        });
        connection.close();
    });
};