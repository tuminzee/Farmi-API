require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
var cookieParser = require('cookie-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
require('dotenv').config();




const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpress = require('@admin-bro/express');

const {Order, Product, User} = require('./_helpers/db');

AdminBro.registerAdapter(AdminBroMongoose);
const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

const adminBro = new AdminBro({
    rootPath: '/admin',
    logoutPath: '/admin/logout',
    loginPath: '/admin/login',
    resources: [Order, Product, User],
    dashboard: {
      handler: async () => {
        return { some: 'output' }
      },
      component: AdminBro.bundle('./component/my-dashboard-component')
    },
    branding: {
      logo:
        'https://i.ibb.co/JRzSXNS/logo.png',
      companyName: 'Farmi',
      favicon: 'https://i.ibb.co/JRzSXNS/logo.png',
      softwareBrothers: false
    },
    
});

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

app.use(adminBro.options.rootPath, router);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(jwt());




// api routes
app.use('/users', require('./users/users.controller'));
app.use('/products', require('./products/products.controller'));
app.use('/orders', require('./orders/orders.controller'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
