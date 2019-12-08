const router            = require('express').Router();
const articleController = require('../app-controllers/controller-index').article;

router.post('/post-article', articleController.postingArticle);
router.get('/show-article-all', articleController.getArticle);
module.exports = router;