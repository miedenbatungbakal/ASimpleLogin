module.exports = {
    createProfile: createProfile,
    checkExistingProfile: checkExistingProfile,
    getAllProfiles: getAllProfiles
};

function checkExistingProfile(req, res, userModel){
    userModel.findOne({'local.username': req.body.username}, function(err, user){
        if(err){
            throw err;
        }else if(user){
            res.json({result: 'existing'});
        }else{
            res.json({result: 'available'});
        }
    });
}

function createProfile(req, res, userModel){
    var newUser = new userModel();

    newUser.local.username = req.body.local.username;
    newUser.local.password = newUser.generateHash(req.body.local.password);
    newUser.info.firstname = req.body.info.firstname;
    newUser.info.lastname = req.body.info.lastname;
    newUser.info.middlename = req.body.info.middlename;

    newUser.save(function(err){
        if(err){
            res.json({result: 'error'});
        }else{
            res.json({result: 'success'});
        }
    });
}

function getAllProfiles(req, res, userModel){
    userModel.find({}, function(err, data){
        var info = [];

        for(var x in data){
            info.push(data[x].info);
        }

        res.json(info);
    });
}

/*
function createProfile(req, res, userModel){

    userModel.findOne({'local.username': req.body.local.username}, function(err, user){
        if(err){
            throw err;
        }else if(user){
            res.json({result: 'existing'});
        }else{
            var newUser = new userModel();

            newUser.local.username = req.body.local.username;
            newUser.local.password = newUser.generateHash(req.body.local.password);
            newUser.info.firstname = req.body.info.firstname;
            newUser.info.lastname = req.body.info.lastname;
            newUser.info.middlename = req.body.info.middlename;

            newUser.save(function(err){
                if(err){
                    res.json({result: 'error'});
                }else{
                    res.json({result: 'success'});
                }
            });
        }
    });
}*/
