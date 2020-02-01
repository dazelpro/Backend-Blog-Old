const router    = require('express').Router();
const config    = require('../app-config/database');

const path          = require('path');
const multer        = require('multer');
const randomstring  = require("randomstring");
const dirUpload     = './app-upload';
const slug          = require('slug');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dirUpload);
    },
    filename: function (req, file, cb) {
        cb(null, randomstring.generate() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Gambar se yang buliah nyo'))
        }
        callback(null, true)
    }
});

const uploadFile = upload.single('image');

let mysql = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

router.post('/post-article', function (req, res) {
    uploadFile (req, res, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(req, res)
            let slugs   = slug(req.body['title'], {lower: true});
            database.query(`INSERT INTO tbl_article SET ?`, {
                article_title   : req.body['title'],
                article_slug    : slugs,
                article_category: req.body['category'],
                article_content : req.body['content'],
                article_images  : req.file.filename,
                article_postby  : req.body.postby
            },
            function (error, results) {
                if(error)
                    return res.status(400).send({
                        success: false,
                        message:error
                });
                return res.status(200).send({
                    success: true,
                    data: results
                });
            });
        }
    })
});

// router.post('/post-article', function (req, res) {
//     let slugs   = slug(req.body['title'], {lower: true});
//     let datePost= new Date();
    
//     pool.getConnection(function(err, connection) {
//         if (err) throw err;
//         connection.query("INSERT INTO tbl_article SET ? ", { 
//             article_date    : datePost,
//             article_title   : req.body['title'],
//             article_slug    : slugs,
//             article_category: req.body['category'],
//             article_content : req.body['content'],
//             article_description : req.body['description'],
//             article_keyword : req.body['keyword'],
//             article_images  : req.body['filename'],
//             article_postby  : req.body.postby,
//             article_status  : req.body['status'],
//         }, function (error, results) {
//         if(error)
//             return res.status(400).send({
//                 success: false,
//                 message: error
//             });
//             return res.status(200).send({
//                 success: true,
//                 data: results
//             });
//         });
//         connection.release();
//     })
// });

router.post('/edit-article', function (req, res) {
    let id    = req.body['id'];
    let title  = req.body['title'];
    let content  = req.body['content'];
    let description  = req.body['description'];
    let keyword  = req.body['keyword'];
    let filename  = req.body['filename'];
    let status  = req.body['status'];
    let slugs = slug(req.body['title'], {lower: true});

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('UPDATE tbl_article SET article_title = ?, article_slug = ?, article_content = ?, article_description = ?, article_keyword = ?, article_images = ?, article_status = ? WHERE article_id = ?', [title,slugs,content,description,keyword,filename,status,id], function (error, results) {
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

router.post('/delete-article', function (req, res) {
    let id = req.body.article_id;

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('DELETE FROM tbl_article WHERE article_id = ?', [id], function (error, results) {
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

router.get('/show-article-all', function (req, res) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(
            `
            SELECT 
                article_title
                , article_id
                , category_name
                , user_name
                , article_view
                , article_date 
            FROM tbl_article 
                JOIN tbl_category 
            ON article_category = category_id 
                JOIN tbl_user 
            ON article_postby = user_id
            ORDER BY article_date DESC
            `
            , function (error, results) {
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

router.get('/show-article-detail/:id', function (req, res) {
    let id = req.params['id'];

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(
            `
            SELECT 
                article_title
                , article_id
                , article_content
                , article_description
                , article_keyword
                , category_name
                , user_name
                , article_view
                , article_date 
                , article_images
            FROM tbl_article 
                JOIN tbl_category 
            ON article_category = category_id 
                JOIN tbl_user 
            ON article_postby = user_id
            WHERE article_id = '${id}'
            `
        , function (error, results) {
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