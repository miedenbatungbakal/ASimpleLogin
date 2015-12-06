(function(){
    angular.module('nav.all-users', [

    ])
        .controller('AllUsersCtrl', ['usersPromise', AllUsersCtrl]);

    function AllUsersCtrl(usersPromise){
        var allUsersCtrl = this;

        allUsersCtrl.users = usersPromise;
    }
})();
