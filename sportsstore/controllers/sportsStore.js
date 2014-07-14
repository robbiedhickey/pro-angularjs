(function() {
    var storeModule = angular.module("sportsStore");

    storeModule
        .constant("dataUrl", "http://localhost:5500/products")
        .constant("orderUrl", "http://localhost:5500/orders")
        .controller("sportsStoreCtrl", function($scope, $http, dataUrl, $location, orderUrl, cartService) {
            $scope.data = $scope.data || {};

            $http.get(dataUrl)
                .success(function(data) {
                    $scope.data.products = data;
                })
                .error(function(error) {
                    $scope.data.error = error;
                });

            $scope.sendOrder = function(shippingDetails){
            	// make a copy so we can manipulate it without affecting other parts of the application
            	var order = angular.copy(shippingDetails);
            	order.products = cartService.getProducts();
            	$http.post(orderUrl, order)
            		.success(function(data){
            			$scope.data.orderId = data.id;
            			cartService.getProducts().length = 0;
            		})
            		.error(function(data){
            			$scope.data.orderError = error;
            		})
            		.then(function(){
            			$location.path("complete");
            		});
            }

        });
}());
