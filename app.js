var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  flash = require('connect-flash'),
  User = require("./models/user"),
  Contact = require('./models/contact');
  session = require('express-session'),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

var middleware = require('./middleware');


var indexRouter = require('./routes/indexRouter');
var contactRouter = require('./routes/contactsRouter');

const url = 'mongodb://localhost:27017/addressBook';
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (!err) {
    console.log("connected to db");
  }
  else {
    console.log(err);
  }
});

// ================
//cleanUp
// ================
User.deleteMany({}, (err) => {
  if (err) console.log(err);
  else console.log("cleaned up user");
});
Contact.deleteMany({}, (err) => {
  if (err) console.log(err);
  else console.log("cleaned up contact");
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(__dirname + "/public"));

// ================
//Locals
// ================
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.flashMessageError = req.flash("error");
  res.locals.flashMessageSuccess = req.flash("success");
  next();
});

app.use('/', indexRouter);
app.use('/contacts',middleware.isLoggedIn, contactRouter);



app.listen(3000, () => {
  console.log("Server is running");
});


