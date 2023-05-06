const nodeMailer = require("../config/nodemailer");
const flash = require("connect-flash");
const crypto = require("crypto");
// const resetPasswordMailer = require("../mailers/reset_password_mailer");
// // this is another way of exporting a method
// exports.newComment = (comment) => {
//   // console.log("inside newComment mailer", comment);
//   let htmlString = nodeMailer.renderTemplate(
//     { comment: comment },
//     "/comments/new_comments.ejs"
//   );
//   nodeMailer.transporter
//     .sendMail({
//       from: "prashantymusic@gmail.com",
//       to: comment.user.email,
//       subject: "New Comment Published",
//       html: htmlString,
//     })
//     .then((info) => {
//       console.log("Message sent", info);
//       return;
//     })
//     .catch((err) => {
//       console.log("Error in sending mail", err);
//       return;
//     });
// };


// for forget password with link to reset password

exports.resetPassword = (user, token) => {

    let htmlString = nodeMailer.renderTemplate(
        { user: user, token: token, resetLink : `http://localhost:3000/resetpassword/${token}` },
        "/forget_password/reset_password.ejs"
    );
    // console.log('user', user)
    nodeMailer.transporter
        .sendMail({
            from: "prashantymusic@gmail.com",
            to: user.email,
            subject: "Reset Password",
            html: htmlString,
        })
        .then((info) => {
            console.log("Message sent", info);
            // req.flash("success", "Check your email for password reset link");
            return;
        })
        .catch((err) => {
            console.log("Error in sending mail", err);
            return;
        });
};

exports.passwordChanged = (user) => {
    let htmlString = nodeMailer.renderTemplate(
        { user: user },
        "/forget_password/password_changed.ejs"
    );
    nodeMailer.transporter
        .sendMail({
            from: "prashantymusic@gmail.com",
            to: user.email,
            subject: "Reset Password Successfull",
            html: htmlString,
        })
        .then((info) => {
            console.log("Message sent", info);
            // req.flash("success", "Check your email for password reset link");
            return;
        })
        .catch((err) => {
            console.log("Error in sending mail", err);
            return;
        });
};



// for reset password

