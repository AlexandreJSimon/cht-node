var mysql = require('mysql');

function createDBConnection() {
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host : 'us-cdbr-iron-east-03.cleardb.net',
            user : 'bdfb70cb56f0f5',
            password : '4c9699d8',
            database : 'heroku_8186b6c545153e6'
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