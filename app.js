var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const Mongostore = require("connect-mongo");
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const localStrategy = require("passport-local").Strategy;

//flash setup
const flash = require("connect-flash");
const customMware = require("./config/middleware");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// app.use(bodyParser.json());  
// app.use(bodyParser.urlencoded({ extended: true }));

// to socket.io setup
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");



// view engine setup
app.use(expressLayout);
// app.set('layout', 'pages/layout')

app.set("views", path.join(__dirname, "views" + "/pages"));
app.set("view engine", "ejs");


// mongo store is used to store the session cookie in the db

app.use(
  session({
    name: "facebook",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    store: Mongostore.create(
      {
        mongoUrl: "mongodb://127.0.0.1/facebook",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(flash());
app.use(customMware.setFlash);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("error");
  console.log(err);
  res.render("error");
});


app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});

module.exports = app;
