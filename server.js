const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');

const routes = require('./routes');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const app = express();
const hbs = exphbs.create({ helpers });
dotenv.config();


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
// Configure the Handlebars view engine

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/', routes);

// Homepage route
app.get('/', (req, res) => {
  // Handle the logic for the home page
  res.render('main');
});

// Login route
app.get('/login', (req, res) => {
  // Render the login page
  res.render('login');
});

app.post('/login', (req, res) => {
  // Perform authentication logic here
  // Check credentials, validate user, etc.

  // If authentication is successful
  req.session.user = { username: 'exampleuser' }; // Store user information in the session
  res.redirect('/'); // Redirect to the homepage or any other desired page
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy the session and clear the user data
  req.session.destroy();
  res.redirect('/'); // Redirect to the homepage or any other desired page
});

const port = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log('Now listening on port', port));
});
