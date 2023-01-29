var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var clientRouter = require('./routes/apiclient');
var depotRouter = require('./routes/apidepot');
var loginRouter = require('./routes/apilogin');
var responableRouter = require('./routes/responsable')

var app = express();

const connectDB = require('./db/connection')
connectDB();

require(`dotenv`).config();
const front_URL = process.env.FRONT_URL | "http://localhost:4200";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/api/users', usersRouter);
app.use('/api/depot', depotRouter);
app.use('/api/client', clientRouter);
app.use('/api/login', loginRouter);
app.use('/api/responsable', responableRouter );

app.use('/**', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
