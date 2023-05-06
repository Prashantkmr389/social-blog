const { connect } = require('mongoose');
const User = require('../models/user');
const friendship = require('../models/friendship')
const fs = require('fs')
const path = require('path')
module.exports.about = function(req, res){
    return res.render('about', {
        title: "About"
    });
}

// signup and signin pages

module.exports.signup = function(req, res){
    return res.render('signup', {
        title: "Sign Up"
    });
}

module.exports.destroySession = function (req, res) {
    console.log('signout successful')
    req.logout();
    return res.render("home", {
        title: "Home"
        });
};

module.exports.signin = function(req, res){
    return res.render('signin', {
        title: "Signin"
    });
}

module.exports.signout = function(req, res){
    req.logout(function (err) {
        if (err) {
            console.log(err, "error in logging out");
        }
        req.flash("success", "You have logged out!");
        return res.redirect("/user/signin");
    });
}


// create session for the user

module.exports.createSession = function(req, res){
    console.log('signin successful')
    // console.log(req.body)
    req.flash('success', 'Logged in successfully')
    return res.redirect('/');
}

// get the sign up data

module.exports.create = async function(req, res){

    try{
        console.log(req.body);
        if(req.body.password != req.body.confirm_password){
            console.log('Password does not match')
            req.flash('error', 'Password does not match')
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){

            await User.create(req.body);
            
            req.flash('success', 'User created successfully')
            return res.redirect('/user/signin');
        }
        else{
            req.flash('error', 'User already exists')
            console.log('User already exists');
            return res.redirect('back');
        }

    }
    catch(err){
        console.log('Error', err);
        return;
    }
}


module.exports.about = async function(req, res){
    try{
        let user = await User.findById(req.params.id)
        return res.render('about', {
            title: "About",
            profile_user: user
        });
    }
    catch(err){
        console.log(err, 'error in getting information')
        return res.redirect('back')
    }
}


module.exports.update = async function(req, res){
    try{
        let user = await User.findById(req.params.id)
        User.uploadedAvatar(req, res, function(err){
            console.log(req.file);
            if(err){
                req.flash('error', 'Error in uploading the file')
                console.log('*****Multer Error: ', err)
            }
            else{
                user.name = req.body.name
                user.email = req.body.email
                if(req.file){
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname, '..', user.avatar))){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                        }
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save()
                req.flash('success', 'Information updated successfully')
                return res.redirect('back')
            }
            
        })
    }
    catch(err){
        req.flash('error', 'Error in updating the information')
        console.log(err, 'error in updating information')
        return res.redirect('back')
    }
}

// making freindship

module.exports.add = async function(req, res){
    try{
        let to = req.params.id
        let from = req.user._id
        let friends = await friendship.findOne({
            from_user: from,
            to_user: to,
        });
        if(friends == null){
            // console.log('friendship created')
            let newFriend = await friendship.create({
              from_user: from,
              to_user: to,
            });
            // console.log(newFriend)
            await User.updateOne({_id: from}, {$push: {friends: newFriend._id}})
            req.flash('success', 'Friend added successfully')
            return res.redirect('back')
        }
        else{
            req.flash('error', 'Friend already exists')
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err, 'error in creating friendship')
        return res.redirect('back')
    }
    
    // to create a friendship we need to check if the friendship already exists or no
}

// removing freindship

module.exports.remove = async function(req, res){
    try {
        let to = req.params.id;
        let from = req.user._id;
        let friends = await friendship.findOne({
          from_user: from,
          to_user: to,
        });
        if (friends) {
          await friendship.findByIdAndDelete(friends._id);
          await User.findOneAndUpdate(
            { _id: from },
            { $pull: { friends: friends._id } }
          );
          req.flash("success", "Friend removed successfully");
          return res.redirect("back");
        } else {
          req.flash("error", "Friend does not exists");
          return res.redirect("back");
        }
    } catch (error) {
        console.log(error, "error in removing friendship");
    }
}


// for reset password

module.exports.reset = function(req, res){
    return res.render('reset', {
        title: "Reset Password"
    });
}