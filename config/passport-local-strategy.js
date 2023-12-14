const passport = require('passport');
const LocalStrategy   = require("passport-local").Strategy;
const User = require('../models/users');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    }, 
    async function (req, email, password, done){
        //  Find a user and establish the identity
        try {
            let user = await User.findOne({
            email: email
            });
            if (!user || user.password != password) {
                req.flash('error', "Invalid Username/Password")
                // console.log("");
                return done(null, false);
            }
            return done(null, user);
        }catch(err) {
            req.flash('error', err);
            return done(err);
        }
    }
));

//  Serializing ther user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
    done(null , user._id );
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        let user = await User.findById(id);
        return done(null,  user);
    }catch(err){
        console.log(err);
        return done(err);
    }
});

// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the frontend
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;