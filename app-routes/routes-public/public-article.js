const router            = require('express').Router();
const articleController = require('../../app-controllers/controllers-public/public-index').article;

router.get('/show-article-dashboard', articleController.getArticleDashboard);
module.exports = router;