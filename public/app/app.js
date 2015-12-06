(function(){
    angular.module('main', [
        'ngMessages',
        'ngAnimate',
        'ui.bootstrap',
        'ui.router',
        'toastr',
        'contents',
        'login',
        'profile'
    ])
        .config(['$stateProvider', '$locationProvider', MainConfig])

        .controller('MainCtrl', ['LoginService', '$state', MainCtrl]);

    function MainConfig($stateProvider, $locationProvider){
        $stateProvider.state('portfolio', {
            url: '',
            abstract: true
        });

        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }

    function MainCtrl(LoginService, $state){
        var mainCtrl = this;
        mainCtrl.isLoggedin = false;

        //$state.go('portfolio.home');

       LoginService.hasSession().then(function(response){
           if(response){
               $state.go('portfolio.contents.home');
           }else{
               $state.go('portfolio.login');
           }
       });
    }
})();