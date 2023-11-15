const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "190188219716-h81vg1jq688f9i0btfn4r7uad7bt13s8.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
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
                    await User.create({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });
                    return done(null, user);
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