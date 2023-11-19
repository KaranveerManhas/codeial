const nodemailer = require('../config/nodemailer');


// This is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({
        comment: comment
    }, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: "manhaskaranveer@gmail.com",
        to: comment.user.email,
        subject: "New Comment!",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("Error in comments mailer", err);
            return;
        }
        console.log('Mail delivered', info);
        return;
    });
}