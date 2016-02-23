(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UsersService', UsersService);
 
    UsersService.$inject = ['$http', 'DTOptionsBuilder', 'DTColumnBuilder'];
    function UsersService($http, DTOptionsBuilder, DTColumnBuilder) {
        var service = {};
        var baseUrl = 'https://www.callmask.com/admin/';
        
        service.GetDtOptions = getDtOptions;
        service.GetDtColumns = getDtColumns;
        return service;
        
        function getDtOptions() {
            return DTOptionsBuilder
                .newOptions()
                .withBootstrap()
                .withBootstrapOptions({
                    TableTools: {
                        classes: {
                            container: 'btn-group container',
                            buttons: {
                                normal: 'btn btn-danger'
                            }
                        }
                    },
                    ColVis: {
                        classes: {
                            masterButton: 'btn btn-primary'
                        }
                    }
                })
                .withOption('ajax', {
                    url: baseUrl + 'users/',
                    type: 'GET',
                    data: function(data, dtInstance) {
                        
                    }
                 })
                 // or here
                .withDataProp('data')
                .withOption('processing', true)
                .withOption('serverSide', true)
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
        
        /*service.GetUsers = getUsers;
        service.GetDtOptionsWithBootstrap = getDtOptionsWithBootstrap;
        
        return service;
        
        function getDtOptionsWithBootstrap() {
            console.log('DTOptions loaded!');
            return DTOptionsBuilder
                .newOptions()
                .withBootstrap()
                .withBootstrapOptions({
                    TableTools: {
                        classes: {
                            container: 'btn-group container',
                            buttons: {
                                normal: 'btn btn-danger'
                            }
                        }
                    },
                    ColVis: {
                        classes: {
                            masterButton: 'btn btn-primary'
                        }
                    }
                });
        }
        
        function getUsers(callback) {
            var url = baseUrl + 'users/';
            
            $http.get(url).success(
                function(response) {
                    callback(response);
                }
            );
        }*/
    }
    
})();