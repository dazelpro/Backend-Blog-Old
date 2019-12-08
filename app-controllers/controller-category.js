const database      = require('../app-config/database');
const slug          = require('slug');
module.exports ={
    categoryAll(req,res){
        database.query('SELECT * FROM tbl_category', function (error, results) {
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
    categoryAdd(req,res){        
        let name    = req.body.category_name;
        let slugs   = slug(req.body.category_name, {lower: true});
        database.query("INSERT INTO tbl_category SET ? ", { 
            category_name: name, 
            category_slug: slugs,
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
    categoryUpdate(req,res){
        let id    = req.body.category_id;
        let name  = req.body.category_name;
        let slugs = slug(req.body.category_name, {lower: true});
        database.query('UPDATE tbl_category SET category_name = ?, category_slug = ? WHERE category_id = ?', [name,slugs,id], function (error, results) {
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
    categoryDelete(req,res){
        let id = req.body.category_id;
        database.query('DELETE FROM tbl_category WHERE category_id = ?', [id], function (error, results) {
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