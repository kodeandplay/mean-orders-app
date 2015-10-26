
angular.module('OrdersApp').controller('ShopCtrl', ['ShopService','$scope', '$http','$location', 
  function(ShopService,$scope,$http,$location) {
	
	ShopService.getItems().then(function(oResponse) {

		$scope.$emit('login', oResponse);

		if(oResponse.data.bSuccess) {
			$scope.items = oResponse.data.aItems.map(function(item) { 
				return Object.defineProperty(item,'quantity', { 
					value: 0, configurable: true, enumerable: true, writable: true 
				}); 
			});
		} else {
			$location.path('/');
		}
	}, function(oError) {
		$location.path('/');
	});

	$scope.plusOne = function(index) {
		$scope.items[index].quantity++;
	}

	$scope.zeroQuantity = function(index) {
		$scope.items[index].quantity = 0;
	}


	$scope.placeOrder = function() {
		var orderItems = $scope.items.filter(function(item) {
			return item.quantity > 0
		});

		if(orderItems.length > 0) {
			$http.post('/api/shop', orderItems).then(function(oResponse) {
				// console.log('placeOrder response:', oResponse);
				// lame, i know
				window.alert("Order placed");
			});
		}
		
	}

}]);
