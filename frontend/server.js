'use strict';

const debug = require('debug')('Frontend-Portfolio:server.js');
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/*', ((req, res) => res.redirect('/')));

app.use(morgan('dev'));

app.listen(PORT, () => debug('running on port:', PORT));
