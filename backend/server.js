'use strict';

require('dotenv').config();
const express = require('express');
const request = require('superagent');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const repository = require('./lib/load.js');

const app = express();
// NOTE: need to remove process.env
const PORT = process.env.PORT || 8000;

// NOTE: need to connect to heroku's mongolab once in deployment
mongoose.connect(process.env.MONGODB_URI);

app.use(repository);

app.listen(PORT, () => console.log('portfolio --BACKEND-- running on port: ' + PORT));
