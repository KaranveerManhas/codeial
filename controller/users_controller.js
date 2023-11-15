const User = require('../models/users');
const fs = require('fs');
const path = require("path");

module.exports.profile = async function(req, res) {
    try{
        let user = await User.findById(req.params.id);

        return res.render('users', {
            title: 'User Profile',
            profile_user: user
        });
    }catch (err) {
        console.log(err);
    }
}

module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title : "Sign Up"
    });
}

module.exports.signIn = async function(req, res) {
    // await User.deleteMany({});
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Sign In"
    });
}

// Get the sign up page data

module.exports.create = async function(req, res) {
    let user = await User.findOne({
        email: req.body.email
    });
    if (user != null){
        console.log('User already exists', user);
        return res.redirect('back');
    }
    else{
        try{
            User.create(req.body);
            return res.redirect('/users/sign-in');
        }catch(err) {
            console.log(err);
        }
    }
    
}

module.exports.update = async function (req, res) {
    // if(req.user.id == req.params.id) {
    //     await User.findByIdAndUpdate(req.params.id, req.body);
    //     req.flash('success', "Updated");
    //     return res.redirect('back');
    // }else {
    //     req.flash('error', "Unauthorized");
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id == req.params.id) {
        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) {
                    console.log('****Multer Error****');
                }
                // console.log(req.file);
                user.username = req.body.username;
                user.email = req.body.email;

                if (req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // This is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Profile updated!');
                return res.redirect('back');
            });
    
        }catch{
            req.flash('error', err);
            return res.redirect('back');    
        }

    }else {
        req.flash('error', "Unauthorized");
        return res.status(401).send('Unauthorized');
    }
}

// Sign in and create a session for the user
module.exports.createSession = async function(req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next) {
    req.logout(err => {
        if(err){
            return next(err);
        }
        req.flash('success',"Logged out successfully");
        return res.redirect('/');
    });
}
