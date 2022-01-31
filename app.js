var mongoose = require("mongoose");
var createError = require('http-errors');
import express  from "express";
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./api/notes/routes/index');
var usersRouter = require('./api/notes/routes/users');


let app = express();
require('dotenv').config();
/**
 * DataBase setup
 */
 const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 75000,
  family: 4,
  keepAlive: true, 
  keepAliveInitialDelay: 300000,
 };

const connectWithRetry = () => {
console.log('conectando de nuevo a mongo')
mongoose.connect(process.env.DATABASE, options)
.then(()=>{
  console.log('MongoDB is connected')
})
.catch(err=>{
  console.error(err, "error");
  console.log('mongo no se pudo conectar intentando de nuevo en 5 segundos')
  setTimeout(connectWithRetry, 5000)
})
}

connectWithRetry()
/**
 *
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
