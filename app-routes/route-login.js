const jwt			= require('jsonwebtoken');
const md5           = require('md5');
const { jwtSecret }	= require('../app-config/jwt');

const router   = require('express').Router();
const config   = require('../app-config/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

router.post('/', function (req, res) {
    try{
        let email = req.body['email'];
        let password = md5(req.body['password']);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM tbl_user WHERE user_email = ? AND user_password = ?', [email, password], function (error, results) {
                if (results.length > 0){
                    var token = jwt.sign({
                            user: results[0]['user_id']
                        }, jwtSecret, {
                            expiresIn: '1d'
                        });
                        return res.status(200).send({
                            success: true,
                            token: 'Bearer'+ ' '+token
                        });
                } else {
                    return res.status(400).send({
                        success: false,
                        message: 'Either your Email or Password is incorrect. Please try again'
                    });
                }
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