/**
 * cart Module
 *
 * Description: shopping cart service and summary
 * Using a service also highlights an important feature of angular: it is a singleton,
 * So any module that depends on this service will have the same instance of the cart.
 */
angular.module('cart', [])
    .factory('cartService', function() {
        var cartData = [];

        return {
            addProduct: function(id, name, price) {
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id === id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1,
                        id: id,
                        price: price,
                        name: name
                    });
                }
            },
            removeProduct: function(id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },
            getProducts: function() {
                return cartData;
            }
        }
    })
    .directive('cartSummary', function(cartService) {
        // Runs during compile
        return {
            restrict: 'E', 
            templateUrl: 'components/cart/cartSummary.html',
            controller: function($scope) {
            	var cartData = cartService.getProducts();

            	$scope.total = function(){
            		var total = 0;
            		for(var i = 0; i < cartData.length; i++){
            			total += (cartData[i].price * cartData[i].count);
            		}
            		return total;
            	}

            	$scope.itemCount = function(){
            		var total = 0;
            		for(var i = 0; i < cartData.length; i++){
            			total += cartData[i].count;
            		}
            		return total;
            	}
            },
        };
    });
