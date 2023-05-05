const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');


// var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:"170074765821-sb23epur1m72mtnh4stas91nijv5nnbq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({email : profile.emails[0].value}).exec()
        .then(function(user){
            if(user){
                return cb(null, user);
            }else{
                User.create(
                  {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    password: crypto.randomBytes(20).toString("hex"),
                  })
                  .then((user) => {
                    return cb(null, user);
                  })
                .catch((err) =>{
                    console.log(err);
                    return;
                })
            }
        })
        .catch(function(err){
            console.log(err);
            return;
        })
    }
  )
);

module.exports = passport;
