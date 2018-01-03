function ChatDAO(connection) {
    this._connection = connection;
}

ChatDAO.prototype.lista = function (callback) {
    this._connection.all('SELECT * FROM users', callback);
};

ChatDAO.prototype.salva = function (user,callback) {
    var stmt = this._connection.prepare("INSERT INTO users VALUES (null,?,?)");
    stmt.run(user[0],user[1]);
    stmt.finalize();
};

ChatDAO.prototype.deleta = function (user,callback) {
    var stmt = this._connection.prepare("DELETE FROM users WHERE socketId = ?");
    stmt.run(user);
    stmt.finalize();
};

module.exports = function () {
    return ChatDAO;
};