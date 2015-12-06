(function(){
    angular.module('profile.create', [

    ])
        .controller('ProfileCreateCtrl', ['$modalInstance', 'ProfileCreateService', 'toastr', ProfileCreateCtrl])
        .factory('ProfileCreateService', ['$http', ProfileCreateService])
        .directive('confirmPassword', [confirmPassword])
        .directive('checkExistingProfile', ['$http', '$q', checkExistingProfile]);

    function checkExistingProfile($http, $q){
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {},
            link: function($scope, $element, $attrs, ngModelCtrl){
                ngModelCtrl.$asyncValidators.checkExistingProfile = function(modelValue){
                    var username = {
                        username: modelValue
                    };

                    return $http.post('/api/check/profile', username).then(function(response){
                        var defer = $q.defer();

                        if(response.data.result === 'existing'){
                            defer.reject();
                        }else{
                            defer.resolve();
                        }

                        return defer.promise;
                    });
                };
            }
        };
    }

    function confirmPassword(){
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                password: '=confirmPassword'
            },
            link: function($scope, $element, $attrs, ngModelCtrl){
                ngModelCtrl.$validators.comparePassword = function(modelValue){
                    return modelValue === $scope.password;
                }

                $scope.$watch('password', function(){
                    ngModelCtrl.$validate();
                });
            }
        };
    }

    function ProfileCreateService($http){
        var profileCreateService = {
            createProfile: function(newUser){
                return $http.post('/api/create/profile', newUser).then(function(response){
                    return response.data.result;
                });
            }
        };

        return profileCreateService;
    }

    function ProfileCreateCtrl($modalInstance, ProfileCreateService, toastr){
        var profileCreateCtrl = this;

        profileCreateCtrl.newUser = {};
        profileCreateCtrl.confirmPassword = '';

        profileCreateCtrl.createProfile = function(){
            if(profileCreateCtrl.confirmPassword === profileCreateCtrl.newUser.local.password){
                ProfileCreateService.createProfile(profileCreateCtrl.newUser).then(function(response){
                    if(response === 'success'){
                        profileCreateCtrl.cancel();
                        toastr.success('New user successfully saved!');
                    }
                });
            }
        };

        profileCreateCtrl.cancel = function(){
            $modalInstance.dismiss('cancel');
        }
    }
})();