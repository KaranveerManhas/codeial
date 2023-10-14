const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require('../controller/comment_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);


module.exports = router;