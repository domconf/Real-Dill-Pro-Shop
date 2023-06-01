const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const { auth } = require('express-openid-connect');
const exphbs = require('express-handlebars');
const app = express();

const routes = require('./routes');
const sequelize = require('./config/connection');

// Create an instance of the Handlebars engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs', // Specify the file extension for handlebars templates
  helpers: {
    title: function () {
      // Implement the logic to retrieve the title dynamically
      // For example, you can access it from the locals object
      return this.title || 'Default Title';
    }
  }
}));
app.set('view engine', 'hbs');

dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {},
  });
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on ${config.baseURL}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const inst = process.env.inst || 3001;

sequelize.sync({ force: false }).then(() => {
  app.listen(inst, () => console.log('Now listening'));
});