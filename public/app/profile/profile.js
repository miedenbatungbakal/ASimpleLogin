(function(){
    angular.module('profile', [
        'profile.create'
    ])
        .config(['$stateProvider', ProfileConfig])
        .controller('ProfileCtrl', [ProfileCtrl]);


    function ProfileConfig($stateProvider){
        $stateProvider.state('portfolio.profile', {
            views: {
                'mainContent@': {
                    templateUrl: 'app/profile/profile.tmpl.html',
                    controller: 'ProfileCtrl as profileCtrl'
                }
            }
        });
    }

    function ProfileCtrl(){

    }
})();