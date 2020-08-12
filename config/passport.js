const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
          //to match the user with the entered email
          User.findOne({ email: email})
          .then(user => {
            if(!user){
              return done(null, false, {message: 'Entered email is not registered'}); //null for error, false for user
            }
            //Matching the entered password after the entered email is found
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                  return done(null, user)
                }else done(null, false, {message: 'Entered password is incorrect'})
            });
          })
          .catch(err => console.log(err));
    })
  );

//tells passport how to store user in the session
passport.serializeUser((user,done) => {
  done(null, user.id);  //means that whenever we need to store the user in the session,we serialize it by ID.
});

//here we unserialize the user by using any of its property, in this ID is taken 
passport.deserializeUser((id, done) => {
  User.findById(id,(err, user) => {
     done(err, user);
  });
});
}
