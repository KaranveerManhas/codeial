const User = require('../models/users')

module.exports.profile = async function(req, res) {
    let user = await User.findById(req.cookies.user_id);
    // console.log(user);
    // console.log(req.cookies.user_id)
    return res.render('user_profile', {
        title: 'User Profile',
        users: user
    });
}

module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title : "Sign Up"
    });
}

module.exports.signIn = async function(req, res) {
    // await User.deleteMany({});
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
module.exports.createSession = async function(req, res) {
    // Find user
    // console.log(req.body);
    try {
        const user = await User.findOne({
        email: req.body.email
        });
        // console.log(user);
        if (user) {
            if (user.password != req.body.password) {
                console.log("Password mismatch");
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else {
            return res.redirect('back');
        }
    }catch(err) {
        console.log("Error in signing in", err);
    }

}

module.exports.endSession = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}