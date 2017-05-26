angular
    .module('app', [])
    .directive('puiEditable', function () {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            templateUrl: "./t.html",
            transclude: true,
            link: function (scope, element, attrs, ngModel) {
                scope.isEdit = false;
                var tempInputCtrl = element.find("input").controller("ngModel");
                tempInputCtrl.$parsers.push(function (value) {
                    var return_value = value;
                    console.log(return_value);
                    if (value.length > 10) {
                        console.log("over 10")
                        return_value = value.slice(0, 10);

                    }
                    console.log(return_value);
                    tempInputCtrl.$setViewValue(return_value);
                    tempInputCtrl.$render();
                    return return_value;
                });

                scope.edit = function () {
                    scope.isEdit = true;
                    scope.tempText = ngModel.$modelValue;
                
                }
                scope.save = function () {
                    var html = scope.tempText;
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html === '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
                scope.cancel = function () {
                    scope.isEdit = false;
                }
                if (!ngModel) {
                    return;
                } // do nothing if no ng-model
                // Specify how UI should be updated
                ngModel.$render = function () {
                    // element.html(ngModel.$viewValue || '');
                    scope.tempText = ngModel.$viewValue;
                };
                // Listen for change events to enable binding
                element.on('keyup', function () {
                    scope.$apply(readViewText);
                });
                // element.find("input").on("blur", function () {
                //     console.log("input blur")
                //     scope.isEdit = false;
                //     scope.$apply();
                // })
                // No need to initialize, AngularJS will initialize the text based on ng-model attribute
                // Write data to the model
                function readViewText() {
                    var html = scope.tempText;
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out

                    if (html.length > 10) {
                        console.log("over 10")
                        scope.tempText = html.slice(0, 10);

                    }
                }


            }
        };
    })
    .controller("ctrl", function ($scope) {
        $scope.data = "haha"
    })