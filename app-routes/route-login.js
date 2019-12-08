const router            = require('express').Router();
const accountController = require('../app-controllers/controller-index').account;

router.post('/', accountController.signin);
module.exports = router;