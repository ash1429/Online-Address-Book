var express = require("express");
var router = express.Router({ mergeParams: true });
var middleware = require('../middleware');
var Contact = require('../models/contact');

router.get('/', (req, res, next) => {
  Contact.find({'owner.name': req.user.username}, (err,contacts)=>{
    if(err) console.log(err);
    else{
      // console.log(contacts);
      res.render('contacts', {v_contacts: contacts});
    }
    
  });
});



router.post('/', (req, res, next) => {
  var newAcquaintance = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  Contact.findOneAndUpdate({'owner.name': req.user.username}, newAcquaintance, (err, a_contact)=>{
    if(err) console.log(err);
    else{
      var matched = false;
      a_contact.acquiantances.forEach(acquiantance => {
        if(acquiantance.name === req.body.name){
          matched = true;
        }
      });

      if(matched)
      {
        req.flash('error', 'Name already exists');
        return res.redirect("/contacts/new");
      }

      a_contact.acquiantances.push(newAcquaintance);
      a_contact.save((err, a_contact) => {
        if (err) console.log(err);
        else {
          // console.log(a_contact);
          // res.send('posting....');
          res.redirect('/contacts');
        }
      });
    }
    
  });

});

router.get('/new', (req, res, next) => {
  res.render('new');
});




module.exports = router;