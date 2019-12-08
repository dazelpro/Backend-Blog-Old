const router                = require('express').Router();
const userController    = require('../app-controllers/controller-index').users;

router.get('/show-user', userController.userAll);
router.post('/add-user', userController.userAdd);
router.post('/delete-user', userController.userDelete);
router.post('/update-user', userController.userUpdate);
module.exports = router;