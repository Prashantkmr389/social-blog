var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/user_controller');
const passport = require('passport');

/* GET users listing. */
router.get("/about/:id", user_controller.about);

router.get("/signup", user_controller.signup);
router.get("/signin", user_controller.signin);
router.get("/signout", user_controller.signout);

router.post("/create", user_controller.create);
router.post("/update/:id", user_controller.update);


// use passport as a middleware to authenticate

router.post("/create-session",passport.authenticate("local", {failureRedirect : "/user/signin"}), user_controller.createSession);

// router.get("/signout", user_controller.signout);

router.get("/add/:id", user_controller.add);
router.get("/remove/:id", user_controller.remove);

module.exports = router;
