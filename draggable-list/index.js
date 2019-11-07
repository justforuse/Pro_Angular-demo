angular
        .module('app', ['ui.sortable'])
        .controller('sortCtrl', function($scope, $timeout, orderByFilter) {
          $scope.canSort = true
          $scope.data = [
            {
              name: 'allen',
              age: 21,
              i: 0
            },
            {
              name: 'bob',
              age: 18,
              i: 1
            },
            {
              name: 'curry',
              age: 25,
              i: 2
            },
            {
              name: 'you can not drag me~',
              age: 30,
              i: 3
            }
          ]

          $scope.handleChange = function (e) {
            console.log($scope.canSort)
            $scope.sortableOptions.disabled = !$scope.canSort
          }

          $scope.sortableOptions = {
            // 数据有变化
            update: function(e, ui) {
              console.log('update')
              $timeout(function() {
                var resArr = []
                for (var i = 0; i < $scope.data.length; i++) {
                  resArr.push($scope.data[i].i)
                }
                console.log(resArr)
              })
            },

            // 完成动作
            stop: function(e, ui) {
              //do nothing
            },
            items: 'li:not(.not-sortable)'
          }

          var dataWatcher = $scope.$watchCollection('data', function() {
            console.log('watcher')
            $scope.data = orderByFilter($scope.data, ['age'])
            //销毁监听器
            dataWatcher()
          })
        })
