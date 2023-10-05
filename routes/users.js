const express = require('express');
const router = express.Router();

const usersController = require('../controller/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/create_session', usersController.createSession)
router.post('/end_session', usersController.endSession);


module.exports = router;
