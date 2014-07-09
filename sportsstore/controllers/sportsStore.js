(function() {
    var storeModule = angular.module("sportsStore");

    storeModule.controller("sportsStoreCtrl", function($scope, $http) {
    	$scope.data = $scope.data || {};

        $http.get("http://localhost:5500/products")
        .success(function(response) {
            $scope.data.products = response;
        });

    });
}());
