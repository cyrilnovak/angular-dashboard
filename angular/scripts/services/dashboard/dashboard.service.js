(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('DashboardService', DashboardService);
 
    DashboardService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function DashboardService($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
        var baseUrl = 'https://www.callmask.com/admin/';
        
        service.GetDashboard = getDashboard;
        service.GetUsages = getUsages;
        service.GetRevenue = getRevenue;
        
        return service;
        
        function getDashboard(callback) {
            var url = baseUrl + 'dashboard/';
            
            $http.get(url).success(
                function(response) {
                    callback(response);
                }
            );
        }
        
        function getUsages(callback) {
            var url = baseUrl + 'graph/usage/';
            
            $http.get(url).success(
                function(response) {
                    callback(response);
                }
            );
            
        }
        
        function getRevenue(callback) {
            var url = baseUrl + 'graph/revenue/';
            
            $http.get(url).success(
                function(response) {
                    callback(response);
                }
            );
            
        }
        
        function initRevenueGraph() {
            var ret = {};
            return ret;
        }
    }
    
})();