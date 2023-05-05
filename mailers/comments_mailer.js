const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {

    // console.log("inside newComment mailer", comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
    nodeMailer.transporter.sendMail({
        from: "prashantymusic@gmail.com",
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    })
    .then((info) => {
        console.log("Message sent", info);
        return;
    })
    .catch((err) => {
        console.log("Error in sending mail", err);
        return;
    })
}