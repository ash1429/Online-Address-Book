var express = require("express");
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var middleware = require('../middleware');
var User = require('../models/user');
var Contact = require('../models/contact');

router.get('/', (req, res, next) => {
  console.log(req.params.id_details);
  
  res.render('show');
});

module.exports = router;