'use strict';

// NOTE: maybe try removing this dotenv and see if things works still
require('dotenv').config();
const cors = require('cors');
const debug = require('debug')('Backend-Portfolio:server.js');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const user = require('./route/user-router.js');
const auth = require('./route/auth-router.js');
const profile = require('./route/profile-router.js');
const repository = require('./route/repo-router.js');
const message = require('./route/message-router.js');
const comment = require('./route/comment-router.js');

const app = express();
const PORT = 8000;

mongoose.connect(process.env.MONGODB_URI);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan('dev'));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'the killers are just a solid band aren\'t they?'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(user);
app.use(auth);
app.use(profile);
app.use(repository);
app.use(message);
app.use(comment);

app.listen(PORT, () => debug('running on port: ' + PORT));
