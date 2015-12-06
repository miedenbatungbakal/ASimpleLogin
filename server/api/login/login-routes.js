module.exports = function(router, passport){
    router.get('/session', function(req, res){
        var userData = req.user || null;

        res.json({userData: userData});
    });

    router.post('/login', passport.authenticate('local-login'), function(req, res){
        res.json(req.user.info);
    });

    router.post('/logout', function(req, res){
        req.logout();
        res.json(req.user);
    });
};