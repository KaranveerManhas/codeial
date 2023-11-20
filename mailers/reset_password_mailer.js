const nodemailer = require('../config/nodemailer');


// This is another way of exporting a method
exports.newResetRequest = (resetPasswordObject) => {
    let htmlString = nodemailer.renderTemplate({
        resetPasswordObject: resetPasswordObject
    }, '/reset-password/reset_password.ejs');

    nodemailer.transporter.sendMail({
        from: "manhaskaranveer@gmail.com",
        to: resetPasswordObject.user.email,
        subject: "New Comment!",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("Error in reset password mailer", err);
            return;
        }
        console.log('Mail delivered', info);
        return;
    });
}