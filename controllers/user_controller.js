const { connect } = require('mongoose');
const User = require('../models/users');

module.exports.about = function(req, res){
    return res.render('about', {
        title: "About"
    });
}

// signup and signin pages

module.exports.signup = function(req, res){
    return res.render('signup', {
        title: "Signup"
    });
}

module.exports.signin = function(req, res){
    return res.render('signin', {
        title: "Signin"
    });
}

module.exports.signout = function(req, res){
    return res.render('signout', {
        title: "Signout"
    });
}

// get the sign up data

module.exports.create = async function(req, res){

    try{
        console.log(req.body);
        if(req.body.password != req.body.confirm_password){
            console.log('Password does not match')
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create(req.body);
            return res.redirect('/user/signin');
        }
        else{
            console.log('User already exists');
            return res.redirect('back');
        }

    }
    catch(err){
        console.log('Error', err);
        return;
    }
}


module.exports.about = function(req, res){
    return res.render('about', {
        title: "About",
        
    });
}