const router    = require('express').Router();
const config    = require('../app-config/database');
const slug      = require('slug');

let mysql = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

router.get('/show-category', function (req, res) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM tbl_category', function (error, results) {
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
        connection.release();
    })
});

router.post('/add-category', function (req, res) {
    let name    = req.body.category_name;
    let slugs   = slug(req.body.category_name, {lower: true});

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("INSERT INTO tbl_category SET ? ", { 
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
        connection.release();
    })
});

router.post('/delete-category', function (req, res) {
    let id = req.body.category_id;

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('DELETE FROM tbl_category WHERE category_id = ?', [id], function (error, results) {
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
        connection.release();
    })
});

router.post('/update-category', function (req, res) {
    let id    = req.body.category_id;
    let name  = req.body.category_name;
    let slugs = slug(req.body.category_name, {lower: true});

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('UPDATE tbl_category SET category_name = ?, category_slug = ? WHERE category_id = ?', [name,slugs,id], function (error, results) {
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
        connection.release();
    })
});

module.exports = router;