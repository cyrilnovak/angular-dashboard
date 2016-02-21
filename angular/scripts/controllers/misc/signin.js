(function() {
    'use strict';
    angular
    .module('app')
    .controller('SignInCtrl', SignIn);

    
    SignIn.$inject = ['$location', 'AuthenticationService'];
    function SignIn($location, AuthenticationService) {
        var vm = this;
 
        vm.signin = signin;
        vm.remember = false;
 
        function signin() {
            
            $location.path('/app/dashboard').replace();
            
            /*vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, vm.remember, function (response) {
                if (response.admin_session_key) {
                    AuthenticationService.SetCredentials(vm.username, response.admin_session_key);
                    $location.path('/dashboard');
                    vm.dataLoading = false;
                } else {
                    console.log(response.message);
                    vm.dataLoading = false;
                }
            });*/
        };
    }
      
})();