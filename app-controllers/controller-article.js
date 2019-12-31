const database      = require('../app-config/database');
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

module.exports = {
    // postingArticle (req, res) {
    //     uploadFile (req, res, function (err) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(req, res)
    //             let slugs   = slug(req.body['title'], {lower: true});
    //             database.query(`INSERT INTO tbl_article SET ?`, {
    //                 article_title   : req.body['title'],
    //                 article_slug    : slugs,
    //                 article_category: req.body['category'],
    //                 article_content : req.body['content'],
    //                 article_images  : req.file.filename,
    //                 article_postby  : req.body.postby
    //             },
    //             function (error, results) {
    //                 if(error)
    //                     return res.status(400).send({
    //                         success: false,
    //                         message:error
    //                 });
    //                 return res.status(200).send({
    //                     success: true,
    //                     data: results
    //                 });
    //             });
    //         }
    //     })
    // },
    postingArticle (req, res) {
        let slugs   = slug(req.body['title'], {lower: true});
        let datePost= new Date();
        database.query("INSERT INTO tbl_article SET ? ", { 
            article_date    : datePost,
            article_title   : req.body['title'],
            article_slug    : slugs,
            article_category: req.body['category'],
            article_content : req.body['content'],
            article_description : req.body['description'],
            article_keyword : req.body['keyword'],
            article_images  : req.body['filename'],
            article_postby  : req.body.postby,
            article_status  : req.body['status'],
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
    editArticle (req, res) {
        let id    = req.body['id'];
        let title  = req.body['title'];
        let content  = req.body['content'];
        let description  = req.body['description'];
        let keyword  = req.body['keyword'];
        let filename  = req.body['filename'];
        let status  = req.body['status'];
        let slugs = slug(req.body['title'], {lower: true});        
        console.log(req.body['title'], id)
        database.query('UPDATE tbl_article SET article_title = ?, article_slug = ?, article_content = ?, article_description = ?, article_keyword = ?, article_images = ?, article_status = ? WHERE article_id = ?', [title,slugs,content,description,keyword,filename,status,id], function (error, results) {
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
    getArticle (req, res) {
        database.query(
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
    },
    getArticleDetail (req, res) {
        let id = req.params['id'];
        database.query(
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
    }
};
