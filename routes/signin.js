const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/',(req , res, next) =>{
   passport.authenticate('local', {
     successRedirect: '/profile',
     failureRedirect: '/member',
     failureFlash: true
   })(req,res,next);
});

module.exports = router;
