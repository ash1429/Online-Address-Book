var express = require("express");
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var middleware = require('../middleware');
var User = require('../models/user');
var Contact = require('../models/contact');
var Acquiantance = require('../models/acquiantance');

router.get('/', (req, res, next) => {
  // console.log('requested: ' + req.params.id_details);
  // console.log('params:' + req.params.username);
  // console.log('req.user' + req.user.username);

  
  Contact.find({ 'owner.name': req.user.username }, (err, contact) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      // console.log(contact[0].acquiantances);
      // console.log(contact[0].acquiantances.length);
      var i = 0;
      var index = 0;
      var exists = false;
      contact[0].acquiantances.forEach(acquiantance => {
        if ((acquiantance._id).equals(req.params.id_details)){
          index = i;
          exists = true;
        }
        i++;
      });

      if(exists){
        var foundAcquiantance = contact[0].acquiantances[index];
        res.render('show', { v_acquiantance: foundAcquiantance } );
      }else{
        res.send('Something Wrong')
      }
    }
  });
  
});

router.get('/delete', (req, res, next) => {
  Contact.find({ 'owner.name': req.user.username }, (err, contact) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      var i = 0;
      var index = 0;
      var exists = false;
      contact[0].acquiantances.forEach(acquiantance => {
        if ((acquiantance._id).equals(req.params.id_details)) {
          index = i;
          exists = true;
        }
        i++;
      });

      if (exists) {
        // var foundAcquiantance = contact[0].acquiantances[index];
        contact[0].acquiantances.splice(index,1);
        // console.log(foundAcquiantance);
        contact[0].save((err, data)=>{
          if(err) console.log(err);
          else{
            console.log(data);
            
            res.redirect('/contacts');
          }
          
        });        
        
        // res.send('deleteing');
        // res.redirect('/show/', { v_acquiantance: foundAcquiantance });
      } else {
        res.send('Something Wrong')
      }
    }
  });
  // res.send('deleting');
    
});

router.get('/update', (req, res, next) =>{
  Contact.find({ 'owner.name': req.user.username }, (err, contact) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      var i = 0;
      var index = 0;
      var exists = false;
      contact[0].acquiantances.forEach(acquiantance => {
        if ((acquiantance._id).equals(req.params.id_details)) {
          index = i;
          exists = true;
        }
        i++;
      });

      if (exists) {
        var foundAcquiantance = contact[0].acquiantances[index];
        
        // console.log('foundAcquiantance:- ' + foundAcquiantance);
        
        res.render('update', { v_acquiantance: foundAcquiantance });
        // res.send('Updating');
      } else {
        res.send('Something Wrong')
      }
    }
  });
});

router.post('/', (req, res, next) => {
  
  // ======================================================

  // console.log('router.post:-');
  
  // console.log(req.params.id_details);
  // var updatedAcquaintance = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone
  // };
  // console.log(updatedAcquaintance);

  // ======================================================

  Contact.find({ 'owner.name': req.user.username }, (err, contact) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      var i = 0;
      var index = 0;
      var exists = false;
      contact[0].acquiantances.forEach(acquiantance => {
        if ((acquiantance._id).equals(req.params.id_details)) {
          index = i;
          exists = true;
        }
        i++;
      });

      if (exists) {
        // var foundAcquiantance = contact[0].acquiantances[index];
        // console.log('foundAcquiantance:- ' + foundAcquiantance);
        contact[0].acquiantances[index].name = req.body.name;
        contact[0].acquiantances[index].email = req.body.email;
        contact[0].acquiantances[index].phone = req.body.phone;
        contact[0].save((err, data) => {
          if (err) console.log(err);
          else {
            // console.log(data);
            res.redirect('/show/' + req.params.id_details);
          }
        });
        // res.send('deleteing');
        // res.redirect('/show/', { v_acquiantance: foundAcquiantance });
      } else {
        res.send('Something Wrong')
      }
    }
  });
  
  
  // res.send('Updating');
  
});
module.exports = router;