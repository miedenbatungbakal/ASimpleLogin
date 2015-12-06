(function(){
    angular.module('contents', [
        'nav'
    ])
        .config(['$stateProvider', ContentsConfig]);

    function ContentsConfig($stateProvider){
        $stateProvider.state('portfolio.contents', {
            views: {
                'mainContent@': {
                    templateUrl: 'app/contents/nav/nav-content/home/home.tmpl.html',
                    controller: 'HomeCtrl as homeCtrl'
                },

                'footer@': {
                    templateUrl: 'app/contents/footer/footer.tmpl.html'
                },

                'navigationBar@': {
                    templateUrl: 'app/contents/nav/nav.tmpl.html',
                    controller: 'NavCtrl as navCtrl'
                }
            }

            /* params: {
             username: null
             }*/

            /*,

             resolve: {
             loggedIn: ['LoginService', '$q', '$state', function(LoginService, $q, $state){
             return LoginService.hasSession().then(function(success){

             }, function(err){
             $state.go('portfolio.login');
             return $q.reject(err);
             });
             }]
             }*/
        });
    }
})();