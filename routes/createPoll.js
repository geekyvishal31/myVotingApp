const express = require('express');
const poll = require('../models/polls');
const user = require('../models/User');
const router = express.Router();

router.get('/',(req,res) => {
  var x = req.query.id;
  res.render('createPoll',{
      id : x
  });
  
  //console.log('UserID :',req.query.id);
});

router.post('/',(req,res) => {
   let opt = req.body.Options.split(",");
   let options = [];
   for (choice of opt){
     var choiceName = choice;
     let obj ={
       name : choiceName,
       count : 0
     };
     options.push(obj);
   }
   var uid = req.body.id;
   user.findById(uid,(err,obj) => {
     var uname = obj.name;

     const myVote = new poll({
      Question : req.body.Question,
      Options : options,
      Userid : uid,
      Username :  uname    
    });
 
    myVote.save()
          .then(item => {
             res.render('profile',{msg:"item saved to database"});
             console.log('item saved');
         })
         .catch(err => {
              res.status(400).send("unable to save to database");
          });
   })


})


module.exports = router;

// var id=req.query.id;
// voter.findById(id, function (err, opts) {
//    var  jsonOptions = JSON.stringify(opts.Options);
//    console.log(jsonOptions);
//     var choice = opts.Options;
//     console.log(choice);
//      console.log(opts);
//     if(err){
//         res.send({'error': 'An error has occurred'});
//     }else {
//         res.render("option", {

//             question: opts.Question,
//             choice: opts.Options,
//             jsonOptions: JSON.stringify(opts.Options),
//             pollId: id,


//         });
//     }


// });