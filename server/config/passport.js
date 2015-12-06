var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/userModel');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        UserModel.findById(id, function(err, user){
            done(null, user.info);
        });
    });

    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done){
        UserModel.findOne({"local.username": username}, function(err, user){
            if(err){
                return done(err);
            }else if(!user){
                return done(null, false, {message: "No user found"});
            }else if(!user.validPassword(password)){
                return done(null, false, {message: "Incorrect password"});
            }else{
                return done(null, user);
            }
        });
    }));
};