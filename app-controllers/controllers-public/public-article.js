const database      = require('../../app-config/database');

module.exports = {
    getArticleDashboard (req, res) { //Filter 6 Articles
        database.query(
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
    }
};