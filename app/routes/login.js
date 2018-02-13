module.exports = function (app) {
    app.get('/',function (req,res) {
        res.render('login/index');
    });

    app.post('/',function (req,res) {
        app.get('passport').authenticate('local', {
            successRedirect: '/chat',
            failureRedirect: '/',
            failureFlash: true
        })(req, res);
    });
};
