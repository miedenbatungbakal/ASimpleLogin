var profileModule = require('../../profile/profile');
var userModel = require('../../models/userModel');

module.exports = function(router){
    router.use(function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        console.log("Sorry.. You cant access this data");
    });

    router.get("/secure/profiles", function(req, res){
        profileModule.getAllProfiles(req, res, userModel);
    });
}