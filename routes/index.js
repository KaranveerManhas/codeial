const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('Router Loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comment', require('./comments'));
// for any further routes, access from here
// router.use('/routerName', require('./routerFile'));

router.use('/api', require('./api'));

module.exports = router;
