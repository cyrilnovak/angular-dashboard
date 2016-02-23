(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UsersService', UsersService);
 
    UsersService.$inject = ['$http', 'DTOptionsBuilder'];
    function UsersService($http, DTOptionsBuilder) {
        var service = {};
        var baseUrl = 'https://www.callmask.com/admin/';
        
        service.GetUsers = getUsers;
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
        }
    }
    
})();