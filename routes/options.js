const express = require('express');
const pollOpt = require('../models/polls');
const router = express.Router();

router.get('/',(req,res) => {
    quesId = req.query.id;
    pollOpt.findById(quesId,(err,opt) => {
      if(err){
        res.send('An error has occured');
      }else{
        var OptArr = [];
        var chartOption = [];
        var chartCount = [];
        for(var i=0;i<opt.Options.length;i++){
          OptArr.push(opt.Options[i].toJSON()); //here I've convert the simple mongoose object to JSON object
          chartCount.push(opt.Options[i].count);
          chartOption.push(opt.Options[i].name);
        }   
        var optionData = {
          qId : quesId,
          question : opt.Question,
          option : OptArr,
          voteCount : opt.Votecount,
          postedBy : opt.Username,
          votelabel: chartOption,
          votecount: chartCount,
        }                                 //to avoid the handlebars "own property" error
        res.render('option',optionData);
      }
    }); 
});

module.exports = router;