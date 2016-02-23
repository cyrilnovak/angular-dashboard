(function() {
    'use strict';
    angular
    .module('app')
    .controller('DashboardCtrl', Dashboard);

    
    Dashboard.$inject = ['$location', 'DashboardService'];
    function Dashboard($location, DashboardService) {
        var vm = this;
        
        vm.dashboard = {};
        
        vm.sumGwallet = [];
        vm.sumiTunes = [];
        vm.sumCc = [];
        vm.sumPaypal = [];        
        
        vm.titles = {'today':'Today', 
                     'yesterday':'Yesterday', 
                     'last_month':'Last Month', 
                     'current_month':'Current Month'};
        vm.titles1 = {'total':'Total', 
                     'available':'Available', 
                     'cooling':'Cooling'};
        
        vm.dailyCategory = 'today';
        vm.monthCategory = 'current_month';        
        vm.userCountCategory = 'today';
        vm.inventoryCategory = 'total';
        vm.messagesCategory = 'today';
        vm.callsCategory = 'today';
        
        vm.userCount = [];
        vm.inventory = [];
        vm.messages = [];
        vm.calls = [];
                
        vm.colours = ['red', 'blue', 'yellow', 'green'];
        
        vm.revenueLabels = [];
        vm.revenueSeries = ['Google Play', 'iTunes', 'Credit Card', 'Paypal'];
        vm.revenueData = [];
        
        vm.usageLabels = [];
        vm.usageSeries = ['Calls sent', 'Calls received', 'Text messages sent', 'Text messages received'];
        vm.usageData = [];
 
        vm.RefreshDashboard = refreshDashboard; 
        vm.GetRevenueSummary = getRevenueSummary;
        vm.GetRevenueChartData = getRevenueChartData;
        vm.GetUsageChartData = getUsageChartData;
        vm.ChangeDailyCategory = changeDailyCategory;
        vm.ChangeMonthCategory = changeMonthCategory;
        
        
        
        (function initController() {
            // reset dashboard 
            refreshDashboard();
        })();
 
        function refreshDashboard() {
                        
            vm.dataLoading = true;
            DashboardService.GetDashboard(function(response) {
                
                if (response) {
                    console.log(response);
                    vm.dashboard = response;
                    
                    vm.GetRevenueSummary(vm.dailyCategory);
                    vm.GetRevenueSummary(vm.monthCategory);
                    
                    DashboardService.GetRevenue(function(response) {
                        
                        if (response) {
                            console.log(response);
                            vm.GetRevenueChartData(response);
                            //vm.revenue = response;
                            
                            DashboardService.GetUsages(function(response) {
                                
                                if (response) {
                                    console.log(response);
                                    vm.GetUsageChartData(response);
                                    vm.dataLoading = false;
                                    
                                } else {
                                    console.log('Getting usages failed!', response.message);
                                    vm.dataLoading = false;
                                }
                            });
                            
                        }  else {
                            console.log('Getting revenue failed!', response.message);
                            vm.dataLoading = false;
                        }
                    });
                    
                } else {
                    console.log('Getting dashboard failed!', response.message);
                    vm.dataLoading = false;
                }
            });
        };
        
        function getRevenueSummary(category) {
            
            var tmpSummary = vm.dashboard['revenue'];
            
            vm.sumGwallet[category] = tmpSummary[category].gwallet; 
            vm.sumiTunes[category] = tmpSummary[category].itunes; 
            vm.sumCc[category] = tmpSummary[category].cc; 
            vm.sumPaypal[category] = tmpSummary[category].paypal; 
        };
        
        function getRevenueChartData(data) {
            
            var tmpData = data['cc'];   
            
            vm.revenueLabels = Object.keys(tmpData);            
                        
            for (var i in data) {                
                
                var tmpSeries = new Array();          
                
                for (var j in data[i]) {
                    tmpSeries.push(data[i][j]);
                }
                                         
                vm.revenueData.push(tmpSeries);
            }           
        }
        
        function getUsageChartData(data) {
            
            var tmpData = data['calls_outgoing'];   
            
            vm.usageLabels = Object.keys(tmpData);            
                        
            for (var i in data) {                
                
                var tmpSeries = new Array();          
                
                for (var j in data[i]) {
                    tmpSeries.push(data[i][j]);
                }
                                         
                vm.usageData.push(tmpSeries);
            }           
        }
        
        function changeDailyCategory(category) {
            
            var tmpKey = category ? category : vm.dailyCategory; 
            var invFlag = category ? true : false;
                        
            if ((tmpKey !== 'today') === invFlag) {                
                vm.dailyCategory = 'yesterday';                                
            } else {                                
                vm.dailyCategory = 'today';                
            }
            
            vm.GetRevenueSummary(vm.dailyCategory);
        };
        
        function changeMonthCategory(category) {
            
            var tmpKey = category ? category : vm.monthCategory; 
            var invFlag = category ? true : false;
            
            if ((tmpKey !== 'current') === invFlag) {                
                vm.monthCategory = 'last_month';                
            } else {                                
                vm.monthCategory = 'current_month';
            }
                        
            vm.GetRevenueSummary(vm.monthCategory);
        };
    }
      
})();