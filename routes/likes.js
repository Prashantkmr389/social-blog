const express = require('express');
const router = express.Router();
const passport = require('passport');
const like_controller = require('../controllers/like_controller');

router.post(
  "/toggle",
  passport.checkAuthentication,
  like_controller.toggleLike
);

module.exports = router;