const express = require('express');
const router= express.Router();

const {dashboard,login} = require('../controllers/main');

router.route('/dashboard').get(dashboard);
router.route('/login').post(login);

module.exports = router;