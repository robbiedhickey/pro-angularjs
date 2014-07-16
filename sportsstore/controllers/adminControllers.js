(function () {
    "use strict";

    angular.module('sportsStoreAdmin')
        .constant('authUrl', 'http://localhost:5500/users/login')
        .constant('ordersUrl', 'http://localhost:5500/orders')
        .controller('authCtrl', function ($scope, $http, $location, authUrl) {
            $scope.authenticate = function (user, pass) {
                $http.post(authUrl, {
                    username: user,
                    password: pass
                }, {
                    // optional configuration object for $http.post. Enables support for cross origin requests
                    // this allows ajax requests to work with cookies that deal with auth. Without this, the
                    // browser would ignore the cookie returned from the Deployd server
                    withCredentials: true
                }).success(function () {
                    $location.path("/main");
                }).error(function (error) {
                    $scope.authenticationError = error;
                });
            };
        })
        // this controller uses ng-include to dynamically inject a view based on a user selection.
        // this is because you cannot nest multiple isntances of the ng-view directive
        .controller('mainCtrl', function ($scope) {
            $scope.screens = ["Products", "Orders"];
            $scope.current = $scope.screens[0];

            $scope.setScreen = function (index) {
                $scope.current = $scope.screens[index];
            };

            $scope.getScreen = function () {
                return $scope.current === "Products" ? "views/adminProducts.html" : "views/adminOrders.html";
            };
        })
        .controller('ordersCtrl', function ($scope, $http, ordersUrl) {
            $http.get(ordersUrl, {
                    withCredentials: true
                })
                .success(function (data) {
                    $scope.orders = data;
                })
                .error(function (error) {
                    $scope.error = error;
                });

            $scope.selectOrder = function (order) {
                $scope.selectedOrder = order;
            };

            $scope.calcTotal = function (order) {
                var total = 0;
                for (var i = 0; i < order.products.length; i++) {
                    total += order.products[i].count * order.products[i].price;
                }
                return total;
            };
        });
}());
