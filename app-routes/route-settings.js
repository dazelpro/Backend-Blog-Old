const router    = require('express').Router();
const config    = require('../app-config/database');

let mysql = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

router.get('/show-setting-site/:id', function (req, res) {
    let id = req.params['id'];

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM tbl_site_setting WHERE id='${id}'`, function (error, results) {
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

router.post('/update-setting-site', function (req, res) {
    let site_title          = req.body.site_title;
    let site_description    = req.body.site_description;
    let site_keyword         = req.body.site_keyword;
    let site_author         = req.body.site_author;

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('UPDATE tbl_site_setting SET site_title = ?, site_description = ?, site_keyword = ?, site_author = ? WHERE id = 1', [site_title,site_description,site_keyword,site_author], function (error, results) {
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