const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('Router Loaded');

router.get('/', homeController.home);





module.exports = router;
