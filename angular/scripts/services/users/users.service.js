(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UsersService', UsersService);
 
    UsersService.$inject = ['$http', 'DTOptionsBuilder', 'DTColumnBuilder'];
    function UsersService($http, DTOptionsBuilder, DTColumnBuilder) {
        var service = {};
        var vm, scope;    
    
        var baseUrl = 'https://www.callmask.com/admin/users';
        
        service.SetVm = setVm;
        service.GetDtOptions = getDtOptions;
        service.GetDtColumns = getDtColumns;
        service.UpdateCredits = updateCredits;
        
        return service;
        
        function setVm(inst) {
            vm = inst;
        }
                    
        function getDtOptions() {
            return DTOptionsBuilder
                .newOptions()
                .withBootstrap()
                .withOption('ajax', {
                    url: baseUrl,
                    type: 'GET',
                    data: function(data, dtInstance) {
                        
                    }
                 })
                 // or here
                .withDataProp('data')
                .withOption('processing', true)
                .withOption('serverSide', true)
                .withOption('responsive', true)
                .withOption('rowCallback', rowCallback)
                .withPaginationType('full_numbers');
        }
                
        function getDtColumns() {
            return [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn('phone_number').withTitle('Phone number'),
                    DTColumnBuilder.newColumn('device').withTitle('Device'),
                    DTColumnBuilder.newColumn('app_version').withTitle('App version'),
                    DTColumnBuilder.newColumn('platform').withTitle('Platform'),
                    DTColumnBuilder.newColumn('platform_version').withTitle('Platform version'),
                    DTColumnBuilder.newColumn('credits').withTitle('Credits'),
                    DTColumnBuilder.newColumn('created_at').withTitle('Created at'),
                    DTColumnBuilder.newColumn('deleted').withTitle('Deleted')
                ];
        }      
        
        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {            
            return vm.RowNClicked(nRow, aData);
        }
        
        function updateCredits(data, callback) {            
            var url = baseUrl + '/' + data.id ;
            console.log(Number(data.credits));
            var params = $.param({'credits': Number(data.credits)});
            
            $http.put(url, params).success(
                function(response) {
                    console.log(response);
                    callback(response);
                }
            );
        }
    }
    
})();