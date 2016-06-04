angular.module("customDirectives",[])
	.directive("triButton", function(){
		return {
			link:function(scope, element, attrs){
				element.on("click", function(event){
					console.log("Button click: "+ event.target.innerText);
					scope.$apply(function(){
						scope.counter++;
					})
				})
			},
			scope:{
				counter:"=counter"
			}
		}
	})