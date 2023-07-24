const express = require('express');
const morgan = require('morgan');
const appRouter = require('./router');


const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/', appRouter);

module.exports = app;
