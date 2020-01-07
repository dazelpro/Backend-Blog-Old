const mysql         = require('mysql');
// const connection    = mysql.createConnection({
//     multipleStatements  : true,
//     host                : 'localhost',
//     user                : 'root',
//     password            : '',
//     database            : 'db_go_blog'
// });

// var conn;
// function handleDisconnect() {
//     conn = mysql.createConnection({
//         host: 'remotemysql.com',
//         user: 'MmAYJmLRyJ',
//         password: 'i4bArzUxlo',
//         database: 'MmAYJmLRyJ'
//     });

//     conn.connect(function(err) {    
//         console.log('Connect To database...');
//         if(err) {
//         console.log('error when connecting to db:', err);
//         setTimeout(handleDisconnect, 2000); 
//         }                               
//     });                                   

//     conn.on('error', function(err) {
//         console.log('db error', err);
//         if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//         handleDisconnect();                         
//         } else {                                      
//         throw err;                                  
//         }
//     });
// }

const connection    = mysql.createConnection({
    multipleStatements  : true,
    host                : 'remotemysql.com',
    user                : 'MmAYJmLRyJ',
    password            : 'i4bArzUxlo',
    database            : 'MmAYJmLRyJ'
});

connection.connect(function(err) {
    console.log('Connect To database...');
    if(err) {
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
    }                               
});

connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        connection;                         
    } else {                                      
    throw err;                                  
    }
});

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('Connect To database...');
// });

module.exports = connection;