const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',(req, res) => {
  req.logout();
  req.flash('success_msg', "You're Logged out successfully");
  res.redirect('/home');
});

module.exports = router;