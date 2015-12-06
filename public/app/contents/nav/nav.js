(function(){
    angular.module('nav', [
        'nav.home',
        'nav.all-users'
    ])
        .config(['$stateProvider', NavConfig])
        .controller('NavCtrl', ['LoginService', '$state', NavCtrl]);

    function NavConfig($stateProvider){
        $stateProvider.state('portfolio.contents.home', {
            views: {
                'mainContent@': {
                    templateUrl: 'app/contents/nav/nav-content/home/home.tmpl.html',
                    controller: 'HomeCtrl as homeCtrl'
                }
            }
        }).state('portfolio.contents.allUsers', {
            resolve: {
                usersPromise: ['$http', function($http){
                    return $http.get('/api/secure/profiles').then(function(response){
                        return response.data;
                    });
                }]
            },
            views: {
                'mainContent@': {
                    templateUrl: 'app/contents/nav/nav-content/all-users/all-users.tmpl.html',
                    controller: 'AllUsersCtrl as allUsersCtrl'
                }
            }
        });
    }

    function NavCtrl(LoginService, $state){
        var navCtrl = this;

        navCtrl.isCollapsed = true;
        navCtrl.username = LoginService.getUsername();

        navCtrl.logout = function(){
            LoginService.logoutUser().then(function(){
                $state.go('portfolio.login');
            });
        };
    }
})();