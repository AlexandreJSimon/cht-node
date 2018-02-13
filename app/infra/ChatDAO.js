function ChatDAO(connection) {
    this._connection = connection;
}

ChatDAO.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM users',callback);
};

ChatDAO.prototype.salva = function (user,callback) {
    this._connection.query('INSERT INTO users SET ?',user,callback);
};

ChatDAO.prototype.updateUser = function (user,id,callback) {
    this._connection.query('UPDATE users SET ? WHERE id = ?',[user,id],callback);
};

ChatDAO.prototype.salvaMsg = function (from,to,msg,callback) {
    this._connection.query('INSERT INTO msg (idFrom,idTo,msg) VALUES (?,?,?)',[from,parseInt(to),msg],callback);
};

ChatDAO.prototype.getMsg = function (from,to,callback) {
    this._connection.query('SELECT msg.*,users.name FROM msg INNER JOIN users ON users.id = msg.idFrom WHERE msg.idFrom IN (?,?) AND msg.idTo IN (?,?) ORDER BY msg.id',[parseInt(from),parseInt(to),parseInt(from),parseInt(to)],callback);
};

ChatDAO.prototype.updateStatus = function (data,user,callback) {
    this._connection.query('UPDATE users SET status = ? WHERE id = ?',[data,user],callback);
};

ChatDAO.prototype.deleta = function (user,callback) {
    this._connection.query('DELETE FROM users WHERE socketId = ?',user,callback);
};

module.exports = function () {
    return ChatDAO;
};