const express = require('express');
const router = express.Router();

router.get('/',(req , res) => {
   res.render('member');
   console.log('member');
});

module.exports = router;