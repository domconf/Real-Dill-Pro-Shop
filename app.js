const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Set up JSON parsing for request bodies
app.use(express.json());

// Set up static file serving
app.use(express.static('public'));

// Import and use your routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
