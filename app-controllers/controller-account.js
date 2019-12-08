const jwt			= require('jsonwebtoken');
const md5           = require('md5');
const database      = require('../app-config/database');
const { jwtSecret }	= require('../app-config/jwt');

module.exports ={
    signin(req,res){
        try{
            let email = req.body['email'];
            let password = md5(req.body['password']);
            database.query('SELECT * FROM tbl_user WHERE user_email = ? AND user_password = ?', [email, password], function (error, results) {
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
		}catch(error){
			return res.status(400).send({
				success: false,
				message: error
			});
		}
    },
    getAccount(req,res){
        try{
            let id = req.decoded[0]['user_id'];
            database.query('SELECT user_id, user_email, user_name FROM tbl_user WHERE user_id = ?',[id], function (error, results) {
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
		}catch(error){
			return res.status(400).send({
				success: false,
				message: error
			});
		}
    }
};