
const User = require("../models/user");
const crypto = require("crypto");
const resetPasswordMailer = require("../mailers/reset_password_mailer");
const fs = require("fs");
const path = require("path");
const nodeMailer = require("../config/nodemailer");
const tokenId = require("../models/tokenID");



module.exports.home = async function (req, res) {
  try {
    return res.render("password_reset");
  } catch (err) {
    console.log(err);
    return res.render("back");
  }
};


module.exports.sendEmail = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      req.flash("error", "No accout with this email");
      return res.redirect("/");
    } else {
      let token = crypto.randomBytes(20).toString("hex");
        let tokenID = await tokenId.create({
          user: user._id,
          accessToken: token,
          expired: false,
        });
        tokenID.save();
      resetPasswordMailer.resetPassword(user, token);
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.resetPasswordForm = async function (req, res) {
  try {
    let token = await tokenId.findOne({ accessToken: req.params.token });
    let userid = token.user;
    
    if(!token){
        req.flash('error', 'wrong token')
        return res.redirect("/")
    }
    if (token.expired == true) {
      req.flash("error", "Token expired");
      return res.redirect("/");
    } else {

      return res.render("reset", {
        tokenId: token._id,
        userId: userid,
      });
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};


module.exports.submit = async function(req, res){
    try {
        console.log(req.body)
        let token = await tokenId.findById(req.body.token)
        if(!token || token.expired == true){
            req.flash('error', 'Token expired')
            return res.redirect("back")
        }
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Password not matched')
            return res.redirect("back")
        }
        
        let user = await User.findById(req.body.userId)
        user.password = req.body.password
        user.save()
        token.expired = true
        token.deleteOne()
        req.flash('success', 'Password changed successfully')
        resetPasswordMailer.passwordChanged(user)
        return res.redirect("/")

    } catch (error) {
        console.log(error)

    }
}


module.exports.changePassword = async function(req, res){
    try {
        let user = await User.findById(req.user._id)
        if(req.body.oldpassword != user.password){
            req.flash('error', 'Old password not matched')
            return res.redirect("back")
        }
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'New Password not matched')
            return res.redirect("back")
        }
        user.password = req.body.password
        user.save()
        req.flash('success', 'Password changed successfully')
        resetPasswordMailer.passwordChanged(user)
        return res.redirect("/")

    } catch (error) {
        console.log(error)

    }
}