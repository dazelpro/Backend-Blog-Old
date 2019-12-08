const database      = require('../app-config/database');
const path          = require('path');
const multer        = require('multer');
const randomstring  = require("randomstring");
const dirUpload     = './app-assets/upload';
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
    postingArticle (req, res) {
        uploadFile (req, res, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(req.body)
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
    },
    getArticle (req, res) {
        database.query(`SELECT article_title, category_name, user_name, article_view FROM tbl_article JOIN tbl_category ON article_category = category_id JOIN tbl_user ON article_postby = user_id`, function (error, results) {
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
