(function() {
    var storeModule = angular.module("sportsStore");

    storeModule
    .constant("dataUrl", "http://localhost:5500/products")
    .controller("sportsStoreCtrl", function($scope, $http, dataUrl) {
        $scope.data = $scope.data || {};

        $http.get(dataUrl)
            .success(function(data) {
                $scope.data.products = data;
            })
            .error(function(error) {
                $scope.data.error = error;
            });

    });
}());
