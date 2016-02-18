(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('SignUpCtrl', SignUp);
 
    SignUp.$inject = ['UserService', '$location', '$rootScope'/*, 'FlashService'*/];
    function SignUp(UserService, $location, $rootScope/*, FlashService*/) {
        var vm = this;
 
        vm.signup = signup;
 
        function signup() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        /*FlashService.Success('Registration successful', true);*/
                        $location.path('/login');
                    } else {
                        /*FlashService.Error(response.message);*/
                        vm.dataLoading = false;
                    }
                });
        }
    }
 
})();