const mongoose = require('mongoose');
const config = require('../config/db');

console.log("Initiating connection....");
mongoose.Promise = global.Promise;

// Build the connection string
const connectionString = config.protocol + '://' + config.hostname + ':' + config.port + '/' + config.database;

// Create the database connection
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', async () => {
    console.log('Mongoose default connection open to ' + connectionString);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = {mongoose};

