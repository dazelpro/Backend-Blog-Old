const router    = require('express').Router();
const config    = require('../app-config/database');

let mysql = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

router.get('/', function (req, res) {
    try{
        let id = req.decoded[0]['user_id'];
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query('SELECT user_id, user_email, user_name FROM tbl_user WHERE user_id = ?',[id], function (error, results) {
                if(error)
                return res.status(400).send({
                    success: false,
                    message: error
                });
                return res.status(200).send({
                    success: true,
                    data: results[0]
                });
            });
            connection.release();
        })            
    }catch(error){
        return res.status(400).send({
            success: false,
            message: error
        });
    }
});

module.exports = router;