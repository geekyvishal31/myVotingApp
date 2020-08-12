const express = require('express');
const app = express();
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// Import function exported by newly installed node modules.
//const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype->access');

//Passport config
require('./config/passport')(passport);

// connections to MongoDB
mongoose.connect('mongodb://localhost:27017/votingData').then(db=>{
    console.log('Mongo for Voting App is connected');
}).catch(error => console.log('Mongo not Connected'+ error));

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Express Session
app.use(session({
    secret: 'myvotingapp', 
    resave: true, 
    saveUninitialized: true
  }));

//configuring flash and passport and yes, ordering matters
app.use(flash());  //it should be initialize below session since it uses it.
app.use(passport.initialize());
app.use(passport.session());  

//middleware
app.use(express.static(path.join(__dirname,'public')));



//route path for home page
let home = require('./routes/home');
app.use('/',home);

//route path for registration/login page
let member = require('./routes/member');
app.use('/member',member);

//route path for signup
let signUp = require('./routes/signup');
app.use('/signup',signUp);

//route path for signin
let signIn = require('./routes/signin');
app.use('/signin',signIn);

//route path for logout page
let signOut = require('./routes/logout');
app.use('/logout', signOut);

//route path for profile page
let proUser = require('./routes/profile');
app.use('/profile',proUser);

//route path page for create poll page
let crPoll = require('./routes/createPoll');
app.use('/createPoll',crPoll);

//route path for options page
let opt = require('./routes/options');
app.use('/options',opt);

//route path for updatevote page
let upVote = require('./routes/updateVote');
app.use('/updateVote',upVote);

//route path for userpoll
//let usPoll = require('./routes/userPolls');
//app.use('/userPoll',usPoll);

//route path for voting
let vote = require('./routes/voting');
app.use('/voting',vote);

//setup for views (handlebars)
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({"defaultLayout":"layout"}));
app.set('view engine','handlebars');

//custom helper function to perform calculations in handlebar templates
//var Handlebars = require('handlebars');
Handlebars.registerHelper("inc",(value, options) => {
   return parseInt(value) + 1;
});

const port = 1000;
var Server = app.listen(port, (req, res) => {
    console.log(`listening to port ${port}`);
});