const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const env = require('./environment');
const User = require('../models/users');


let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_auth_secret
}

passport.use(new JwtStrategy(opts, async function(jwtPayload, done){
    //find the user in your database
    try{
        let user = await User.findById(jwtPayload._id)

        if(!user){
            return(null, false);
        }
        
        return(null, user);

    }catch(err) {
        return done(err);
    }
}));

module.exports = passport;