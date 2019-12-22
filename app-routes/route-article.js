const router            = require('express').Router();
const articleController = require('../app-controllers/controller-index').article;

router.post('/post-article', articleController.postingArticle);
router.post('/edit-article', articleController.editArticle);
router.get('/show-article-all', articleController.getArticle);
router.get('/show-article-detail/:id', articleController.getArticleDetail);
module.exports = router;