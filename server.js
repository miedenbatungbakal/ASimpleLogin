var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');

var db = require('./server/config/database');

mongoose.connect(db.url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({secret: "anystringoftext", saveUninitialized: false, resave: true}));
app.use(cookieParser());

require('./server/config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'public'));

app.get('/', function(req, res){
    res.render('index.ejs');
});

var api = express.Router();
require('./server/api/login/login-routes')(api, passport);
require('./server/api/profile/profile-routes')(api);
require('./server/api/secure/secure-routes')(api);
app.use('/api', api);

app.listen(port, function(){
    console.log("Server started at port: " + port);
});