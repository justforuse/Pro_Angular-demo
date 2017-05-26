angular.module("app", ["ui.router"])
	.config(function($stateProvider){
		$stateProvider
			.state("main", {
				abstract:true,
				url:"/",
				controller:"MainController",
				templateUrl:"main.html"
			})
			.state("main.homepage", {
				url:"",
				controller:"HomepageController",
				templateUrl:"homepage.html"
			})
			.state("main.product", {
				abstract:true,
				url:":id",
				controller:"ProductController",
				templateUrl:"product.html"
			})
			.state("main.product.index",{
				url:"",
				view
			})
	})