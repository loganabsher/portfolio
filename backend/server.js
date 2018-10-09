'use strict';

require('dotenv').config();
const debug = require('debug')('Backend-Portfolio:server.js');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const repository = require('./route/repo-router.js');
const user = require('./route/user-router.js');

const app = express();
const PORT = 8000;

// NOTE: need to connect to heroku's mongolab once in deployment
mongoose.connect(process.env.MONGODB_URI);

app.use(morgan('dev'));

app.use(user);
app.use(repository);

app.listen(PORT, () => debug('running on port: ' + PORT));
