const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');
const passwordResetController = require('../controllers/password_controller');

router.get('/', passwordResetController.home);

router.post('/sendEmail', passwordResetController.sendEmail);

router.post('/submit', passwordResetController.submit)

router.get('/:token', passwordResetController.resetPasswordForm);

router.post("/changePassword", passwordResetController.changePassword);

module.exports = router;
