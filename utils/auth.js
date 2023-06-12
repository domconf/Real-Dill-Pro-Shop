const withAuth = (req, res, next) => {

  if (!req.session.isLogedIn) {  //redirects to the login page if user is not logged, otherwise the route proceeds
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
