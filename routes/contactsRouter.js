var express = require("express");
var router = express.Router({ mergeParams: true });
var middleware = require('../middleware');
var Contact = require('../models/contact');

router.get('/', (req, res, next) => {
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Contact.find({ 'owner.name': req.user.username }, (err, contacts) => {
      if (err) console.log(err);
      else {
        // console.log(contacts);
        var resultAcquiantance = [];
        
        contacts[0].acquiantances.forEach(acquiantance => {
          if(acquiantance.name.match(regex)){
            resultAcquiantance.push(acquiantance);
          }
        });
        
        res.render('searchResult', {acquiantances: resultAcquiantance, v_contacts: contacts});

        // res.render('contacts', { v_contacts: contacts });
      }

    });
  }
  else{
    Contact.find({'owner.name': req.user.username}, (err,contacts)=>{
      if(err) console.log(err);
      else{
        // console.log(contacts);
        res.render('contacts', {v_contacts: contacts});
      }
      
    });
  }
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

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;