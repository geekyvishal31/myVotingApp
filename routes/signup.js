const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Model
const User = require('../models/User');

router.post('/',(req,res) => {
   let errors = [];
   
   // validations
   //required fields
   if(!req.body.name || !req.body.email || !req.body.password || !req.body.passwordcnf) {
     errors.push({ msg: 'Please fill in all fields'});
   }

   //password match
   if(req.body.password !== req.body.passwordcnf) {
     errors.push({ msg: 'Passwords do not match'});
   }

   //password length
   if(req.body.password.length < 6){
    errors.push({ msg: 'Password is too short,atleast 6 characters'});
   }

   if(errors.length > 0){
      res.render('member',{
        errors,
        name :req.body.name,
        email :req.body.email,
      });
   }else {
     //validation passed
     //to check if the registering user exist already
     User.findOne({ email: req.body.email}).then(user => {
       if(user) {
        errors.push({msg: 'User already exist'}); 
        res.render('member',{
          errors,
          name :req.body.name,
          email :req.body.email,
        });  
       }else{
         //saving new user
          const newUser = new User({
            name :req.body.name,
            email :req.body.email,
            password :req.body.password
          });

          //password hashing using bcrypt
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
               if(err) throw err;
               // setting password to hash
               newUser.password = hash;
               // saving the new user
               newUser.save()
                  .then(user => {
                    res.redirect('/member');
                  })
                  .catch(err => console.log(err));

          }))
       }
     });
   }
});



module.exports = router;