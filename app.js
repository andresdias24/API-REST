import express from "express";
var mongoose = require("mongoose");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let categoryTaskRouter = require('./api/tasks/routes/category');
var tasksRouter = require('./api/tasks/routes/task');
var usersRouter = require('./api/notes/routes/note');
var indexRouter = require('./api/index/routes/index');
var editTaskRouter = require('./api/tasks/routes/editTask');
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}



let app = express();
require('dotenv').config();
app.use(cors(corsOptions)) // Use this after the variable declaration

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

const connectWithRetry = async () => {
  console.log('conectando de nuevo a mongo')
  await mongoose.connect(process.env.DATABASE, options)
    .then(() => {
      console.log('CONECTADO A MONGO')
    })
    .catch(err => {
      console.error(err, "error");
      console.log('REINTENTANDO CONEXION A MONGO')
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()
/**
 * concatenar directorios
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/addTasks', tasksRouter);
app.use('/editTask', editTaskRouter);
app.use('/category', categoryTaskRouter);
app.use('/notes', usersRouter);
app.use('/', indexRouter);

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
