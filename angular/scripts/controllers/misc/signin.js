(function() {
    'use strict';
    angular
    .module('app')
    .controller('SignInCtrl', SignIn);

    
    SignIn.$inject = ['$location', 'AuthenticationService'/*, 'FlashService'*/];
    function SignIn($location, AuthenticationService/*, FlashService*/) {
        var vm = this;
 
        vm.signin = signin;
        vm.remember = false;
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function signin() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, vm.remember, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    /*FlashService.Error(response.message);*/
                    vm.dataLoading = false;
                }
            }, function (error) {
                vm.dataLoading = false;
            });
        };
    }
      
})();