var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/user_controller');

/* GET users listing. */
router.get("/about", user_controller.about);

router.get("/signup", user_controller.signup);
router.get("/signin", user_controller.signin);
router.get("/signout", user_controller.signout);

router.post("/create", user_controller.create);
module.exports = router;
