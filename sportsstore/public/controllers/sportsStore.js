angular.module("sportsStore")
	.constant("dataUrl", "http://localhost:2403/products")
	.constant("orderUrl", "http://localhost:2403/orders")
	.controller("sportsStoreCtrl", function($scope, $http, dataUrl, orderUrl, cart, $location){

		$scope.data={};
		$http.get(dataUrl)
			.success(function(data){
				$scope.data.products=data;
			})
			.error(function(error){
				$scope.data.error=error;
			});
		$scope.sendOrder=function(shippingDetails){
			console.log(shippingDetails);
			var order=angular.copy(shippingDetails);
			order.products=cart.getProducts();
			$http.post(orderUrl, order)
				.success(function(data){
					console.log(data);
					$scope.data.orderId=data.id;
					cart.getProducts().length=0;
				})
				.error(function(error){
					$scope.data.orderError=error;
				}).finally(function(){
					$location.path("/complete");
				})
		}
	})