(function() {
    'use strict';
    angular
    .module('app')
    .controller('UsersCtrl', Users);

    
    Users.$inject = ['$location', '$resource', 'UsersService'];
    function Users($location, $resource, UsersService) {
        var vm = this;        
        
        vm.dtOptions = UsersService.GetDtOptionsWithBootstrap();   
                
        vm.GetUsers = getUsers;             
        
        (function initController() {
            // reset  
            vm.GetUsers();
        })();
 
        function getUsers(data) {
            if (!data) {
                vm.dataLoading = true;
                UsersService.GetUsers(vm.GetUsers);
            } else {
                vm.dataLoading = false;
                vm.dtData = data;
                for (var dt in vm.dtData)
                    console.log(vm.dtData[dt]);
            }
        };
    }
})();