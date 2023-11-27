const express = require('express');
// Environment variables
const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env);
const env = require('./config/environment');
const app = express();
const logger = require('morgan');
require('./config/view-helper')(app);
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passpostJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/flashMiddleware');

// Setup chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 4000');
const path = require('path');

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(logger(env.morgan.mode, env.morgan.options));


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
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(customMiddleware.setFlash);

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        // console.log("Error", err);
        console.log(`Error : ${err}`);
    }

    console.log(`Server Working Properly on port : ${port}`);
});