const router            = require('express').Router();
const accountController = require('../app-controllers/controller-index').account;

router.get('/', accountController.getAccount);
module.exports = router;