const User = require('../models/users');

module.exports.profile = function(req, res) {
    return res.render('users', {
        title: 'User Profile'
    });
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
        return res.redirect('/users/profile');
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

// Sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res, next) {
    req.logout(err => {
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });
}