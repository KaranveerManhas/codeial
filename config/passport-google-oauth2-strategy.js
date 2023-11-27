const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
    },
    async function (accessToken, refreshToken, profile, done) {
        // find a user
        try{
            let user = await User.findOne({
                email: profile.emails[0].value
            });
            console.log(accessToken, refreshToken);
            console.log(profile);
            // if found, set this user as req.user
            if(user){
                return done(null, user);
            }else{
                // if not found create the user and set it as req.user
                try{
                    let newUser = await User.create({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });
                    return done(null, newUser);
                }catch(err){
                    console.log("Error in creating user in google auth strategy", err);
                    return;
                }
            }
        }catch(err){
            console.log("Error in google auth strategy", err);
            return;
        }
    }
));


module.exports = passport;