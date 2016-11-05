var myApp = angular.module('myApp',[]);

myApp.controller('DoubleController', ['$scope', function($scope) {
  $scope.data = {};
  $scope.data.location = "Mumbai"
  var unit_Solar_System_Cost = 75000 // Rs. 75,000 per kW
  var interest_Rate = 11 // Interest Rate = 11%
  var ENUM = {   // Electricity Tariff structure: Bangalore: Rs5/unit, Mumbai: Rs 7/unit, Pune: Rs 9/unit
    Mumbai : 7, 
    Pune: 9, 
    Bangalore : 5
  };
  $scope.xe = {};
  

  var getMinvalue = function(val1,val2) {
  	return (val1<val2 ? val1  : val2);
  }
  
  var getMaxvalue = function(val1,val2) {
  	return (val1>val2 ? val1 :val2);
  }
  
	$scope.$watchCollection('data', function() {
	  if($scope.data.roofSize && $scope.data.unitConsumed) {
	   $scope.data.solarSystemSize = getMinvalue($scope.data.unitConsumed/120 , $scope.data.roofSize/100 );
	   $scope.data.solarUnitProduced = $scope.data.solarSystemSize * 4 * 30;
	   $scope.data.solarSystemCost  = unit_Solar_System_Cost * $scope.data.solarSystemSize;
	  }
	  
	  if($scope.data.loanTenure && $scope.data.loanAmount){
	   $scope.data.EMI = (($scope.data.loanAmount * interest_Rate * $scope.data.loanTenure)/100 + Number($scope.data.loanAmount))/(Number($scope.data.loanTenure)*12);
	  }
	  
	  $scope.xe.currentElectrictyBill = $scope.data.unitConsumed * ENUM[$scope.data.location];
	  $scope.xe.reducedUnits =  getMaxvalue(($scope.data.unitConsumed-$scope.data.solarUnitProduced) , 0);
	  $scope.xe.reducedElectrictyBill  = $scope.xe.reducedUnits * ENUM[$scope.data.location];
	  $scope.xe.monthlySavings = $scope.xe.currentElectrictyBill - $scope.xe.reducedElectrictyBill - $scope.data.EMI
  })
  
  Highcharts.chart('container', {
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },

      series: [{
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
  });

}]);

