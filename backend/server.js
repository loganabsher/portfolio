'use strict';

require('dotenv').config();
const debug = require('debug')('Portfolio:server.js');
const express = require('express');
const morgan = require('morgan');
// const request = require('superagent');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const repository = require('./route/repo-router.js');
const user = require('./route/user-router.js');

const app = express();
// NOTE: need to remove process.env
const PORT = process.env.PORT || 8000;

// NOTE: need to connect to heroku's mongolab once in deployment
mongoose.connect(process.env.MONGODB_URI);

app.use(morgan('dev'));

app.use(user);
app.use(repository);

app.listen(PORT, () => console.log('portfolio --BACKEND-- running on port: ' + PORT));
