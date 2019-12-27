const router            = require('express').Router();
const articleController = require('../../app-controllers/controllers-public/public-index').article;

router.post('/add-visitor', articleController.addVisitorArticle);

router.get('/show-article-dashboard', articleController.getArticleDashboard);
router.get('/show-article-detail/:slug', articleController.getArticleDetail);
module.exports = router;