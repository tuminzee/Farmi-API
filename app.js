var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
require('dotenv').config();

const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpress = require('@admin-bro/express');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product.route');

const Products = require('./models/product.model');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
AdminBro.registerAdapter(AdminBroMongoose);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));

const adminBro = new AdminBro({
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login',
  resources: [Products],
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminBro.bundle('./component/my-dashboard-component')
  },
  branding: {
    logo:
      './public/images/logo.png',
    companyName: 'Farmi',
    favicon: './public/images/Logo.svg',
  },
  
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

// const router = AdminBroExpress.buildRouter(adminBro);

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
    return null
  },
  cookieName: 'adminbro',
  cookiePassword: 'somePassword',
});


app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(adminBro.options.rootPath, router);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', productRouter);
app.use('/users', usersRouter);






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
