const database      = require('../app-config/database');
const md5           = require('md5');

module.exports ={
    userAll(req,res){
        database.query('SELECT user_id, user_name, user_email FROM tbl_user', function (error, results) {
        if(error)
            return res.status(400).send({
                success: false,
                message: error
            });
            return res.status(200).send({
                success: true,
                data: results
            });
        }); 
    },
    userAdd(req,res){        
        let user_name    = req.body.user_name;
        let user_email   = req.body.user_email;
        let user_password= md5(req.body.user_pass);
        database.query("INSERT INTO tbl_user SET ? ", { 
            user_name: user_name,
            user_email: user_email,
            user_password: user_password,
        }, function (error, results) {
        if(error)
            return res.status(400).send({
                success: false,
                message: error
            });
            return res.status(200).send({
                success: true,
                data: results
            });
        }); 
    },
    userUpdate(req,res){
        let id    = req.body.user_id;
        let name  = req.body.user_name;
        let slugs = slug(req.body.user_name, {lower: true});
        database.query('UPDATE tbl_user SET user_name = ?, user_slug = ? WHERE user_id = ?', [name,slugs,id], function (error, results) {
        if(error)
            return res.status(400).send({
                success: false,
                message: error
            });
            return res.status(200).send({
                success: true,
                data: results
            });
        });
    },
    userDelete(req,res){
        let id = req.body.user_id;
        database.query('DELETE FROM tbl_user WHERE user_id = ?', [id], function (error, results) {
        if(error)
            return res.status(400).send({
                success: false,
                message: error
            });
            return res.status(200).send({
                success: true,
                data: results
            });
        }); 
	}
};