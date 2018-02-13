function LoginDAO(connection) {
    this._connection = connection;
}

LoginDAO.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM users',callback);
};

LoginDAO.prototype.salva = function (user,callback) {
    this._connection.query('INSERT INTO users SET ?',user,callback);
};

LoginDAO.prototype.getUser = function (user,callback) {
    this._connection.query('SELECT * FROM users WHERE email = ?',user,callback);
};

module.exports = function () {
    return LoginDAO;
};