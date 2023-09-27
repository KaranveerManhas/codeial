const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_dev');

const database = mongoose.connection;

database.on('error', console.error.bind("Error Connecting to Database"));


database.once('open', () => {
    console.log("Successfully connected to database");
});

module.exports = database;