const express = require('express');
const upvote = require('../models/polls');
const router = express.Router();

router.get('/',(req, res) => {
    var quesid = req.query.qid;
    var opid = req.query.oid;
    upvote.findById(quesid,(err,qobj) => {
        if(err){
            res.send('Something went wrong',err);
        }else{
            qobj.Votecount++;
            for(var i=0;i<qobj.Options.length;i++){
                //console.log('into loop',qobj.Options[i]);
                if(qobj.Options[i].id == opid){
                    
                    qobj.Options[i].count ++;
                    
                    upvote.updateOne({_id : quesid},qobj,(err,obj) => {
                        if(err)
                        throw err;
                        else
                        console.log('vote is counted and database is updated')
                    });//update ended
                }//if ends
            }//loop ends
        }//else ends
    });//find by id ends
    upvote.findById(quesid,function(err,pole){
        if(err){
            res.send('error in chart data');
        }else{
             var chartCount = [];
             var chartOption = [];
    
            for(var i=0;i<pole.Options.length;i++){
                chartCount.push(pole.Options[i].count);
                chartOption.push(pole.Options[i].name);
            }
            res.render("chart", {
                votelabel: chartOption,
                votecount: chartCount,
    
            });
            console.log(chartOption);
            console.log(chartCount);
    
        } //else ends
    }); //findById ends    
});

module.exports = router;