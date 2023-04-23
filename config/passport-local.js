const passport = require("passport");

const localStrategy = require("passport-local").Strategy;

const User = require("../models/users");

// authentication using passport
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email })
        .exec()
        .then((user) => {
          if (!user || user.password != password) {
            // req.flash("error", "Invalid Username/Password");
            console.log('Invalid Username/Password')
            req.flash("error", 'Invalid Username/Password')
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          req.flash("error", "error in finding user");
          console.log('Error in finding user --> Passport')
          return done(err);
        });
    }
  )
);

// passport.use(
//   new localStrategy(
//     {
//       usernameField: "email",
//     },
//     function (email, password, done) {
//       User.findOne({ email: email }, function (err, user) {
//         if (err) {
//           console.log("Error in finding user --> Passport");
//           return done(err);
//         }
//         if (!user || user.password != password) {
//           console.log("Invalid Username/Password");
//           return done(null, false);
//         }

//         return done(null, user);
//       });
//     }
//   )
// );

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize the user to

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding user --> Passport");
      return done(err);
    });
});

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) {
//       console.log("Error in finding user --> Passpor");
//       return done(err);
//     }
//     return done(null, user);
//   });
// });

passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
