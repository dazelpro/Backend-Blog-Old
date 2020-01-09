const router                = require('express').Router();
const settingsController    = require('../app-controllers/controller-index').settings;

router.get('/show-setting-site/:id', settingsController.settingShow);
router.post('/update-setting-site', settingsController.settingUpdate);
module.exports = router;