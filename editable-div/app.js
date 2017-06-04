angular
    .module('app', [])
    .directive('myEditable', function ($timeout) {
        return {
            restrict: 'A',
            require: '?ngModel',
            templateUrl: "./t.html",
            transclude: true,
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }
                scope.isEdit = false;
                var tempInputCtrl = element.find("input").controller("ngModel");
                tempInputCtrl.$parsers.push(function (value) {
                    //做输入验证，此处以不超过10位为例
                    var return_value = value;
                    if (value.length > 10) {
                        console.log("over 10");
                        return_value = value.slice(0, 10);

                    }
                    tempInputCtrl.$setViewValue(return_value);
                    tempInputCtrl.$render();
                    return return_value;
                });

                scope.edit = function () {
                    scope.isEdit = true;
                    scope.tempText = ngModel.$modelValue;
                    // 输入框获取焦点
                    $timeout(function () {
                        element.find("input")[0].focus();
                    })

                }
                scope.save = function () {
                    var html = scope.tempText;
                    ngModel.$setViewValue(html);
                    scope.isEdit = false;
                }
                scope.cancel = function () {
                    scope.isEdit = false;
                }

                ngModel.$render = function () {
                    scope.tempText = ngModel.$viewValue;
                };
                
                
                element.find("input").on("blur", function () {
                    console.log("input blur");
                    scope.isEdit = false;
                    scope.$apply();
                })

            }
        };
    })
    .controller("ctrl", function ($scope) {
        $scope.data = "haha"
    })