'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

app.get('/*', ((req, res) => res.redirect('/')));

app.listen(PORT, () => console.log('running on port:', PORT));
