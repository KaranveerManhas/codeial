const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controller/users_controller');
const resetPasswordController = require('../controller/reset_password_controller');


router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.get('/friend/:id', usersController.checkFriend);
router.post('/friend/add/:id', usersController.addFriend);
router.post('/friend/remove/:id', usersController.removeFriend);
// Use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
    ), usersController.createSession);

router.post('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);

router.get('/reset-password', resetPasswordController.home);
router.post('/reset-password/send-email', resetPasswordController.createAccessToken);
router.get('/reset-password/reset', resetPasswordController.newPassword);
router.post('/reset-password/update/:id', resetPasswordController.updatePassword);

module.exports = router;
