'use strict';

require('dotenv').config();
const cors = require('cors');
const debug = require('debug')('Backend-Portfolio:server.js');
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const repository = require('./route/repo-router.js');
const user = require('./route/user-router.js');

const app = express();
const PORT = 8000;

// NOTE: need to connect to heroku's mongolab once in deployment
mongoose.connect(process.env.MONGODB_URI);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());
app.use(user);
app.use(repository);

app.listen(PORT, () => debug('running on port: ' + PORT));
