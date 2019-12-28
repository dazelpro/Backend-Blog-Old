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
    host                : 'sql12.freesqldatabase.com',
    user                : 'sql12316395',
    password            : 'kfG8ThjiHv',
    database            : 'sql12316395'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connect to database...');
});

module.exports = connection;