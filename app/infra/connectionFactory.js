var sqlite3 = require('sqlite3').verbose();

function createDBConnection() {
    return new sqlite3.Database('./app/infra/sqlite/chat');
}

// var db = new sqlite3.Database('./app/infra/sqlite/chat');
// db.serialize(function() {
//     db.run("CREATE TABLE users (name TEXT)");
//
//     var stmt = db.prepare("INSERT INTO users VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();
//
//     db.each("SELECT rowid AS id, name FROM users", function(err, row) {
//         console.log(row.id + ": " + row.info);
//     });
// });
//
// db.close();
//wrapper
module.exports = function () {
    return createDBConnection;
};