middleware = {};

middleware.notLoggedIn = function (req, res, next) {
  if (req.isUnauthenticated()) {
    return next();
  }
  req.flash("error", "Permission Denied");
  res.redirect('back');
}


middleware.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect('back');
}

module.exports = middleware;
