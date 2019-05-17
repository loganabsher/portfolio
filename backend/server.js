'use strict';

require('dotenv').config();
const cors = require('cors');
const debug = require('debug')('Backend-Portfolio:server.js');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const article = require('./route/article-router.js');
const auth = require('./route/auth-router.js');
const comment = require('./route/comment-router.js');
const message = require('./route/message-router.js');
const profile = require('./route/profile-router.js');
const reddit = require('./route/reddit-router.js');
const repository = require('./route/repo-router.js');
const user = require('./route/user-router.js');

const app = express();
const PORT = process.env.PORT || 8000;
// NOTE: for whatever reason this is always defaulting to 8080 causing conflict with the frontend port

mongoose.connect(process.env.MONGODB_URI);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(morgan('dev'));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.APP_SECRET
}));

app.use(article);
app.use(auth);
app.use(comment);
app.use(message);
app.use(profile);
app.use(reddit);
app.use(repository);
app.use(user);

// NOTE: this probably needs some sort of authentications from an admin
app.get('/quit', (req, res) => {
  console.warn('closing server');
  res.send('closing server');
  app.close();
});

app.listen(PORT, () => debug('running on port: ' + PORT));
