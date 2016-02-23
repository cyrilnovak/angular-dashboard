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
        
        vm.RowNClicked = rowNClicked;
                        
        (function initController() {
            // reset  
            UsersService.SetVm(vm);
        })();
        
        function rowNClicked(row, info) {
            //console.log('row: ', row, info);
            $('td', row).unbind('click');
            $('td', row).bind('click', function() {
                $scope.$apply(function() {
                    console.log('row applied: ', row, info);
                    vm.isEditing = true;
                });
            });
            return row;
        }
    }
})();