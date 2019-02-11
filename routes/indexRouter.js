var express = require("express");
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var middleware = require('../middleware');
var User = require('../models/user');
var Contact = require('../models/contact');
router.get('/', middleware.notLoggedIn, (req, res, next) => {
  res.render('index');
});

router.get('/download', middleware.isLoggedIn, (req, res, next) => {
  Contact.find({ 'owner.name': req.user.username }, (err, contacts) => {
    if (err) console.log(err);
    else {
      res.send(contacts);
    }

  });
});



router.get('/signup', middleware.notLoggedIn, (req, res, next) => {
  res.render('signup');
});

router.post('/signup', middleware.notLoggedIn, (req, res, next) => {  
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect('/signup');
    }
    else {
      // console.log(user);

      passport.authenticate("local")(req, res, () => {

        var newOwner = {
          id: req.user._id,
          name: req.user.username
        };


        Contact.create({owner: newOwner},(err, a_contact)=>{
          if(err) res.send(err);
          else {
            req.flash("success", "You have successfully signed Up!");
            res.redirect('/contacts');
          }
        });
      });

    }
  });
});

router.get("/login", middleware.notLoggedIn, function (req, res) {
  res.redirect('/')
});

router.post("/login", middleware.notLoggedIn, passport.authenticate("local", {
  successRedirect: "/contacts",
  failureRedirect: "/login"
}), function (req, res) {
});

router.get("/logout", middleware.isLoggedIn, function (req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    req.flash("success", "You have successfully logged out!");
    res.redirect("/");
  }
  else {
    res.send('Bad request');
  }
});


module.exports = router;