const ResetPassword = require('../models/resetPassword');
const User = require('../models/users');
const crypto = require('crypto');
const queue = require('../config/kue');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const resetPasswordMailerWorker = require('../workers/reset_password_worker');

module.exports.home = async function(req, res){
        return res.render('reset_password', {
            title: "Reset Your Password",
        });
}

module.exports.createAccessToken = async function(req, res){

    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if(!user){
            console.log("User not found");
            req.flash('error', 'User not found');
            return res.redirect('/users/reset-password');
        }

        let resetPasswordObject = await ResetPassword.create({
            user: user,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true
        });
        let job = queue.create('reset_password', resetPasswordObject).save(function(err){
            if(err){
                console.log("Error in creating access token ", err);
            }
            console.log("Job queued", job.id);
        })
        req.flash('success', "Password Reset Link Sent");
        return res.redirect('/users/sign-in');

    }catch(err){
        console.log("Error in createAccessToken: ", err);
    }
}

module.exports.newPassword = async function(req, res){
    try{
        let resetObject = await ResetPassword.findOne({
            accessToken: req.query.accessToken
        });
        if(!resetObject.isValid){
            req.flash('error', "Invalid Token");
            return res.redirect('/users/reset-password');
        }
        await ResetPassword.findOneAndUpdate(resetObject, {
            isValid: false
        });
        return res.render('new_password', {
            title: "Create new password",
            user: resetObject.user
        });
    }catch(err){
        console.log("Error in new password module: ", err);
    }
}

module.exports.updatePassword = async function(req, res){
    try {
        if(req.body.password1 != req.body.password2){
            req.flash('error', 'Passwords do not match');
            return res.redirect('back');
        }
        let user = await User.findByIdAndUpdate(req.params.id, {
            password: req.body.password1
        });
        req.flash('success',"Password changed");
        return res.redirect('/users/sign-in');
    }catch(err){
        console.log("Error in updatePassword module: ", err);
    }
}