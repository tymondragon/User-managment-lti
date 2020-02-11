var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');
const middleware = require('./lib/middleware');

var app = express();
if (process.env.NODE_ENV !== 'test') {
	app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cookieSession({
		name: 'session',
		secure: process.env.ENSURE_SSL === 'true',
		keys: [
			process.env.SESSION_KEY_1,
			process.env.SESSION_KEY_2,
			process.env.SESSION_KEY_3
		],
		maxAge: 12 * 60 * 60 * 1000
	})
);
app.use(
	cors({
		origin: true,
		credentials: true
	})
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(middleware.hypermedia);
app.use('/', require('../routes/index'));
app.use('/users', require('../routes/users'));

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