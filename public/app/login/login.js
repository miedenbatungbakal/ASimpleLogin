(function(){

    angular.module('login', [
        'profile.create'
    ])
        .config(['$stateProvider', LoginConfig])
        .factory('LoginService', ['$http', LoginService])
        .controller('LoginCtrl', ['LoginService', '$state', '$modal', LoginCtrl]);

    function LoginConfig($stateProvider){
        $stateProvider.state('portfolio.login', {
            views: {
                'mainContent@': {
                    templateUrl: 'app/login/login.tmpl.html',
                    controller: 'LoginCtrl as loginCtrl'
                }
            }
        });
    }

    function LoginService($http){
        var loggedUser = '';

        function getUsername(){
            return loggedUser;
        }

        function setUsername(uname){
            loggedUser = uname;
        }

        var loginService = {
            hasSession: function(){
                return $http.get('/api/session').then(function(response){
                   /* var deferred = $q.defer();

                    if(!response.data.isLoggedin){
                        deferred.reject();
                    }else{
                        deferred.resolve();
                    }

                    return deferred.promise;*/
                    if(response.data.userData) {
                        loginService.setUsername(response.data.userData.firstname);
                    }

                    return response.data.userData;
                });
            },

            loginUser: function(user){
                return $http.post('/api/login', user).then(function(response){
                    loginService.setUsername(response.data.firstname);
                    return response;
                });
            },

            logoutUser: function(){
                return $http.post('/api/logout');
            },

            getUsername: getUsername,
            setUsername: setUsername
        }

        return loginService
    }

    function LoginCtrl(LoginService, $state, $modal){
        var loginCtrl = this;
        loginCtrl.user = {};
        loginCtrl.errMsg = '';

        loginCtrl.login = function(){
            LoginService.loginUser(loginCtrl.user).then(function(success){
                $state.go('portfolio.contents.home');
            }, function(err){
                if(err.data === 'Unauthorized'){
                    loginCtrl.errMsg = "Invalid username or password";
                }else{
                    loginCtrl.errMsg = "Unable to connect";
                }
            });
        }

        loginCtrl.createProfileModalForm = function(size){
            var modalInstance = $modal.open({
                templateUrl: 'app/profile/create/profile-create.tmpl.html',
                controller: 'ProfileCreateCtrl as profileCreateCtrl',
                backdrop: 'static',
                windowClass: 'app-modal-window'
            });
        };
    }
})();