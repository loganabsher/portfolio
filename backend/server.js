'use strict';

const express = require('express');

const app = express();
// NOTE: need to remove process.env
const PORT = process.env.PORT || 8000;

// NOTE: need to connect heroku's mongolab once in deployment
// mongoose.connect(process.env.MONGODB_URI);

app.listen(PORT, () => console.log('portfolio --BACKEND-- running on port: ' + PORT));
