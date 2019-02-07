import * as  DBConfig from "./config";

const mongoose = require('mongoose');
const createModels = require('@trakbarinc/model');
const errors = require('../constants').generalErrors;
const churchill =require('../logger/_logger');
mongoose.set('useFindAndModify', false);
const _env = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;
mongoose.set('debug', _env === 'development');
const mongoOptions = {
    autoIndex: false,
    useNewUrlParser: true,
    keepAlive: 120,
    poolSize: 10,
    socketTimeoutMS: 360000,
};

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

let connection = mongoose.createConnection(DBConfig.getURI(), mongoOptions);
function reconnect(error) {
    churchill.error(`Error connecting to database, retrying in ${DBConfig.TIMEOUT / 1000} seconds. Reported Error: ${error}`, { type: errors.DB_ERROR.name });
    setTimeout(() => {
        connection = mongoose.createConnection(process.env.MONGO_URI, mongoOptions);
    }, DBConfig.TIMEOUT);
}

connection.on('connected', () => console.info('Connected to database'));
connection.on('error', reconnect);
connection.on('disconnected', reconnect);

export default createModels(connection);
