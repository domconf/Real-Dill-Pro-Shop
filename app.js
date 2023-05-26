const express = require('express');
const exphbs = require('express-handlebars');
const { auth, requiresAuth } = require('express-openid-connect');
const app = express();

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set up static file serving
app.use(express.static('public'));

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'NdGtkSkxe7Zdk3tjRHEMOr8mNJFNTsMj',
  issuerBaseURL: 'https://dev-ozhjfegf37upige8.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};

// The `auth` router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
