module.exports = function (app) {
    var passport = app.get('passport');
    var bcrypt = app.get('bcrypt');
    var LocalStrategy = app.get('LocalStrategy');

    console.log(bcrypt.hashSync(123456));

    passport.use(new LocalStrategy(function(username, password, done) {
        var connection = app.infra.connectionFactory();
        var LoginDAO = new app.infra.LoginDAO(connection);
        LoginDAO.getUser(username, function (err, result) {
            var user = result;
            if(user.length > 0) {
                if(!bcrypt.compareSync(password, user[0].password)) {
                    return done(null, false, {message: 'Invalid username or password'});
                } else {

                    var str = JSON.stringify(user[0]);
                    user = JSON.parse(str);

                    return done(null, user);
                }
            } else {
                return done(null, false, {message: 'Invalid username or password'});
            }

        });
        connection.end();
    }));

    passport.serializeUser(function(data, done) {
        done(null, data);
    });

    passport.deserializeUser(function(data, done) {
        var connection = app.infra.connectionFactory();
        var LoginDAO = new app.infra.LoginDAO(connection);
        LoginDAO.getUser(data.email, function (err, result) {

            var str = JSON.stringify(result);
            result = JSON.parse(str);

            done(null,result);
        });
        connection.end();
    });
};
