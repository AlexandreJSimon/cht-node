module.exports = function (app) {
    app.get('/',function (req,res) {
        res.render('login/index');
    });

    app.post('/',function (req,res) {
        res.redirect('/chat');
    });
};