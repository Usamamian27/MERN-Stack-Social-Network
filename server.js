const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser =require('body-parser');
const passport = require('passport');
const app = express();



// Body parser middleWare
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// DB Config

const db = require('./config/keys').mongoURI;


/// Connect to mongo Db

mongoose.connect(db)
    .then(()=>{
        console.log('Connection to MongoDB :  Succesful');
    })
    .catch(err => console.log(err));



// Passport middleWare
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);


// Use Routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);





const port = process.env.port || 5000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});