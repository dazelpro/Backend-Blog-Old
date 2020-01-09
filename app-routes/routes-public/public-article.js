const router            = require('express').Router();
const articleController = require('../../app-controllers/controllers-public/public-index').article;

router.get('/show-article-dashboard', articleController.getArticleDashboard);
router.get('/show-article-detail/:slug', articleController.getArticleDetail);
router.get('/show-meta-dashboard', articleController.getMetaDashboard);
module.exports = router;