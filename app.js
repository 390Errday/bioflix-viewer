var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var upload = require('./routes/upload');
var live = require('./routes/live');
var api = require('./routes/api');

var app = express();

// call socket.io to the app
app.io = require('socket.io')();

var listeners = {};

//start listen with socket.io
app.io.on('connection', function(socket) {
  console.log('a user connected');

  // add to list of listeners
  socket.on('listening', function(msg) {
    console.log('new listener!', msg);
    if(!listeners[msg.id]) listeners[msg.id] = [];
    listeners[msg.id].push(socket);
  });
});

// included for socket connection from routes
app.use(function(req, res, next) {
    req.listeners = listeners;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/live', live);
app.use('/upload', upload);
app.use('/', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
