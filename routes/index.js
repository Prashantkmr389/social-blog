var express = require('express');
var router = express.Router();

// for users
router.use('/users', require('./users'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
})

// signup and signin pages

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
})

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Signin' });
})

router.get('/signout', function(req, res, next) {
  res.render('signout', { title: 'Signout' });
})

module.exports = router;
