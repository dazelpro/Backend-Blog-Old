const router                = require('express').Router();
const categoryController    = require('../app-controllers/controller-index').category;

router.get('/show-category', categoryController.categoryAll);
router.post('/add-category', categoryController.categoryAdd);
router.post('/delete-category', categoryController.categoryDelete);
router.post('/update-category', categoryController.categoryUpdate);
module.exports = router;