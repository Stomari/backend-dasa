require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((db) => {
    console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const indexRouter = require('./routes/index');
const laboratoryRouter = require('./routes/laboratory');
const examRouter = require('./routes/exam');

app.use('/', indexRouter);
app.use('/api', laboratoryRouter);
app.use('/api', examRouter);

module.exports = app;
