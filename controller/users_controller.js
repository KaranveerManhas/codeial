const User = require('../models/users')

module.exports.profile = function(req, res) {
    return res.render('users', {
        title: 'User Profile'
    });
}

module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title : "Sign Up"
    });
}

module.exports.signIn = function(req, res) {
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
        User.create(req.body);
        return res.redirect('/users/sign-in');
    }
    
}

// Sign in and create a session for the user
module.exports.createSession = function(req, res) {

}