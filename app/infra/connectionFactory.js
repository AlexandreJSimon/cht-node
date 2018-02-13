var mysql = require('mysql');

function createDBConnection() {
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'cht_db'
        });
    }
    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'cht_db'
        });
    }
}

//wrapper
module.exports = function () {
    return createDBConnection;
};