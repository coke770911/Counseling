require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const calendarRouter = require('./routes/calendar')
const userauthRouter = require('./routes/userauth')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// bootstrap
app.use('/javascripts/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/stylesheets/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// tabulator-tables
app.use('/javascripts/tabulator-tables', express.static(path.join(__dirname, 'node_modules/tabulator-tables/dist/js')))
app.use('/stylesheets/tabulator-tables', express.static(path.join(__dirname, 'node_modules/tabulator-tables/dist/css')))

// sweetalert2/dist
app.use('/javascripts/sweetalert2', express.static(path.join(__dirname, 'node_modules/sweetalert2/dist')))
app.use('/stylesheets/sweetalert2', express.static(path.join(__dirname, 'node_modules/sweetalert2/dist')))
// axios
app.use('/javascripts/axios', express.static(path.join(__dirname, 'node_modules/axios/dist')))

// 將session 暫存伺服端sqlite
app.use(session({
  store: new SQLiteStore(),
  secret: 'your secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
}))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/calendar', calendarRouter)
app.use('/userauth', userauthRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
