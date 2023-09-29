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

module.exports.create = function(req, res) {

}

// Sign in and create a session for the user
module.exports.createSession = function(req, res) {

}