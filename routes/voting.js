const express = require('express');
const poll = require('../models/polls');
const router = express.Router();

router.get('/',(req,res) => {
  poll.find().lean().exec(function (err, item) {     //.lean is used to get a json object instead of mongoose one
    if (err) {
        res.send({'error': 'An error has occurred'});
    } else {
        
        var createdPolls = [];
        var i;
        
        for (i = 0; i < item.length; i++) {
            createdPolls.push(item[i]);
        }
    
        res.render("voting", {
            polls: createdPolls
        });
    }//end of else
});
   
});

module.exports = router;