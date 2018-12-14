'use strict';

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static(`${__dirname}/build`));

app.get('/*', ((req, res) => res.redirect('/')));

app.listen(PORT, () => console.log('running on port:', PORT));
