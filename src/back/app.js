const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes')
const app = express();

require('./db')

app.use( cors( { origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/api', routes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html')));

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const status = err.status || 500
  res.status(status).json({ message: err.message });
});

module.exports = app;
