const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
var path = require('path');
const app = express();

const Sequelize = require('sequelize');
const UserModel = require('./models/user');

dotenv.config();

//app.use('public', express.static('public'));
app.use(express.static("public"));

var connection = mysql.createConnection({
	host     : process.env.dbhost,
	user     : process.env.user,
	password : process.env.password,
	database : process.env.database
});

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.dbhost,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const auth = function(req, res, next){
    if (req.session.loggedin)
        return next();
    else
		res.redirect('/');
};

app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true
    /*
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
    */
}));

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.session.loggedin)
        res.redirect('/main');
    else
        res.sendFile(path.join(__dirname + '/public/html/login.html'));
});

app.post('/auth', function(req, res){

    var email = req.body.email;
    var password = req.body.password;
    
    req.session.loggedin = true;
    req.session.email = email;
    res.redirect('/main');
/*
	var email = req.body.email;
	var password = req.body.password;

	if (email && password) {
		connection.query('SELECT * FROM userinfo WHERE BINARY email = ? AND BINARY password = ?', [email, password], function(error, results, fields) {

            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                req.session.name = results[0].username;
                res.redirect('/main');
            } else {
                res.redirect('/login');
            }
            res.end();
        });
    }
*/
});

app.get('/main', auth, function (req, res){
    res.render('main.ejs', { username : req.session.name });
});

app.get('/login', auth, function (req, res){
	let message = "Please check your email or password again!!"
	res.render('login.ejs', { message : message });
});

app.get('/logout', function (req, res){
    req.session.destroy();
    res.redirect('/');
});

//======================================================================================


// create a user
app.post('/api/users', (req, res) => {
    const User = UserModel(sequelize, Sequelize);
    User.create(req.body)
        .then(user => res.json(user));
})

// get all users
app.get('/api/users', (req, res) => {
    const User = UserModel(sequelize, Sequelize);
    User.findAll().then(users => res.json(users));
})

app.get('/write', function(req, res) {

    try {

        const User = UserModel(sequelize, Sequelize);
        const indivisual = [{ firstName: "aaa", lastName: "bbb" }];

        User.sync({ force: true }).then(() => {
            return User.create(indivisual);
        }).catch(err => {
            res.end();
        });

        res.end();

    } catch (error){
        res.render('error');
    }
});


app.get('/show', function(req, res) {

    req.session.email = "oslee@hmm21.com";
    req.session.name = "oslee";
    req.session.loggedin = true;

    let drinks = [
        { name: req.session.email, drunkness: 3 },
        { name: req.session.name, drunkness: 5 }
    ];

    res.render('show', {
        drinks: drinks
    });
});


app.get('/check', auth, function(req, res) {
    res.send("success");
    res.end();
});


app.listen(3000);
console.log('Listening port at 3000');