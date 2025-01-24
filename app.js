const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Blog = require('./models/blog');
const User = require('./models/user');

//express app
const app = express();
//enable cross origin resourse sharing
app.use(cors());

//line below gives access to request.body
app.use(express.urlencoded({ extended: true }));

const dbURI = 'mongodb+srv://sylvesterchukso:%5EyrwQQJHG9%3E~Qzp@trialcluster.87kvs.mongodb.net/';
mongoose.connect(dbURI)
    .then(function(result) {
        //listen for requests
        app.listen(3000);
        console.log('result: connected to the database');
    })
    .catch(function(err) {
        console.log(err);
    });

//register view engine
app.set('view engine', 'ejs');

//setting up views
//the line below would tell express
// app.set('views', 'myViews');

app.get('/add-blog', function(req, res) {
    const blog = new Blog({
        title: 'new blog 4000',
        snippet: 'new blog information plus more added',
        body: 'there are several things that could potentially be part of a new blog like new and exciting things to talk about with ones friends'
    });

    blog.save()
    .then(function(result) {
        console.log(result);
        res.send(result);
    })
    .catch(function(err) {
        console.log(err);
    })
})

app.post('/blogs', function(req, res) {
    const blog = new Blog(req.body);

    blog.save()
    .then(function(result) {
        console.log(result);
        res.redirect('/blogs');
    })
    .catch(function(err) {
        console.log(err);
    })
})

app.get('/blogs/:id', function(req, res) {
    // const id = req.params.id;
    const id = req.params.id ? req.params.id.trim() : null;

    console.log(id);
    
    Blog.findById(id)
    .then(function(result) {
        // console.log(result);
        res.render('blog', { title: 'one blog', blog: result });
    })
})

app.get('/anything', function(req, res) {
    let users = {users: [
        'user1',
        'user2',
        'user3',
        'user4',
        'user5000'
    ]}
    // return res.json({name: 'Jason', surname: 'Bourne', series: 'The Bourne Legacy'});
    return res.json(users);
})

app.get('/user/create', function(req, res) {
    res.render('createUser');
})

app.post('/user/create', function(req, res) {
    // console.log(req.body);
    const user = new User(req.body);

    user.save()
    .then(function(result) {
        res.render('profile');
    })
})

app.use(function(req, res, next) {
    console.log('hostname: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})

app.get('/', function(req, res) {
    res.redirect('/blogs');
})

//middleware and static files
app.use(express.static('public'));

app.get('/', function(req, res) {
    console.log(req.url);
    console.log('accessing home page');
    // res.send('<p>this is the page served my liege</p>');

    //the root tells express where the actual path is relative to as express
    // starts the search asst the root of the computer 
    // res.sendFile('./views/index.ejs', { root: __dirname });

    let person = {
        name: 'alladin',
        age: 12,
        school: 'alvan'
    }


    res.render('index', { person });
})

app.get('/about', function(req, res) {
    // res.send('<p>this is the page served my liege</p>');
    // res.sendFile('./views/about.html', { root: __dirname });

    res.render('about');
})

app.get('/blogs', function(req, res) {
    let person = {
        name: 'alladin',
        age: 12,
        school: 'alvan'
    }
    Blog.find()
    .then(function(result) {
        // res.send(result);
        res.render('index', { blogs: result, person });
    })
    .catch(function(err) {
        console.log(err);
    })
    
})

app.get('/about-us', function(req, res) {
    res.redirect('about');
})

app.get('/blogs/create', function(req, res) {
    res.render('create');
})

app.get('/contact', function(req, res) {
    // res.sendFile('./views/contact.html', { root: __dirname });
    res.render('contact');
})

app.get('/createUser', function(req, res) {
    res.render('createUser');
})

app.get('')

app.use(function(req, res) {
    res.status(404).render('404');
})