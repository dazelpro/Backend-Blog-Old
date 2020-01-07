const mysql         = require('mysql');
// const connection    = mysql.createConnection({
//     multipleStatements  : true,
//     host                : 'localhost',
//     user                : 'root',
//     password            : '',
//     database            : 'db_go_blog'
// });
const connection    = mysql.createConnection({
    multipleStatements  : true,
    host                : 'remotemysql.com',
    user                : 'MmAYJmLRyJ',
    password            : 'i4bArzUxlo',
    database            : 'MmAYJmLRyJ'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connect To database...');
});

module.exports = connection;