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

middleware.checkOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username === req.params.username) {
      next();
    }
    else {
      res.send("You are not authorized");
    }

  } else {
    res.send("You need to log in first");
  }
}


module.exports = middleware;
