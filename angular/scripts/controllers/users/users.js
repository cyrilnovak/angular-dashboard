(function() {
    'use strict';
    angular
    .module('app')
    .controller('UsersCtrl', Users);

    
    Users.$inject = ['$location', '$scope', 'UsersService'];
    function Users($location, $scope, UsersService) {
        var vm = this;        
        
        vm.dtOptions = UsersService.GetDtOptions();   
        vm.dtColumns = UsersService.GetDtColumns(); 
        vm.dtInstance = {};
        
        vm.ReloadData = reloadData;
        vm.RowNClicked = rowNClicked;
        vm.UpdateCredits = updateCredits;
                        
        (function initController() {
            // reset  
            UsersService.SetVm(vm);
        })();
        
        function reloadData() {            
            vm.dtInstance.reloadData(function(){
                console.log('Reloading data...');
            }, false);
        }
        
        function rowNClicked(row, info) {
            //console.log('row: ', row, info);
            $('td', row).unbind('click');
            $('td', row).bind('click', function() {
                $scope.$apply(function() {
                    vm.userData = info;
                    vm.isEditing = true;
                });
            });
            return row;
        }
        
        function updateCredits(data) {
            if (!data) {
                UsersService.UpdateCredits(vm.userData, vm.UpdateCredits);
            } else {
                vm.isEditing = false;
                vm.ReloadData();
            }
        }
    }
})();