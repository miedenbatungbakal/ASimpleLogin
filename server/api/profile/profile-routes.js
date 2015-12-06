var profileModule = require('../../profile/profile');
var userModel = require('../../models/userModel');

module.exports = function(router){
    router.post('/create/profile',  function(req, res){
        profileModule.createProfile(req, res, userModel);
    });

    router.post('/check/profile', function(req, res){
        profileModule.checkExistingProfile(req, res, userModel);
    });
}