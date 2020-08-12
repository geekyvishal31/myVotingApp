const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/',ensureAuthenticated,(req, res) => {
  res.render('profile',{
    name: req.user.name,    // when we are logged in we have access to req.user
    Id : req.user.id
  });
});


module.exports = router;