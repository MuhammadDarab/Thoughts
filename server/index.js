const express = require('express')
const expressSession = require('express-session');
const cors = require('cors');
require('./pass')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//Mongo Setup...
const mongoose = require('mongoose');

const DB = 'mongodb+srv://Mongo2099:futureman2099@cluster0.inxix.mongodb.net/Memos?retryWrites=true&w=majority'

mongoose.connect(DB);

const Thought = mongoose.model('thoughts', { title: String, description: String, by: String, date: { type: Date, default: Date.now } });

const Users = mongoose.model('users', { fullName: String, tag: String, img:String } );

const app = express();
app.use(express.json());
app.use(expressSession({
    key: "someKey",
    secret: 'ajdwjaidjawidj',
    cookie: {
      maxAge: 2678400000 // 31 days
        // maxAge: 30
    },
}));
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, PUT, POST, DELETE",
    credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/thought/:id', (req, res) => {

    const { params: { id } } = req;
    Thought.find({ id }).then( (result) => res.send(result) )

})

app.get('/thoughts/:by', (req, res) => {

    const { params: { by } } = req;
    Thought.find({ by: by }).then( (result) => res.send(result) )

})

// Gets All thoughts...
app.get('/thought', (req, res) => {

    Thought.find({})
    .then((result) => {
        res.send(result)
    })
    
})

//Posts a thought
app.post('/thought', (req, res) => {

    console.log(req.body)

    const thought = new Thought({ title: req.body.title, description: req.body.description, by: req.body.by });
    thought.save().then(() => res.send('~thought Posted~'));

})

app.delete('/thought/:id', (req, res) => {

    const { params: { id } } = req;

    Thought.findOneAndRemove({ id })
    .then((result) => { 
        res.send('~thought Deleted~')
    })

})

app.patch('/thought/:id', (req, res) => {

    const { body } = req;
    const { params: { id } } = req;

    if(body){

        Thought.findOneAndUpdate({ id }, { title: body.title, description: body.description } ).then(() => res.send('~thought Updated~'));
    
    }

})

app.get('/thoughts/purge', (req, res) => {

    Thought.remove({}).then(() => res.send('All thoughts Deleted'))

})

app.get('/auth/google', passport.authenticate('google', {
    scope:['profile']
}, (req, res) => {

    res.send(req)

}))

app.get('/auth/google/redirect', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: 'http://localhost:3000/failed'
}))

app.get('/auth/login/success', (req, res) => {

    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successfull',
            user: req.user
        })
    
        Users.findOne({ tag: req?.user?.name?.givenName }).then((result) => {

            if(result == null){

                const User = new Users({ fullName: req?.user?.displayName, tag: req?.user?.name?.givenName, img: req?.user?.photos[0].value });
                User.save();
                
            }
    
        })

    }

})

app.get('/auth/logout', (req, res) => {

    req.logout({ keepSessionInfo: false}, () => {
        res.redirect('http://localhost:3000/login')
    });

})

app.get('/profile/:user', (req, res) => {

    let userProfile = {
        details: null,
        thoughts: null
    }
    const { params: { user } } = req;
    Users.findOne({ tag: user }).then((result) => {

        if(result){
            userProfile.details = result;
        }

    }).then(() => {

        Thought.find({ by: user }).then((result) => {

            if(result){
                userProfile.thoughts = result;
            }
    
        }).then(() => {
            res.send(userProfile);
        })

    })

})

app.get('/profiles', (req, res) => {
    Users.find({}).then((result) => {
        res.send(result)
    })
})


app.listen(8080, () => console.log('~ Server is up (8080)'))