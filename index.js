const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);
// Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Setup views engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // Todo change the secret before deployment in production mode
    secret: 'manhas',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create({
        client: db.getClient(),
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        // console.log("Error", err);
        console.log(`Error : ${err}`);
    }

    console.log(`Server Working Properly on port : ${port}`);
});

