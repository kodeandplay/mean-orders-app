angular.module('OrdersApp').controller('AdminCtrl', ['ShopService','$scope','$http','$location', 
  function(ShopService,$scope,$http,$location) {

  	$scope.items = [];

	ShopService.getItems().then(function(oResponse) {
		$scope.items = oResponse.data.aItems.map(function(item) {
			item.tags = item.tags.join(',');
			return item;
		});

	});

	$scope.addItem = function() {
		$http.post('/api/admin/item', $scope.item).then(function(oResponse) {
			var item = oResponse.data.item;
			item.tags = item.tags.join(',');
			$scope.items.unshift(item);
		});
	};

}]);
