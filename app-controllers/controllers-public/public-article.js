const config   = require('../../app-config/database');

let mysql      = require('mysql');
let pool  = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    getArticleDashboard (req, res) { //Filter 6 Articles
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT 
                    article_id
                    ,article_date
                    ,article_title
                    ,article_slug
                    ,category_name
                    ,user_name
                    ,article_view
                    ,article_images
                FROM
                    tbl_article
                JOIN
                    tbl_category
                ON article_category = category_id
                JOIN
                    tbl_user ON article_postby = user_id
                WHERE tbl_article.article_status = 1
                ORDER BY article_date DESC LIMIT 6
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
        
    },
    getArticleDetail (req, res) {
        let slug = req.params['slug'];
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT 
                    article_id
                    ,article_date
                    ,article_title
                    ,article_slug
                    ,article_content
                    ,article_description
                    ,article_keyword
                    ,category_name
                    ,user_name
                    ,article_view
                    ,article_images
                FROM
                    tbl_article
                JOIN
                    tbl_category
                ON article_category = category_id
                JOIN
                    tbl_user ON article_postby = user_id
                WHERE article_slug = '${slug}' 
                AND article_status = 1;
        
                UPDATE 
                    tbl_article 
                SET 
                    article_view = article_view + 1 
                WHERE article_slug ='${slug}';
        
                SELECT 
                *
                FROM tbl_article 
                WHERE tbl_article.article_status = 1
                ORDER BY article_view DESC LIMIT 6;
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
    }
    // addVisitorArticle (req, res) {
    //     let slug = req.body['slug'];
    //     database.query('UPDATE tbl_article SET article_view = article_view + 1 WHERE article_slug = ?', [slug], function (error, results) {
    //     if(error)
    //         return res.status(400).send({
    //             success: false,
    //             message: error
    //         });
    //         return res.status(200).send({
    //             success: true,
    //             data: results
    //         });
    //     });
    // }
};
