const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const database = mongoose.connection;

database.on('error', console.error.bind("Error Connecting to Database"));


database.once('open', () => {
    console.log("Successfully connected to database");
});

module.exports = database;