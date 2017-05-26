
angular.module('my.formatter', []).directive("multiValueFormatter", function () {
    return {
        require: "ngModel",
        scope: {},
        link: function (scope, element, attrs, ngModel) {

            //验证函数
            function validate(str) {

                var temp = str.replace(/,{2,}/g, ",");
                var arr = temp.split(",");

                var resources = [];

                for (var i = 0; i < arr.length; i++) {
                    if (attrs.allowUnderline == 'false' && arr[i].indexOf("_") != -1) {
                        console.log("cannot have underline");
                        resources.push(arr[i].replace(/_/g, ""));
                    } else if (arr[i].length > 16) {
                        //最大长度验证
                        console.log("cannot exceed 16")
                        resources.push(arr[i].substr(0, 16));
                        // return false;
                    } else if (!(arr[i].trim() === "" && arr[i].length > 0 && i != arr.length - 1)) {
                        resources.push(arr[i]);
                    }
                }

                if ("" === resources[0]) {
                    resources.splice(0, 1);
                }

                //判断长度
                if (resources.length > 10) {
                    console.log("max 10 values")
                    return resources.slice(0, 10).join(",");
                } else {
                    return resources.join(",");
                }

            }

            ngModel.$parsers.push(function (value) {

                var return_value;
                return_value = validate(value);
                ngModel.$setViewValue(return_value);
                ngModel.$render();

                return return_value;
            });

            element.bind("blur", function () {
                var return_value;
                return_value = blurValidate(ngModel.$viewValue);
                ngModel.$setViewValue(return_value);
                ngModel.$render();
            })

            function blurValidate(str) {
                var resources = str.split(",");
                var temp = resources.filter(function (item) {
                    return item.trim() != '';
                });
                return temp.join(",");
            }
        }
    }
})