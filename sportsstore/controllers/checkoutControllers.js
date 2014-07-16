(function () {
    "use strict";

    angular.module("sportsStore")
        .controller("cartSummaryController", function ($scope, cartService) {
            $scope.cartData = cartService.getProducts();

            $scope.total = function () {
                var total = 0;
                for (var i = 0; i < $scope.cartData.length; i++) {
                    total += ($scope.cartData[i].price * $scope.cartData[i].count);
                }
                return total;
            };

            $scope.remove = function (id) {
                cartService.removeProduct(id);
            };
        });
}());