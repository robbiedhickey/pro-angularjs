angular.module('sportsStoreAdmin')
    .constant('productUrl', 'http://localhost:5500/products/')
    // $resource is built on top of $http, we can specify defaults here
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller('productCtrl', function($scope, $resource, productUrl) {

    	// first arg: defines the URL format that will be used to make queries
    	// second arg: map object that will transpose query placeholders from object
        $scope.productsResource = $resource(productUrl + ":id", {
            id: "@id"
        });

        $scope.listProducts = function() {
            $scope.products = $scope.productsResource.query();
        };

        $scope.deleteProduct = function(product) {
            product.$delete().then(function() {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        };

        $scope.createProduct = function(product) {
            new $scope.productsResource(product).$save().then(function(newProduct) {
                $scope.products.push(newProduct);
                $scope.editedProduct = null;
            });
        };

        $scope.updateProduct = function(product) {
            product.$save();
            $scope.editedProduct = null;
        };

        $scope.startEdit = function(product) {
            $scope.editedProduct = product;
        };

        $scope.cancelEdit = function() {
            $scope.editedProduct = null;
        };

        // must manually call GET
        $scope.listProducts();
    });
