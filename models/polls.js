const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({


    Question:{
        type: String,
        required: true
    },
    Options: [{name: {type: String}, count: {type: Number}}],
    Votecount: {
        type:Number,
        required:true,
        default:0
    },
    Userid:{
      type: String,
      required: true
    },
    Username:{
      type: String,
      required: true
    }

});


module.exports = mongoose.model('voter',VoteSchema);